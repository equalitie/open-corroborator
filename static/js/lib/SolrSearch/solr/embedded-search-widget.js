/*global define, AjaxSolr*/
// Author: Cormac McGuire
// ### Description
// Do search for embedded search

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/SolrSearch/solr/parse-filters',
    'lib/SolrSearch/solr/query-builder',
    'core/Core',
    'core/AbstractTextWidget'
  ],
  function (Backbone, _, Streams, ParseFilter, QueryBuilder) {
    'use strict';
    var EmbeddedSearchWidget,
        crudBus = Streams.crudBus,
        filterQueryBuilderEvents = function(value) {
            return value.type === 'query_builder';
        },
        filterActors = function(element) {
          return element.django_ct.search(/actor/) > -1;
        },

        // parse bulletin results from the result string
        filterBulletin = function(element) {
          return element.django_ct.search(/bulletin/) > -1;
        },

        // parse incident results from the result string
        filterIncident = function(element) {
          return element.django_ct.search(/incident/) > -1;
        },
        filterCrudSearchRequestEvents = function(value) {
          return value.type === 'embedded_search';
        };

    EmbeddedSearchWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function() {
        this.watchCrudStream();
        //this.watchQueryBuilderStream();
      },
      // TODO find out if is this doing anything
      watchQueryBuilderStream: function() {
        var self = this;
        this.bus.filter(filterQueryBuilderEvents)
                 .onValue(function(value) {
                    self.clear();
                    self.set( value.content.raw );
                    self.doRequest();
                 });    
      },
      sendRequest: function(searchQuery) {
        this.clear();
        this.set( searchQuery );
        this.doRequest(); 
      },
      parseQuery: function(searchQuery) {
        var qb = new QueryBuilder(searchQuery.content.raw);
        return qb.parsedString;
      },
      // look for search requests on the crudBus
      watchCrudStream: function() {
        var self = this;
        crudBus.toEventStream()
               .filter(filterCrudSearchRequestEvents)
                 .map(this.parseQuery)
                 .onValue(this.sendRequest.bind(this));
      },
      // send the results off on the crudBus
      sendResults: function() {
      },
      // called by super class
      afterRequest: function() {
      }
    });
    return EmbeddedSearchWidget;
});

