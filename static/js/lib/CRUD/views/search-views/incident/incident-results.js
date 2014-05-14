/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/elements/views/ScrollViewMixin',
    'lib/CRUD/views/search-views/results',
    'lib/CRUD/views/search-views/incident/incident-result',
    'lib/CRUD/templates/search-templates/embedded-results.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, Streams, ScrollViewMixin, Results, IncidentResult,
    embeddedResultsTmp, i18n) {
    'use strict';
    var EmbeddedSearchResultsView = Results.EmbeddedSearchResultsView,
        IncidentResultsView,
        crudBus = Streams.crudBus,
        filterIncidentRejected = function(value) {
          return value.type === 'unrelate_incident_request';
        },
        filterIncidentResults = function(value) {
          return value.type === 'results_incident';
        };

    // ### IncidentResultsView
    // Specific results view for displaying incidents
    IncidentResultsView = Backbone.View.extend({
      entityType: 'incident',

      onInitialize: function(options) {
        this.setUpScrollOptions({
          scrollOptions: {
            listElementHeight: 91,
          }
        });
        this.$el.children('.body').scroll(this.handleScroll.bind(this));
      },

      collectionUpdated: function() {
        this.renderResults();
      },
      // watch the event stream for new incidents
      watchCrudStream: function() {
        this.watchForSearchResults();
        this.watchForRejectedIncidents();
      },

      watchForRejectedIncidents: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterIncidentRejected)
                 .subscribe(this.addModelToCollection.bind(this));
        this.subscribers.push(subscriber);
      },
      addModelToCollection: function(evt) {
        console.log('addModelToCollection', evt.value().content.model);
        var model = evt.value().content.model;
        var exists = this.collection.where({resource_uri: model.get('resource_uri')}).length;
        if (exists === 0) {
          this.collection.add(model);
        }

      },
      // watch for incident results and set the collection to them when they arrive
      watchForSearchResults: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterIncidentResults)
                 .subscribe(this.resetCollection.bind(this));
        this.subscribers.push(subscriber);
      },

      // render a container to hold the results
      render: function() {
        var html = this.template({
          entityType: this.entityType,
          i18n: i18n
        });
        this.$el.append(html);
      },

      // render the search results
      renderResults: function() {
        this.destroyChildren();
        this.renderStart();
      },

      // render a single result
      renderItem: function(model) {
        var resultView = new IncidentResult({
          model: model,
          type: 'result',
          collection: this.collection
        });
        this.$el.children()
                .children()
                .children('ul')
                .append(resultView.$el);
      },
    });
    _.extend(IncidentResultsView.prototype, EmbeddedSearchResultsView);
    _.extend(IncidentResultsView.prototype, ScrollViewMixin);
    
    return {
      IncidentResultsView: IncidentResultsView
    };
});

