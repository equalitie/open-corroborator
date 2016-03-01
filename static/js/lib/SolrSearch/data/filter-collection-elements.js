/*global define*/
// Author: Cormac McGuire
// ### Description
// This defines a SelectedFilterCollection and a Filter Group collection that
// can be re-used across all your filter collections to model groups of 
// filters within each data type and to manage filters selected by each user
// TODO: update location filter models 


define (
  [
    'backbone', 'underscore',
    'lib/SolrSearch/data/location-collection',
    'lib/streams',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (Backbone, _, Location, Streams, i18n) {
    'use strict';

    var FilterGroupCollection,
        LocationCollection = new Location.LocationCollection(),
        filterRemoveFilterEvents = function(value) {
          return value.type === 'remove_filter';
        },
        filterSelectedItem = function(value) {
          return value.type === 'selected_item';
        },
        filterPredefinedSearch = function(value) {
          return value.type === 'predefined_search';
        },
        extractContent = function(value) {
          return value.content;
        },
        searchBus = Streams.searchBus,

        createFilterDirectLoadRequest = function(entityType) {
          return function(value) {
            return value.type === 'filter_event_collection_load_' + entityType;
          };
        },
        locationFilterKeys = [
          //'POB_exact',
          //'current_location_exact',
          'bulletin_locations_exact',
          'incident_locations_exact',
          'actor_searchable_pob_exact',
          'actor_searchable_current_exact',
          'incident_searchable_locations_exact',
          'bulletin_searchable_locations_exact'
        ],

        // add extra detail to location filters
        fetchFilterLocations = function (model) {
          var locModel, displayFilterNameTmp;
          locModel = LocationCollection.find(function(loc) {
            return loc.get('resource_uri') === model.get('filterName');
          });
          if (locModel) {
            locModel = locModel.clone(); // cloned to make sure later versions don't override
            locModel.set(model.toJSON());
            locModel.set('displayFilterName', 
              i18n.filters[locModel.get('key')] + ': ' + locModel.get('name'));
          }
          return locModel;
        };


    // ### FilterGroupCollection
    // Collection to store the groups of filters associated with
    // each entity
    FilterGroupCollection = Backbone.Collection.extend({
      // this needs to be set when creating a filter group collection
      groupKey: '',
      subscribers: [],
      // constructor
      initialize: function(options) {
        this.watchSearchStream();
        this.watchSelectedItemUpdate();
        this.watchForPredefinedSearch();
      },

      addFilter: function(model) {
        model = this.mergeLocations(model);
        this.add(model);
      },

      mergeLocations: function(model) {
        if (_(locationFilterKeys).contains(model.get('key'))){
          model = fetchFilterLocations(model);
        }
        return model;
      },
      
      // watch for removeFilter events
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterRemoveFilterEvents)
                 // check the filter is associated with this group
                 .filter(function(value) {
                   return value.content.get('key') === self.groupKey;
                 })
                 .onValue(function(value) {
                   self.add(value.content);
                 });
      },


      createFilterNameFilter: function(filterName) {
        return function(model) {
          return model.get('filterName') === filterName;
        };
      },

      watchForFilterLoadRequest: function(entityType) {
        this.entityType = entityType;
        var loadFilter = createFilterDirectLoadRequest(entityType);
        searchBus.toEventStream()
                 .filter(loadFilter)
                 .onValue(this.findAndLoadFilter.bind(this));
      },

      findAndLoadFilter: function(value) {
        var nameFilter = this.createFilterNameFilter(value.content.get('filterName'));
        var model = this.chain()
                         .filter(nameFilter)
                         .last()
                         .value();
        if (model) {
          this.remove(model);
          this.trigger('filter_load', model);
          searchBus.push({
            type: 'filter_event_' + this.entityType,
            content: {
              filter: model
            }
          });
        }
      },

      // map a list of models to autocomplete format
      autoCompleteFormat: function() {
        return this.map(this.mapAutoCompleteFormat);
      },

      // convert single model to format expected by jquery ui autocomplete
      mapAutoCompleteFormat: function(model) {
        return {
          label: model.get('label') || model.get('name_en'),
          id   : model.get('resource_uri')
        };
      },

      watchForPredefinedSearch: function() {
        var subscriber =
        searchBus.filter(filterPredefinedSearch)
                 .subscribe(this.updateFilterGroups.bind(this));
        this.subscribers.push(subscriber);
      },

      watchSelectedItemUpdate: function() {
        var subscriber = 
          searchBus.filter(filterSelectedItem)
                   .map(extractContent)
                   .subscribe(this.updateSelectedItem.bind(this));
        this.subscribers.push(subscriber);
      },

      updateFilterGroups: function(evt) {
      },

      updateSelectedItem: function(evt) {
        var selectedFilterModel, filterName, filterKey;
          selectedFilterModel = evt.value();
          filterName = selectedFilterModel.get('filterName');
          filterKey  = selectedFilterModel.get('key');
          this.removeSelectedFilter(filterKey, filterName);
      },

      removeSelectedFilter: function(filterKey, filterName) {
        var filter = 
          this.chain()
              .filter(function (model) {
                return model.get('key') === filterKey &&
                       model.get('filterName') === filterName;
              })
              .last()
              .value();
        
        if (filter !== undefined) {
          this.remove(filter);
        }


      }
    });

    
    
    return {
      FilterGroupCollection: FilterGroupCollection 
    };
});

