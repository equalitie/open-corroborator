/*global define*/
// Author: Cormac McGuire  
// Collection to store the filters sent by solr  
// These are rendered into views in lib/SolrSearch/views/filters  
// Content comes from the search bus events identified by parse_filters_bulletin  
// This should not be used directly, filter-collections.js aggregates and 
// provides access to collection instances

define(
  [
    'backbone',
    'lib/streams',
    'lib/SolrSearch/data/filter-collection-mixins'
  ],
  function(Backbone, Streams, Mixins) {

    var FilterGroupMixin = Mixins.FilterGroupMixin,
        SelectedFilterMixin = Mixins.SelectedFilterMixin,
        // filters for the bulletin facet events
        filterBulletinFilters = function(value) {
          return value.type === 'parse_filters_bulletin';
        },
        filterGroupUpdated = function(value) {
          return value.type === 'filter_group_updated' &&
                 value.entity === 'bulletin';
        },
        filterBulletinDateFilter = function(value) {
          return value.type === 'date_range_bulletin';
        },
        filterBulletinFilterEvents = function(value) {
          return value.type === 'filter_event_bulletin';
        },
        filterUpdateFiltersOnly = function(value) {
          return value.options.silent === true;
        },
        filterUpdateFiltersAndResults = function(value) {
          return value.options.silent === undefined;
        },
        // these are obsolete now because 
        filterTitles = {
          'bulletin_assigned_user_exact'     : 'Assigned To',
          'most_recent_status_bulletin_exact': 'Status',
          'bulletin_labels_exact'            : 'Labels',
          'bulletin_sources_exact'           : 'Sources',
          'bulletin_created_exact'           : 'Created date'
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
        
    // ### BulletinFilterCollection
    // This collection stores the filters related to bulletins
    var BulletinFilterCollection = Backbone.Collection.extend({
      entityType: 'bulletin',
      filterGroupCollections: [],
      allFilters: new Backbone.Collection(),
      initialize: function() {
        this.watchSearchStream();
        this.on('reset', this.sendResetEvent, this);
      },
      // watch for events in the search stream and pull out the
      // bulletin filter ones
      watchSearchStream: function() {
        var self = this;
        searchBus.toProperty()
                 .filter(filterBulletinFilters)
                 .filter(filterUpdateFiltersAndResults)
                 .map(extractFilters)
                 .onValue(function(value) {
                   self.createFilterGroupCollections(value);
                 });
        // filter auto update
        searchBus.toProperty()
                 .filter(filterBulletinFilters)
                 .filter(filterUpdateFiltersOnly)
                 .map(extractFilters)
                 .onValue(function(value) {
                   self.createFilterGroupCollections(value, {silent: true});
                 });
        return this;
      }

    });
    _.extend(BulletinFilterCollection.prototype, FilterGroupMixin);

    // ### SelectedBulletinFilterCollection
    // Maintain a list of selected bulletin filters 
    var SelectedBulletinFilterCollection = Backbone.Collection.extend({
      entityType: 'bulletin',
      initialize: function(options) {
        this.watchSearchStream();
        this.on('add remove', this.sendFilter, this);
        this.on('add', this.removeExistingDateFilters, this);
      },
      watchSearchStream: function() {
        this.watchForFilterRequest();
        var self = this;
        // look for filters being added 
        searchBus.filter(filterBulletinFilterEvents)
                 .onValue(function (value) {
                   self.add(value.content.filter);
                 });

        // look for overall search events that update the filter groups
        searchBus.filter(filterGroupUpdated)
                 .onValue(function(allFilters) {
                   allFilters.content.each(self.updateFilterTotals, self);
                   self.removeRedundantFilters.call(self, allFilters.content);
                   self.sendFilter(undefined, allFilters.options);
                 });

        this.watchForFilterEmptyRequest();
      },

      sendFilter: function(filterModel, options) {
        options = options || {};
        Streams.searchBus.push({
          type: 'filter_event_add_bulletin',
          content: this.models,
          options: options
        });
      }
    });
    _.extend(SelectedBulletinFilterCollection.prototype, SelectedFilterMixin);

    return {
      BulletinFilterCollection: BulletinFilterCollection,
      SelectedBulletinFilterCollection: SelectedBulletinFilterCollection
    };


});
