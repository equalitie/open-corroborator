/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/templates/search-templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView,
        crudBus = Streams.crudBus;
    // ### EmbeddedSearchResultsView
    //
    EmbeddedSearchResultsView = {
      events: {
        'click .do-hideResults': 'closeResults'
      },
      template: embeddedResultsTmp,
      className: 'overlay WIREFRAME',
      childViews: [],

      // store a list of stream subscribers
      subscribers: [],
      initialize: function(options) {
        this.render();
        this.watchCrudStream();
        this.collection = new Backbone.Collection();
        this.listenTo(this.collection, 'add remove reset',
          this.collectionUpdated.bind(this));
        this.onInitialize(options);
      },

      // trigger event notifying of embedded reults close request
      closeResults: function() {
        crudBus.push({
          type: 'close_embedded_results',
          content: {}
        });
      },


      // destroy this view
      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
        this.removeSubscribers();
      },

      removeSubscribers: function() {
        _.each(this.subscribers, function(unsub) {
          unsub();
        });
      },

      // ask all child views to destroy
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.$el.children()
                .children()
                .children('ul')
                .empty();
      },
      resetCollection: function(evt) {
        console.info('resetCollection', evt.value().content);
        var currentOpenForEditing = $('#view-actor-id').text()
        var result = evt.value().content
        for (var i in result) {
          if (result[i].django_id == currentOpenForEditing) {
               result.splice(i, 1)
          }
        }
        this.collection.reset(result);
      }
    };


    return {
      EmbeddedSearchResultsView: EmbeddedSearchResultsView
    };
});
