/*global define*/
// Author: Cormac McGuire
// ### Description
// This view manages the display of embedded search result views, it creates
// and destroys them as and when needed
// TODO - tidy up result switching

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/search-views/actor/actor-results',
    'lib/CRUD/views/search-views/bulletin/bulletin-results',
    'lib/CRUD/views/search-views/media/media-results',
    'lib/CRUD/views/search-views/incident/incident-results'
  ],
  function (Backbone, _, Streams, ActorResults, BulletinResults, MediaResults, IncidentResults) {
    'use strict';

    var EmbeddedResultsManagerView,
        crudBus = Streams.crudBus,
        embeddedSearchResultViews = {
          'actor': ActorResults.ActorResultsView,
          'incident': IncidentResults.IncidentResultsView,
          'media': MediaResults.MediaResultsView,
          'bulletin': BulletinResults.BulletinResultsView
        },
        filterEmbeddedSearchClose = function(value) {
          return value.type === 'close_embedded_results';
        },
        filterCloseRequest = function(value) {
          return value.type === 'close_form';
        },
        filterBulletinResults = function(value) {
          return value.type === 'bulletin-results';
        },
        filterIncidentResults = function(value) {
          return value.type === 'incident-results';
        },
        filterMediaResults = function(value) {
          return value.type === 'media-results';
        },
        filterActorResults = function(value) {
          return value.type === 'actor-results';
        };
    

    // ### EmbeddedResultsManagerView
    // display a list of results from a search for entities in the create form
    EmbeddedResultsManagerView = Backbone.View.extend({
      el: '.form_overlay',
      initialize: function() {
        this.watchCrudStream();
      },

      // watch for embedded search requests
      watchCrudStream: function() {
        this.watchForActorDisplay();
        this.watchForBulletinDisplay();
        this.watchForIncidentDisplay();
        this.watchForMediaDisplay();
        this.watchForFormClose();
        this.watchForResultClose();
      },
      watchForResultClose: function() {
        var self = this;
        crudBus.filter(filterEmbeddedSearchClose)
               .onValue(function() {
                 self.destroyCurrentView();
               });
      },

      watchForFormClose:function() {
        var self = this;
        crudBus.filter(filterCloseRequest)
               .onValue(function() {
                 self.destroyCurrentView();
               });
      },

      // watch for a request to display the list of returned actors
      watchForActorDisplay: function() {
        var self = this;
        crudBus.filter(filterActorResults)
               .onValue(function() {
                 self.replaceView('actor');
               });
      },
      watchForBulletinDisplay: function() {
        var self = this;
        crudBus.filter(filterBulletinResults)
               .onValue(function() {
                 self.replaceView('bulletin');
               });
      },
      watchForMediaDisplay: function() {
        var self = this;
        crudBus.filter(filterMediaResults)
               .onValue(function() {
                 self.replaceView('media');
               });
      },
      watchForIncidentDisplay: function() {
        var self = this;
        crudBus.filter(filterIncidentResults)
               .onValue(function() {
                 self.replaceView('incident');
               });
      },

      destroyCurrentView: function() {
        if (this.currentView !== undefined) {
          this.currentView.destroy();
        }
      },

      // switch views
      replaceView: function(viewType) {
        this.destroyCurrentView();
        this.currentView = new embeddedSearchResultViews[viewType]();
        this.render();
        this.currentView.delegateEvents();
      },

      render: function() {
        this.$el.append(this.currentView.$el);
      }
    });

    return EmbeddedResultsManagerView;

});


