/*global define*/
// Author: Cormac McGuire
// ### Description
// This file handles the main search over all three entities  
// The results of this will update collections in the Data folder

define(
  [
    'underscore',
    'lib/SolrSearch/solr/parse-filters',
    'lib/SolrSearch/solr/query-builder',
    'core/AbstractTextWidget'
  ],
  function(_, ParseFilter, QueryBuilder) {
        // parse actor results from the result string
        var filterQueryBuilderEvents = function(value) {
                return value.type === 'query_builder';
            },
            filterEmbeddedSearchEvent = function(value) {
              return value.type === 'new_embedded_search';
            },
            filterSearchUpdateEvent = function(value) {
              return value.type === 'update_current_results';
            },
            filterSearchRequestEvents = function(value) {
              return value.type === 'new_search';
            },
            filterActors = function(element) {
              return element.django_ct.search(/actor/) > -1;
            },

            // parse bulletin results from the result string
            filterMedia = function(element) {
              return element.django_ct.search(/media/) > -1;
            },

            // parse bulletin results from the result string
            filterLocation = function(element) {
              return element.django_ct.search(/location/) > -1;
            },

            // parse bulletin results from the result string
            filterBulletin = function(element) {
              return element.django_ct.search(/bulletin/) > -1;
            },

            // parse incident results from the result string
            filterIncident = function(element) {
              return element.django_ct.search(/incident/) > -1;
            },

            // send the results off to the search bus
            pushActorResults = function(actors, bus) {
              bus.push({
                type: 'results_actor',
                content: actors
              }); 
            },
            pushBulletinResults = function(bulletins, bus) {
              bus.push({
                type: 'results_bulletin',
                content: bulletins
              }); 
            },
            pushMediaResults = function(locations, bus) {
              bus.push({
                type: 'results_media',
                content: locations
              }); 
            };
            pushLocationResults = function(locations, bus) {
              bus.push({
                type: 'results_location',
                content: locations
              }); 
            };
            pushIncidentResults = function(incidents, bus) {
              bus.push({
                type: 'results_incident',
                content: incidents
              }); 
            };

    // AJAX SOLR SEARCH WIDGET
    // TODO: listen for search event to update the search

    var TextWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function (options) {
        if (this.shouldSendFilters === undefined) {
          throw 'you must specify if you want filters sent or' +
            'not after a search';
        }
        if (this.bus === undefined) {
          throw 'you must specify a communication bus for results';
        }
        this.watchSearchStream();
      },
      parseQuery: function(searchQuery) {
        var qb = new QueryBuilder(searchQuery.content.raw,
          searchQuery.content.entity);
        return qb.parsedString; 
      },

      // this is an auto update request 
      sendUpdateRequest: function(searchQuery) {
        this.shouldSendResults = false;
        this.shouldSendFilters = true;
        this.updateRequest     = true;
        this.sendRequest(searchQuery);
      },

      // new search - update filters
      sendSearchRequest: function(searchQuery) {
        this.shouldSendResults = false;
        this.shouldSendFilters = true;
        this.sendRequest(searchQuery);
      },

      // search within form context
      sendEmbeddedSearchRequest: function(searchQuery) {
        this.shouldSendResults = true;
        this.shouldSendFilters = false;
        this.sendRequest(searchQuery);
      },

      // send the request
      sendRequest: function(searchQuery) {
        this.clear();
        this.set( searchQuery );
        this.doRequest(); 
      },

      // watch for search and update search result requests
      watchSearchStream: function() {
        this.bus.filter(filterEmbeddedSearchEvent)
                .map(this.parseQuery)
                .onValue(this.sendEmbeddedSearchRequest.bind(this));

        this.bus.filter(filterSearchRequestEvents)
                 .map(this.parseQuery)
                 .onValue(this.sendSearchRequest.bind(this));


        this.bus.filter(filterSearchUpdateEvent)
           .map(this.parseQuery)
           .onValue(this.sendUpdateRequest.bind(this));
      },
      // send the results off the bus in a super functional way
      // cos that's how we do round here!
      //
      sendResults: function(searchResults) {
        
        pushActorResults(
          _.chain(searchResults)
           .filter(filterActors)
           .value(), this.bus
        );

        pushBulletinResults(
          _.chain(searchResults)
           .filter(filterBulletin)
           .value(), this.bus
        );
         
        pushIncidentResults(
          _.chain(searchResults)
           .filter(filterIncident)
           .value(), this.bus
        );
         
        pushMediaResults(
          _.chain(searchResults)
           .filter(filterMedia)
           .value(), this.bus
        );

        pushLocationResults(
          _.chain(searchResults)
           .filter(filterLocation)
           .value(), this.bus
        );
      },
      sendFilters: function(filters, options) {
        ParseFilter(filters, 'actor', options);
        ParseFilter(filters, 'bulletin', options);
        ParseFilter(filters, 'incident', options);
      },

      afterRequest: function () {
        //this.manager.response.facet_counts.facet_fields['occupation_en_exact'] = {};
        //this.manager.response.facet_counts.facet_fields['occupation_ar_exact'] = {};
        //this.manager.response.facet_counts.facet_fields['position_en_exact'] = {};
        //this.manager.response.facet_counts.facet_fields['position_ar_exact'] = {};
        var searchResults = this.manager.response.response.docs,
            filters = this.manager.response.facet_counts.facet_fields;
        if (this.shouldSendResults === true) {
          this.sendResults(searchResults);
        }
        if (this.shouldSendFilters === true) {
          var options = this.updateRequest ? {silent: true} : {};
          this.sendFilters(filters, options);
          this.updateRequest = false;
        }
      }
    });

    return TextWidget;

});

