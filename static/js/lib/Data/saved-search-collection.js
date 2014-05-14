/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// This represents the list of saved searches in the system

define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';

    var SavedSearchModel, SavedSearchCollection, filterSaveSearch,
        searchBus, sendSuccessEvent, sendErrorEvent;

    searchBus = Streams.searchBus;

    filterSaveSearch = function (value) {
      return value.type === 'send_saved_search';
    };
    sendSuccessEvent = function() {
      searchBus.push({
        type: 'save_search_response_result',
        content: {
          success: true
        }
      });
    };
    sendErrorEvent = function() {
      searchBus.push({
        type: 'save_search_response_result',
        content: {
          error: true
        }
      });
    };

    // ### SavedSearchModel
    // store and persist saved searches inculding a title and
    // the filters and search string
    SavedSearchModel = Backbone.Model.extend({
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/predefinedSearch/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      },
      parse: function(response){
        response.actor_filters = JSON.parse(response.actor_filters);
        response.incident_filters = JSON.parse(response.incident_filters);
        response.bulletin_filters = JSON.parse(response.bulletin_filters);
        return response;
      }
    });

    // ### SavedSearchCollection
    // store a collection of saved searches
    SavedSearchCollection = Backbone.Collection.extend({
      model: SavedSearchModel,
      initialize: function() {
        this.reset(Bootstrap.predefined_list);
        this.watchForNewSavedSearch();
      },
      watchForNewSavedSearch: function() {
        searchBus.toEventStream()
                 .filter(filterSaveSearch)
                 .onValue(this.addSavedSearch.bind(this));
      },
      addSavedSearch: function(value) {
        var searchModel = value.content;
        var savedSearchModel = new SavedSearchModel({
          search_title    : searchModel.searchTitle, 
          search_string   : searchModel.searchString,
          actor_filters   : searchModel.filters.actor,
          bulletin_filters: searchModel.filters.bulletin,
          incident_filters: searchModel.filters.incident,
          make_global     : searchModel.globalFlag,
          name_en         : searchModel.searchTitle,
          search_request  : 'predefined_search',
          type            : 'predefined_search'
        });
        savedSearchModel.set('user', Bootstrap.userResource);
        this.add(savedSearchModel, {at: 0});
        savedSearchModel.save(savedSearchModel.attributes, {
          success: sendSuccessEvent,
          error: sendErrorEvent
        });
      }
    });

    return {
     SavedSearchCollection: SavedSearchCollection
    };
});
