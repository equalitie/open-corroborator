/*global define*/
// Author: Cormac McGuire
// ### Description
// This module saves a search out to the database, it collects
// the enabled searches and the current search query and persists them

define (
  [
    'underscore', 'bacon', 
    'lib/streams'
  ],
  function (_, Bacon, Streams) {
    'use strict';

    var searchBus, SearchDetailFinder, localBus, filterSaveSearchRequest,
        filterSearchStringReceived, excluded_keys;

    searchBus = Streams.searchBus;
    localBus = new Bacon.Bus();

    //filter keys that we do not want to save
    excluded_keys = [
      'marker'
    ];

    // look for a request to save a search
    filterSaveSearchRequest = function(value) {
      return value.type === 'save_search_form_request';
    };

    // Send a request to get the details of the current search
    SearchDetailFinder = function(){};

    SearchDetailFinder.prototype = {
      filters    : {},
      subscribers: [],

      // start listening for search requests
      init: function() {
        this.watchForSaveSearchRequests()
            .watchForFilterResults()
            .watchForSearchStringResults();
      },

      // listen for requests to save searches
      watchForSaveSearchRequests: function() {
        searchBus.toEventStream()
                 .filter(filterSaveSearchRequest)
                 .subscribe(this.requestSearchDetails.bind(this));
        return this;
      },

      // send requests for the current search string and selected
      // filters
      requestSearchDetails: function(evt) {
        var title = evt.value().content.searchTitle;
        var global = evt.value().content.global;
        this.clearOldDetails()
            .setTitle(title)
            .setGlobalFlag(global)
            .sendFilterRequest()
            .sendSearchStringRequest();
      },

      // clear the old filters out
      clearOldDetails: function() {
        this.filters = {};
        this.searchString = undefined;
        this.searchTitle = undefined;
        return this;
      },

      // set the saved search title
      setTitle: function(title) {
        this.searchTitle = title;
        return this;
      },
      setGlobalFlag: function(global) {
        this.globalFlag = global;
        return this;
      },

      // send a request to have the currently selected filters
      // returned to us
      sendFilterRequest: function() {
        var key = Date.now();
        this.currentSaveRequestKey = key;
        searchBus.push({
          type: 'filter_list_request',
          content: {
            key: key
          }
        });
        return this;
      },

      // watch for the filters being returned by 
      // our selected filter collections
      watchForFilterResults: function() {
        var subscriber = searchBus
                 .toEventStream()
                 .filter(this.filterFilterResults.bind(this))
                 .subscribe(this.updateFilterLists.bind(this));
        this.subscribers.push(subscriber);
        return this;
      },

      filterFilterResults: function(value) {
        return value.type === 'filter_list_result_' + this.currentSaveRequestKey;
      },

      // set the values for our filter lists
      updateFilterLists: function(evt) {
        var entityType, filters;
        entityType = evt.value().content.entityType;
        filters = evt.value().content.filters;
        this.set(entityType, filters);
        this.checkComplete();
      },

      // set the filter value
      set: function(key, value) {
        this.filters[key] = value;
      },

      // send a request to have the search string returned
      sendSearchStringRequest: function() {
        searchBus.push({
          type: 'search_string_request',
          content: {
            key: this.currentSaveRequestKey
          }
        });
        return this;
      },

      filterSearchStringReceived: function(value) {
        return value.type === 'search_string_result_'
          + this.currentSaveRequestKey;
      },

      // wait for the search string to get sent out
      watchForSearchStringResults: function() {
        var subscriber = searchBus.toEventStream()
                 .filter(this.filterSearchStringReceived.bind(this))
                 .subscribe(this.updateSearchString.bind(this));
        this.subscribers.push(subscriber);
        return this;
      },

      updateSearchString: function(evt) {
        this.searchString = evt.value().content.searchString;
        this.checkComplete();
      },


      // check if all our filterlists and search text has been sent
      checkComplete: function() {
        if (this.filters.bulletin !== undefined &&
            this.filters.actor    !== undefined &&
            this.filters.incident !== undefined &&
            this.searchString     !== undefined) {
          searchBus.push({
            type: 'send_saved_search',
            content: {
              searchTitle : this.searchTitle,
              searchString: this.searchString,
              globalFlag  : this.globalFlag,
              filters     : this.filters
            }
          });
        }
      },

    };

    return SearchDetailFinder;
});
