/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Mixins to allow reuse of common code

define (
  [
    'underscore', 'backbone',
    'lib/SolrSearch/data/filter-collection-elements',
    'lib/SolrSearch/data/location-collection',
    'lib/streams',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (_, Backbone, FilterCollectionElements, Location, Streams, i18n) {
    'use strict';
    // used by actor/bulletin/incident collections to create groups of filters
    var searchBus, filterFilterListRequest,
        FilterGroupCollection, FilterGroupMixin, SelectedFilterMixin,
        excludeKeys, excluded_keys, convertToJSON,
        LocationCollection = new Location.LocationCollection(),
        groupMap, fetchDisplayFilterName;

    searchBus = Streams.searchBus;
    FilterGroupCollection = FilterCollectionElements.FilterGroupCollection;

    filterFilterListRequest = function(value) {
      return value.type === 'filter_list_request';
    };

    // return the name associated with the resourceList and resource_uri
    // if only a list is specified return a function that will get the name
    // from a uri
    var mapResourceToLabel = function(resourceList, uri) {
      var uriMapper = function(resource_uri) {
        return _(resourceList).findWhere({resource_uri: resource_uri}).name;
      };
      return (arguments.length === 1) ?
        uriMapper:
        uriMapper(uri);
    };
    // map keys to values, for multichoice fields on models, like sex,
    // civilian, age
    var mapKeyToLabel = function(keyList, key) {
      var keyMapper = function(filterName) {
        return _(keyList).findWhere({key: filterName}).value;
      };
      return (arguments.length === 1) ?
        keyMapper:
        keyMapper(key);
    };

    var filterMap  = {
      'most_recent_status_bulletin_exact': mapResourceToLabel(Bootstrap.all_statuses),
      'most_recent_status_incident_exact': mapResourceToLabel(Bootstrap.all_statuses),
      'most_recent_status_actor_exact': mapResourceToLabel(Bootstrap.all_statuses),
      'bulletin_sources_exact': mapResourceToLabel(Bootstrap.sources),
      'bulletin_labels_exact': mapResourceToLabel(Bootstrap.labels),
      'incident_labels_exact': mapResourceToLabel(Bootstrap.labels),
      'labels_exact': mapResourceToLabel(Bootstrap.labels),
      'bulletin_searchable_locations_exact': mapResourceToLabel(Bootstrap.locations),
      'incident_searchable_locations_exact': mapResourceToLabel(Bootstrap.locations),
      'actor_searchable_current_exact': mapResourceToLabel(Bootstrap.locations),
      'actor_searchable_pob_exact': mapResourceToLabel(Bootstrap.locations),
      'age_exact': mapKeyToLabel(Bootstrap.ages),
      'sex_exact': mapKeyToLabel(Bootstrap.sexes),
      'civialian_exact': mapKeyToLabel(Bootstrap.civilian),
      'incident_crimes_exact': mapResourceToLabel(Bootstrap.crimes)
    };

    // search the filterMap for a function to transform a resource_uri into a name
    fetchDisplayFilterName = function(filterName, key) {
      if (_(filterMap).chain().keys().contains(key).value()) {
        return filterMap[key](filterName);
      }
      return filterName;
    };

    // keys we want to exclude
    excluded_keys = [
      'marker' // leaflet object
    ];

    // exclude keys that we don't want to save from filters
    excludeKeys = function(model_json) {
      _(excluded_keys).each(function(key) {
        delete model_json[key];
      });
      return model_json;
    };

    // convert backbone models to json for serialization and saving
    convertToJSON = function(model) {
      return model.toJSON();
    };

    // map filter keys to their titles
    groupMap = function(key) {
      var groupTitleMap = {
          'bulletin_labels_exact':i18n.filters.bulletin_labels_exact,
          'bulletin_assigned_user_exact':i18n.filters.bulletin_assigned_user_exact,
          'bulletin_sources_exact':i18n.filters.bulletin_sources_exact,
          'bulletin_created_exact':i18n.filters.bulletin_created_exact,
          'most_recent_status_bulletin_exact':i18n.filters.most_recent_status_bulletin_exact,
          //Incident fields
          'confidence_score_exact':i18n.filters.confidence_score_exact,
          'incident_times_exact':i18n.filters.incident_times_exact,
          'incident_labels_exact':i18n.filters.incident_labels_exact, 
          'incident_assigned_user_exact':i18n.filters.incident_assigned_user_exact,
          'incident_crimes_exact':i18n.filters.incident_crimes_exact,
          'incident_created_exact':i18n.filters.incident_created_exact,
          'most_recent_status_incident_exact':i18n.filters.most_recent_status_incident_exact,
          //Actor fields
          'age_exact':i18n.filters.age_exact,
          'sex_exact':i18n.filters.sex_exact,
          'civilian_exact':i18n.filters.civilian_exact,
          'religion_en_exact':i18n.filters.religion_en_exact,
          'religion_ar_exact':i18n.filters.religion_ar_exact,
          'nationality_en_exact':i18n.filters.nationality_en_exact,
          'nationality_ar_exact':i18n.filters.nationality_ar_exact,
          'occupation_en_exact':i18n.filters.occupation_en_exact,
          'occupation_ar_exact':i18n.filters.occupation_ar_exact,
          'position_en_exact':i18n.filters.position_en_exact,
          'position_ar_exact':i18n.filters.position_ar_exact,
          'ethnicity_en_exact':i18n.filters.ethnicity_en_exact,
          'ethnicity_ar_exact':i18n.filters.ethnicity_ar_exact,
          'spoken_dialect_en':i18n.filters.spoken_dialect_en,
          'spoken_dialect_ar':i18n.filters.spoken_dialect_ar,
          'incident_searchable_locations_exact':i18n.filters.incident_searchable_locations_exact,
          'bulletin_searchable_locations_exact':i18n.filters.bulletin_searchable_locations_exact,
          'actor_searchable_pob_exact':i18n.filters.actor_searchable_pob_exact,
          'actor_searchable_current_exact':i18n.filters.actor_searchable_current_exact
      };
      return groupTitleMap[key];
    };

    // Shared code across the different entities Filter group classes
    FilterGroupMixin = {

      // store a flat collection of all filters
      // iterate over filter groups to create collections
      createFilterGroupCollections: function(groups, options) {
        // empty the collection before we add the new filters
        this.updateOptions = options || {};
        this.allFilters.reset([]);
        _.each(groups, this.createFilterGroupCollection, this);
        this.reset(this.filterGroupCollections);
        this.filterGroupCollections = [];

      },

      sendResetEvent: function() {
        searchBus.push({
          type: 'filter_group_updated',
          content: this.allFilters,
          entity: this.entityType,
          options: this.updateOptions
        });
      },

      createKeyFilter: function(key) {
        return function(filterCollection) {
          return filterCollection.get('groupKey') === key;
        };
      },

      findFilterGroupCollection: function(key) {
        var keyFilter = this.createKeyFilter(key);
        var filterGroupCollection = 
          this.chain()
           .filter(keyFilter)
           .last()
           .value();
        return filterGroupCollection;
      },

      getFilterGroupCollection: function(key) {
        var filterCollection = this.findFilterGroupCollection(key);
        if (filterCollection === undefined) {
          filterCollection = new FilterGroupCollection();
          filterCollection.watchForFilterLoadRequest(this.entityType);
          filterCollection.groupKey = key;
        }
        else {
          filterCollection = filterCollection.get('collection');
          filterCollection.reset([], {silent: true});
        }
        return filterCollection;
      },


      // create collections for each filter group  
      // we create this as a model that gets added to this collection
      createFilterGroupCollection: function(group) {
        // remove the key and title from the passed in filters
        var filters = _.omit(group, ['key', 'title']);
        var filterGroupCollection = this.getFilterGroupCollection(group.key);
        _.each(filters, function(numItems, filterName) {
          var filterModel = new Backbone.Model({
            key              : group.key,
            title            : group.title,
            numItems         : numItems,
            filterName       : filterName,
            displayFilterName: fetchDisplayFilterName(filterName, group.key),
            type             : this.entityType
          });
          filterGroupCollection.addFilter(filterModel);
        }, this);
        this.allFilters.add(filterGroupCollection.models);
        this.filterGroupCollections.push({
            groupKey: group.key,
            groupTitle: groupMap(group.key),
            collection: filterGroupCollection
        });
      }
    };

    // selected filter mixin
    SelectedFilterMixin = {
      // find a model that matches the filter passed on from the searchBus
      findMatchingModel: function(filterModel) {
        return this.chain()
                   .filter(function(model) {
                     return model.get('key') === filterModel.get('key') &&
                     model.get('filterName') === filterModel.get('filterName'); 
                   })
                   .last()
                   .value();
      },

      watchForFilterEmptyRequest: function() {
        var self = this;
        searchBus.filter(function(value) {return value.type === 'empty_selected_filters';})
                 .onValue(function(value) {
                   self.removeFilters();
                 });
      },
     
      removeFilters: function() {
        var filterModel;
        if (this.length > 0) {
          filterModel = this.first();
          this.remove(filterModel);
          this.removeFilters();
        }
        else {
          this.sendFiltersEmptyEvent();
        }
      },
      sendFiltersEmptyEvent: function() {
        searchBus.push({
          type: 'filter_empty',
          entityType: this.entityType
        });
      },

      // if the search results from free text search do not contain
      // one of the selected filters, remove it
      removeRedundantFilters: function(allFilters) {
        this.each(function(model) {
         var modelFound = (allFilters.findWhere({
            key: model.get('key'),
            filterName: model.get('filterName')
          }));
         if (modelFound === undefined) {
           this.remove(model);
         }
          
        }, this);

      },

      watchForFilterRequest: function() {
        searchBus.toEventStream()
                 .filter(filterFilterListRequest)
                 .onValue(this.sendCurrentFilters.bind(this));
      },

      // turn all the filter models int json objects
      serializedFilter: function() {
        return this.chain()
                   .map(convertToJSON)
                   .map(excludeKeys)
                   .value();
      },

      sendCurrentFilters: function(value) {
        searchBus.push({
          type: 'filter_list_result_' + value.content.key,
          content: {
            entityType: this.entityType,
            filters: this.serializedFilter()
          }
        });
      },

      // remove previous date filter from selected filters if it exists
      removeExistingDateFilters: function(filterModel) {
        // a wee date filter
        var filterDateFilters = function(model) {
          return model.get('dateFilter') === true;
        };

        // this should only be done if there are two date filters
        if (this.filter(filterDateFilters).length === 2) {
          var dateFilter = this.chain()
            .filter(filterDateFilters)
            .reject(function(model) { 
              return model.cid === filterModel.cid; 
            })
            .last()
            .value();
          this.remove(dateFilter);
        }
      },

      // iterate over the filters to updated the totals/existence of each
      // filter model after an all entity search
      updateFilterTotals: function(filterModel) {
        var filterName,
            self = this,
            model = this.findMatchingModel(filterModel);

        if (model !== undefined) {
            model.set('numItems', filterModel.get('numItems'));
            searchBus.push({
              type: 'selected_item',
              content: model
            });
          }
      }
    };
    return {
      FilterGroupMixin: FilterGroupMixin,
      SelectedFilterMixin: SelectedFilterMixin
    };
});
