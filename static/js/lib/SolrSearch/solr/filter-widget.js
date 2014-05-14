/*global define, AjaxSolr*/
// Author: Cormac McGuire
// ### Description
// provide a filter widget that allows for filtering based on the filters
// returned from the original solr search

define(
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/SolrSearch/solr/parse-filters',
    'lib/SolrSearch/solr/query-builder',
    // solr shizz
    'core/Core',
    'core/AbstractFacetWidget'
  ],
  function(Backbone, _, Streams, ParseFilter, QueryBuilder) {
    'use strict';
    var FilterWidget,
        searchBus = Streams.searchBus,
        navBus    = Streams.navBus,
        filterQueryBuilderEvents = function(value) {
            return value.type === 'query_builder';
        },
        filterSearchRequestEvents = function(value) {
          return value.type === 'new_search';
        },
        // parse actor results from the result object
        filterActors = function(element) {
          return element.django_ct.search(/actor/) > -1;
        },
        // parse bulletin results from the result object
        filterBulletin = function(element) {
          return element.django_ct.search(/bulletin/) > -1;
        },
        filterShouldUpdateResults = function(value) {
          return value.options.silent !== true;
        },

        // parse incident results from the result object
        filterIncident = function(element) {
          return element.django_ct.search(/incident/) > -1;
        },

        // mapping to relate nav keys to filter function
        filterMap = {
          actor: filterActors,
          incident: filterIncident,
          bulletin: filterBulletin
        },

        // send the results off to the search bus
        pushResults = function(results, entityType) {
          Streams.searchBus.push({
            type: 'results_' + entityType,
            content: results
          });
        },

        // extract content from filter event
        mapFilterToValue = function(value) {
          return value.content;
        };

    // ## FilterWidget
    // Create a widget to send / receive filtered searches to/from solr
    FilterWidget = AjaxSolr.AbstractFacetWidget.extend({
      queryString: '',
      entity: '',
      sendFilter: true,

      // constructor
      // start our event listeners
      // create a collection to manager our filters, bind the sendRequest
      // function to change events on the collection
      init: function(){
        this.watchFilterEvents();
        this.watchSearchStream();
        //this.watchQueryBuilderStream();
        this.filterCollection = new Backbone.Collection();
        this.doRequest = _.debounce(this.doRequest, 300);
        //this.filterCollection.on('reset', this.sendRequest, this);
      },

      emptyQueryStrings: function() {
        this.manager.store.remove('q');
        this.manager.store.remove('fq');
        return this;
      },
      populateFreeTextQueryString: function () {
        if (this.queryString === undefined) {
          this.sendBlankQuery();
        }
        else {
          this.sendParsedQuery(this.queryString);
        }
        return this;
      },

      sendParsedQuery: function(queryString) {
        if (queryString.length) {
          var parsedQueryString = this.parseQuery(this.queryString);
          this.manager.store.addByValue('q', parsedQueryString );
          this.manager.store.addByValue('rows', 1000 );
          this.sendRequest();
        }
        else {
          this.sendBlankQuery();
        }
      },

      sendBlankQuery: function() {
        this.manager.store.addByValue('q', 'django_ct:*' + this.manager.entity);
        this.manager.store.addByValue('rows', 1000 );
        this.sendRequest();
      },




      // empty the previous query, and rebuild a new one, then send the request
      // to solr
      sendRequest: function() {
        this.filterCollection
            .chain()
            .groupBy(function(model){return model.get('key');})
            .each(this.addFacet, this);

        this.doRequest();
      },

      // add a Facet to the query
      addFacet: function(filterGroup, key) {
        this.setField(key);
        var queryString = _.reduce(filterGroup, this.groupFilters, '');
        this.add('(' + queryString + ')');
      },

      // reduce function to build an OR query string from filters
      groupFilters: function(queryString, model) {
        if (queryString.length > 0) {
          queryString = queryString + ' OR ';
        }
        if(model.get('filterName').indexOf(' TO ') === -1){
            queryString = queryString + '("' + model.get('filterName') + '")';
        }else{
            queryString = queryString + '(' + model.get('filterName') + ')';
        }
        return queryString;
      },

      // set the field for a filter
      setField: function(key) {
        if (this.field !== key) {
          this.field = key;
        }
      },
      watchQueryBuilderStream: function() {
        var self = this;
        searchBus.filter(filterQueryBuilderEvents)
                 .onValue(function(value) {
                    self.manager.store.addByValue('q', value.content.raw );
                    self.sendRequest();
                 });
      },
      parseQuery: function(searchQuery) {
        var qb = new QueryBuilder(searchQuery, this.manager.entity);
        return qb.parsedString;
      },
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterSearchRequestEvents)
                 .onValue(function(value) {
                   self.queryString = value.content.raw;
                 });
      },

      // watch for the addition and removal of filters
      watchFilterEvents: function() {
        searchBus.filter(function(value) {
                   return value.type ===
                     'filter_event_add_' + this.manager.entity;
                 }.bind(this))
                 .filter(filterShouldUpdateResults)
                 .map(mapFilterToValue)
                 .onValue(function(value) {

                   this.filterCollection.reset(value);
                   this.sendFilter = false;
                   this.emptyQueryStrings()
                    .populateFreeTextQueryString();
                 }.bind(this));
      },


      // push results up to the search stream
      sendResults: function(searchResults) {
        searchResults.results =
          _.chain(searchResults.results)
           .filter(filterMap[this.manager.entity])
           .value();
        pushResults(searchResults, this.manager.entity);
      },

      // parse the new filters from solr
      sendFilters: function(filters) {
        var fp = new ParseFilter(filters, this.manager.entity);
      },

      // process the results from solr
      afterRequest: function () {
        var searchResults = this.manager.response.response.docs,
            numFound = this.manager.response.response.numFound,
            filters = this.manager.response.facet_counts.facet_fields;
        this.sendResults({
          results: searchResults,
          numFound: numFound
        });
        //only send new filters after a keyword search
        if (this.sendFilter) {
          this.sendFilters(filters);
        }
      }

    });

    return {
      FilterWidget: FilterWidget
    };

});
