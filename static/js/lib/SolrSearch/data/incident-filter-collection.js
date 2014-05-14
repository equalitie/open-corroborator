/*global define*/
// Author: Cormac McGuire  
// Collection to store the filters sent by solr  
// These are rendered into views in lib/SolrSearch/views/filters  
// Content comes from the search bus events identified by parse_filters_actor  
// This should not be used directly, filter-collections.js aggregates and 
// provides access to collection instances

define(
  [
    'backbone',
    'lib/streams',
    'lib/SolrSearch/data/filter-collection-mixins'
  ],
  function(Backbone, Streams, Mixins) {

        // filter out the actor filters event
    var FilterGroupMixin = Mixins.FilterGroupMixin,
        SelectedFilterMixin = Mixins.SelectedFilterMixin,
        filterIncidentFilters = function(value) {
          return value.type === 'parse_filters_incident';
        },
        filterIncidentFilterEvents = function(value) {
          return value.type === 'filter_event_incident';
        },
        filterUpdateFiltersOnly = function(value) {
          return value.options.silent === true;
        },
        filterUpdateFiltersAndResults = function(value) {
          return value.options.silent === undefined;
        },
        filterGroupUpdated = function(value) {
          return value.type === 'filter_group_updated' &&
                 value.entity === 'incident';
        },
        filterTitles = {
          'incident_assigned_exact': 'Assigned To',
          'most_recent_status_incident_exact': 'Status',
          'incident_labels_exact': 'Labels',
          'crimes_exact': 'Crimes',
          'incident_created_exact': 'Created date'
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
        
    // ### IncidentFilterCollection
    // This collection stores the filters related to actors
    var IncidentFilterCollection = Backbone.Collection.extend({
      entityType: 'incident',
      allFilters: new Backbone.Collection(),
      filterGroupCollections: [],
      initialize: function() {
        this.watchSearchStream();
        this.on('reset', this.sendResetEvent, this);
      },
      // watch for events in the search stream and pull out the
      // actor filter ones
      watchSearchStream: function() {
        var self = this;
        searchBus.toProperty()
                 .filter(filterIncidentFilters)
                 .filter(filterUpdateFiltersAndResults)
                 .map(extractFilters)
                 .onValue(function(filters) {
                   self.createFilterGroupCollections(filters);
                 });
        // filter auto update
        searchBus.toProperty()
                 .filter(filterIncidentFilters)
                 .filter(filterUpdateFiltersOnly)
                 .map(extractFilters)
                 .onValue(function(filters) {
                   self.createFilterGroupCollections(filters, {silent: true});
                 });
      }
    });
    _.extend(IncidentFilterCollection.prototype, FilterGroupMixin);

    // ### SelectedIncidentFilterCollection
    // Maintain a list of selected incident filters 
    var SelectedIncidentFilterCollection = Backbone.Collection.extend({
      entityType: 'incident',

      // start our event listeners and strema watchers
      initialize: function(options) {
        this.watchSearchStream();
        this.on('add remove', this.sendFilter, this);
        this.on('add', this.removeExistingDateFilters, this);
      },
      watchSearchStream: function() {
        this.watchForFilterSelect();
        this.watchForFilterReset();
        this.watchForFilterRequest();
        this.watchForFilterEmptyRequest();
      },

      // watch for a filter being clicked on
      watchForFilterSelect: function() {
        var self = this;
        searchBus.filter(filterIncidentFilterEvents)
                 .onValue(function (value) {
                   self.add(value.content.filter);
                 });
      },

      // called after the text search fires, this checks all the selected
      // filters and updates the totals associated with them(in case they are 
      // removed and displayed normally again) it then sends the filter
      // off to the filter widget to be reapplied
      watchForFilterReset: function() {
        var self = this;
        searchBus.filter(filterGroupUpdated)
                 .onValue(function(allFilters) {
                   allFilters.content.each(self.updateFilterTotals, self);
                   self.removeRedundantFilters.call(self, allFilters.content);
                   self.sendFilter(undefined, allFilters.options);
                 });
      },

      // send a filter request
      sendFilter: function(filterModel, options) {
        options = options || {};
        Streams.searchBus.push({
          type: 'filter_event_add_incident',
          content: this.models,
          options: options
        });
      }
    });
    _.extend(SelectedIncidentFilterCollection.prototype, SelectedFilterMixin);

    return {
      IncidentFilterCollection: IncidentFilterCollection,
      SelectedIncidentFilterCollection: SelectedIncidentFilterCollection
    };

});
