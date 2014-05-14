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
    'lib/CRUD/views/search-views/bulletin/bulletin-result',
    'lib/CRUD/templates/search-templates/embedded-results.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, Streams, ScrollViewMixin, Results, BulletinResult,
    embeddedResultsTmp, i18n) {
    'use strict';
    var EmbeddedSearchResultsView = Results.EmbeddedSearchResultsView,
        BulletinResultsView,
        crudBus = Streams.crudBus,
        filterBulletinRejected = function(value) {
          return value.type === 'unrelate_bulletin_request';
        },
        filterBulletinResults = function(value) {
          return value.type === 'results_bulletin';
        };

    // ### BulletinResultsView
    // Specific results view for displaying bulletins
    BulletinResultsView = Backbone.View.extend({
      entityType: 'bulletin',
      onInitialize: function(options) {
        this.setUpScrollOptions({
          scrollOptions: {
            listElementHeight: 107,
          }
        });
        this.$el.children('.body').scroll(this.handleScroll.bind(this));
      },

      collectionUpdated: function() {
        console.log('bulletin collectionUpdated');
        this.renderResults();
      },

      // watch the event stream for new bulletins
      watchCrudStream: function() {
        this.watchForSearchResults();
        this.watchForRejectedBulletins();
      },

      watchForRejectedBulletins: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterBulletinRejected)
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
      // watch for bulletin results and set the collection to them when they arrive
      watchForSearchResults: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterBulletinResults)
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

      renderEmpty: function() {},

      // render the search results
      renderResults: function() {
        this.destroyChildren();
        this.renderStart();
      },

      // render a single result
      renderItem: function(model) {
        var resultView = new BulletinResult({
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
    _.extend(BulletinResultsView.prototype, EmbeddedSearchResultsView);
    _.extend(BulletinResultsView.prototype, ScrollViewMixin);
    return {
      BulletinResultsView: BulletinResultsView
    };
});

