/*global define, window, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Listen for a search request and pass it on, start a timer that fires the
// search request periodically

define (
  [
    'lib/streams', 'jquery', 'underscore'
  ],
  function (Streams, $, _) {
    'use strict';

    var searchBus = Streams.searchBus, intervalId, activatePolling,
        init, listenForSearchEvents, updateSearchValue, mapToSearchObject,
        restartTimer, sendSearches, filterSearchUpdateRequest, 
        filterSearchStringRequest, listenForSearchStringRequest,
        triggerInitialSearch, sendSearchString, pollForUpdates, getApiUrl,
        requestUpdatedEntities, dispatchUpdates, currentSearchObject, previousUpdate;

    currentSearchObject = {
      content: {
        encoded: '',
        raw: ''
      }
    };
    // send the initial search that will populate our application
    triggerInitialSearch = function() {
      searchBus.push({
        type: 'search_updated',
        content: {
          raw: '',
          encoded: ''
        }
      });
    };

    // filter search text updates
    filterSearchUpdateRequest = function(value) {
      return value.type === 'search_updated';
    };

    // listen on the search bus for new search events
    listenForSearchEvents = function() {
      searchBus.toEventStream()
               .filter(filterSearchUpdateRequest)
               .map(mapToSearchObject)
               .onValue(updateSearchValue);
    };

    filterSearchStringRequest = function(value) {
      return value.type === 'search_string_request';
    };

    // listen for a search string request
    listenForSearchStringRequest = function() {
      searchBus.toEventStream()
               .filter(filterSearchStringRequest)
               .onValue(sendSearchString);
    };

    // send back the current search string
    sendSearchString = function(value) {
      searchBus.push({
        type: 'search_string_result_' + value.content.key,
        content: {
          searchString: currentSearchObject.content.encoded
        }
      });
    };

    // map stream content to search object
    mapToSearchObject = function(value) {
      return {
        content: value.content,
        domain: value.domain
      };
    };
 
    // new search received update the search object
    updateSearchValue = function(searchObject) {
      sendSearches(searchObject, true);
      currentSearchObject = searchObject;
    };

    getApiUrl = function() {
      var url = '/api/v1/solrUpdate/';
      var urlvars = "?format=json&username=" +
      Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
      return url + urlvars;
    };
  
    pollForUpdates = function(searchObject) {
      var success = function(response) {
        var lastUpdate = _.first(response.objects);
        if (!_.isEqual(previousUpdate, lastUpdate)) {
          sendSearches(searchObject, false);
          requestUpdatedEntities();
          previousUpdate = lastUpdate;
        }
      };
      $.ajax({
        url : getApiUrl(),
        success: success
      });
    };

    requestUpdatedEntities = function() {
      var success = function(value) {
        _(value).each(dispatchUpdates);
      };
      var error = function() {
      };
      $.ajax({
        url: '/corroborator/solrrefresh',
        success: success,
        error: error
      });
    };

    dispatchUpdates = function(item, key) {
      var pushUpdates = (item.length) ? function() {
        searchBus.push({
          type: 'solr:update_' + key,
          content: item
        });
      }
      : function() {};
      pushUpdates();
    };

    // send the search object - check for restart
    sendSearches = function(searchObject, isRestartRequired) {
      var search_type = 'update_current_results';
      var content, domain;
      if (isRestartRequired) {
        search_type = restartTimer(searchObject);
      }
      // for ie
      try {
        content = searchObject.content;
      }
      catch (e) {
        content = {raw: '', encoded: ''};
      }
      try {
        domain = searchObject.domain;
      }
      catch (error) {
        domain = '';
      }
      
      searchBus.push({
        type: search_type,
        content: content,
        domain: domain
      });
    };
 
    // restart the timer that periodically resends the search
    restartTimer = function(searchObject) {
      window.clearInterval(intervalId);
      if (activatePolling === true) {
        intervalId = window.setInterval(pollForUpdates, 5000, searchObject, false);
      }
      return 'new_search';
    };
 
    init = function(updateRequired) {
      activatePolling = updateRequired;
      activatePolling = false;
      listenForSearchStringRequest();
      listenForSearchEvents();
      triggerInitialSearch();
    };

    return { 
      init: init
    };
});
