/*global define*/
// Author: Cormac McGuire
// ### Description
// Apply the saved search with all its' filters

define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';
    var init, filterPredefinedSearchRequest, filterFiltersEmpty, filterNavigate,
    createFilterUpdateFilter, SearchLoader, searchBus, navBus, FilterSender;


    searchBus = Streams.searchBus;
    navBus = Streams.navBus;

    filterNavigate = function(value) {
      return value.type === 'navigate';
    };
    createFilterUpdateFilter = function(entityType) {
      return function (value) {
        return value.type === 'filter_group_updated' &&
             value.entity === entityType;
      };
    };

    filterFiltersEmpty = function(value) {
      return value.type === 'filter_empty';
    };
    
    filterPredefinedSearchRequest = function(value) {
      return value.type === 'predefined_search';
    };
    init = function() {
      var searchLoader = new SearchLoader();
    };

    SearchLoader = function() {
      this.watchForSearchLoadRequests();
      this.watchForEmptiedFilters();
      this.watchCurrentTab();
    };

    SearchLoader.prototype = {

      // used to decide if all filters have been reset
      emptyFlags: {
        actor: false,
        bulletin: false,
        incident: false
      },

      // hold the search text
      searchObject: {
        raw: '',
        encoded: ''
      },

      // watch the nav bus for the current selected entity
      watchCurrentTab: function() {
        navBus.toEventStream()
              .filter(filterNavigate)
              .onValue(this.setCurrentLocation.bind(this));
      },

      // store the current entity
      setCurrentLocation: function(value) {
        this.currentLocation = value.content.entity;
      },

      // predefined search loaded reset our flags
      resetEmptyFlags: function() {
        this.emptyFlags.actor = 
          this.emptyFlags.bulletin =
          this.emptyFlags.incident = false;
      },

      // are the selected filter groups empty
      checkFiltersEmpty: function () {
        return this.emptyFlags.actor    === true &&
               this.emptyFlags.bulletin === true &&
               this.emptyFlags.incident === true;
      },

      // listen for a request to load a search
      watchForSearchLoadRequests:function() {
        searchBus.toEventStream()
                 .filter(filterPredefinedSearchRequest)
                 .onValue(this.loadSearch.bind(this));
        return this;
      },

      // load the contents of the latest search and request that the 
      // filters be cleared
      loadSearch: function(value) {
        this.filters = {
          actor: value.content.get('actor_filters'),
          incident: value.content.get('incident_filters'),
          bulletin: value.content.get('bulletin_filters')
        };
        this.searchObject.raw = value.content.get('search_string');
        this.searchObject.encoded = value.content.get('search_string');
        this.resetEmptyFlags();
        this.emptyCurrentSelectedFilters();
      },

      // send a request out to have all selected filters cleared
      emptyCurrentSelectedFilters: function() {
        searchBus.push({
          type: 'empty_selected_filters'
        });
        return this;
      },


      // wait for the current filters to be emptied 
      watchForEmptiedFilters: function () {
        searchBus.filter(filterFiltersEmpty)
                 .onValue(this.setEmptyFlag.bind(this));
        return this;
      },
      
      // set a flag that an entities filters have beed cleared
      setEmptyFlag: function(value) {
        this.emptyFlags[value.entityType] = true;
        if (this.checkFiltersEmpty()) {
          this.sendSearchRequest();
        }
      },
      
      // send the text search
      sendSearchRequest: function () {
        var actorFilterSender = new FilterSender(
          'actor', this.filters, this.currentLocation);
        var incidentFilterSender = new FilterSender(
          'incident', this.filters, this.currentLocation);
        var bulletinFilterSender = new FilterSender(
          'bulletin', this.filters, this.currentLocation);
        searchBus.push({
          type: 'search_updated',
          content: this.searchObject
        });
      }
      
    };

    FilterSender = function(entityType, filters, currentLocation) {
      this.entityType = entityType;
      this.currentLocation = currentLocation;
      this.filters = filters[entityType];
      this.filterFunction = createFilterUpdateFilter(entityType);
      this.watchForFilterUpdate();
    };

    FilterSender.prototype = {
      watchForFilterUpdate: function() {
        this.unsubscribe = 
          searchBus.filter(this.filterFunction)
                   .subscribe(this.sendFilters.bind(this));
      },
      sendFilters: function(evt) {
        var filterSender = this.sendFilter;
        this.unsubscribe();
        // use the filter view to select itself
        if (this.currentLocation === this.entityType) {
          _.each(this.filters, this.unloadFilterView, this);
        }
        _.each(this.filters, filterSender, this);
          
      },

      sendFilter: function(filter) {
        searchBus.push({
          type: 'filter_event_collection_load_' + this.entityType,
          content: new Backbone.Model(filter)
        });
      },

      unloadFilterView: function(filter) {
        searchBus.push({
          type: 'filter_event_unload_' + this.entityType,
          content: new Backbone.Model(filter)
        });
      }
    };

    return {
      init: init
    };
});

