/*global define*/
// Author: Cormac McGuire  
// Collection to store the filters sent by solr  
// These are rendered into views in lib/SolrSearch/views/filters  
// Content comes from the search bus events identified by parse_filters_actor  
// This should not be used directly, filter-collections.js aggregates and 
// provides access to collection instances

define(
  [
    'backbone', 'bacon', 'underscore',
    'lib/streams',
    'lib/SolrSearch/data/filter-collection-mixins'
  ],
  function(Backbone, Bacon, _, Streams, Mixins) {
    'use strict';


    // shared functionality with other filter collections
    var FilterGroupMixin = Mixins.FilterGroupMixin,
        SelectedFilterMixin = Mixins.SelectedFilterMixin,

        // filter out event with notification of actor filter createion
        filterGroupUpdated = function(value) {
          return value.type === 'filter_group_updated' &&
                 value.entity === 'actor';
        },
        
        // event filters
        filterActorFilters = function(value) {
          return value.type === 'parse_filters_actor';
        },
        filterUpdateFiltersAndResults = function(value) {
          return value.options.silent === undefined;
        },
        filterUpdateFiltersOnly = function(value) {
          return value.options.silent === true;
        },
        filterSelectedItemEvents = function(value) {
          return value.type === 'selected_item_actor';
        },

        // actor filter event
        filterActorFilterEvents = function(value) {
          return value.type === 'filter_event_actor';
        },

        // map solr facet to labels
        filterTitles = {
          'age_en_exact': 'Age::en',
          'age_ar_exact': 'Age::ar',
          'sex_en_exact': 'Gender::en',
          'sex_ar_exact': 'Gender::ar',
          'civilian_en_exact': 'Civilian::en',
          'civilian_ar_exact': 'Civilian::ar',
          'religion_en_exact': 'Religion::en',
          'religion_ar_exact': 'Religion::ar',
          'nationality_en_exact': 'Nationality::en',
          'nationality_ar_exact': 'Nationality::ar',
          'occupation_en_exact': 'Occupation::en',
          'occupation_ar_exact': 'Occupation::ar',
          'position_en_exact': 'Position::en',
          'position_ar_exact': 'Position::ar',
          'ethnicity_en_exact': 'Ethnicity::en',
          'ethnicity_ar_exact': 'Ethnicity::ar',
          'spoken_dialect_en': 'Spoken Dialect::en',
          'spoken_dialect_ar': 'Spoken Dialect::ar',
          'actor_created_exact': 'Created date',
          'dob_exact': 'Date of birth'
        },

        // used to map the filters object to an array of objects with the 
        // key set as a field called key on each object
        createFilterGroup = function(key) {
            var filterGroup = this.content[key];
            filterGroup.key = key;
            filterGroup.title = filterTitles[key];
            return filterGroup;
        },


        // pull the filters from the message content
        extractFilters = function(value) {
          var keys = _.keys(value.content);
          return _.map(keys, createFilterGroup, value);
        },
        searchBus = Streams.searchBus;
        
    // ### ActorFilterCollection
    // This collection stores the filter groups related to actors  
    // listens for remove_filters event triggered directly on the collection
    // by a view displaying it's contents
    var ActorFilterCollection = Backbone.Collection.extend({
      selectedFilters: undefined,
      filterGroupCollections: [],
      entityType: 'actor',
      allFilters: new Backbone.Collection(),

      initialize: function() {
        this.watchSearchStream();
        this.on('select_filter', this.selectFilter, this);
        this.on('reset', this.sendResetEvent, this);
      },


      // watch for events in the search stream and pull out the
      // actor filter ones
      watchSearchStream: function() {
        var self = this;
        // user selected filter or search run
        searchBus.toProperty()
                 .filter(filterActorFilters)
                 .filter(filterUpdateFiltersAndResults)
                 .map(extractFilters)
                 .onValue(function(value) {
                   self.createFilterGroupCollections(value);
                 });
        // filter auto update
        searchBus.toProperty()
                 .filter(filterActorFilters)
                 .filter(filterUpdateFiltersOnly)
                 .map(extractFilters)
                 .onValue(function(value) {
                   self.createFilterGroupCollections(value, {silent: true});
                 });
        //searchBus.filter()
                 
        searchBus.toProperty()
                 .filter(filterSelectedItemEvents)
                 .onValue(function(value) {
                   self.remove(value.content);
                 });
      }
    });
    // apply mixin
    _.extend(ActorFilterCollection.prototype, FilterGroupMixin);


    // ### SelectedActorFilterCollection
    // Maintain a list of selected actor filters  
    // This needs to watch for filters being added from filter views
    // and removed by selectedfilter views  
    // It also needs to update the counts if a currently selected filters numbers
    // have updated, and remove the filter if it doesn't apply
    var SelectedActorFilterCollection = Backbone.Collection.extend({
      entityType: 'actor',
      initialize: function(options) {
        this.watchSearchStream();
        this.on('add remove', this.sendFilter, this);
        this.on('add', this.removeExistingDateFilters, this);
      },

      // watch for filters being added/ removed via filter clicks
      // and from the overall search
      watchSearchStream: function() {
        this.watchForFilterSelect();
        this.watchForFilterReset();
        this.watchForFilterRequest();
        this.watchForFilterEmptyRequest();
      },

      // watch for select actor filter events and add the selected filter to the
      // collection
      watchForFilterSelect: function() {
        searchBus.filter(filterActorFilterEvents)
                 .onValue(function (value) {
                   this.add(value.content.filter);
                 }.bind(this));
      },


      // a new text search has been run, remove all filters which no longer
      // are relevant
      watchForFilterReset: function() {
        var self = this;
        // this receives the new models from the
        searchBus.filter(filterGroupUpdated)
                 .onValue(function(allFilters) {
                   allFilters.content.each(self.updateFilterTotals, self);
                   self.removeRedundantFilters.call(self, allFilters.content);
                   self.sendFilter(undefined, allFilters.options);
                 });
      },

      sendFilter: function(filterModel, options) {
        options = options || {};
        Streams.searchBus.push({
          type: 'filter_event_add_actor',
          content: this.models,
          options: options
        });
      }

    });
    // extend the Collection with methods common to all selected filter collections
    _.extend(SelectedActorFilterCollection.prototype, SelectedFilterMixin);
    

    return {
      ActorFilterCollection: ActorFilterCollection,
      SelectedActorFilterCollection: SelectedActorFilterCollection
    };


});
