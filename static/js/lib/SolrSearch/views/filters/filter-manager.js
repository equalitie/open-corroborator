// Author: Cormac McGuire

// ### Description
// 
// 
define(
  [
    // vendor
    'underscore', 'jquery', 'backbone',
    // streams
    'lib/streams',
    // filterViews
    'lib/SolrSearch/views/filters/actor-filters',
    'lib/SolrSearch/views/filters/bulletin-filters',
    'lib/SolrSearch/views/filters/incident-filters'

  ],
  function (_, $, Backbone, Streams, ActorFilters, BulletinFilters, IncidentFilters) {
    'use strict';
    var FilterManagerView,

        // ## Stream processing helpers
        // map nav events to the filter views we will be displaying
        mapNavToView = function(value) {
          var navMap = {
            actor: ActorFilters.ActorFilterView,
            bulletin: BulletinFilters.BulletinFilterView,
            incident: IncidentFilters.IncidentFilterView,
            user: null
          };
          return navMap[value.content.entity];
        },
        filterTabNav = function(value) {
          return value.type === 'navigate';
        },

        filterCloseRequest = function(value) {
          return value.type === 'close_form';
        },
        // filter CRUD events
        filterCRUD = function(value) {
          return value.type === 'create_actor' ||
                 value.type === 'create_bulletin' ||
                 value.type === 'create_incident';
        },

        filterShowDetail = function(value) {
          return value.type === 'show_actor' ||
                 value.type === 'show_bulletin' ||
                 value.type === 'show_incident';
        };

    // ## FilterManagerView
    // manage creation/deletion of filter views
    FilterManagerView = Backbone.View.extend({
      currentView: undefined,
      initialize: function() {
        this.watchNavStream();
        this.watchForHideRequest();
      },
      // watch the navigation stream  
      // map navigation events to the view that needs to be rendered  
      // call the replace view function with the next view to be instantiated
      // and rendered
      watchNavStream: function() {
        var self = this;
        Streams.navBus.filter(filterTabNav)
                      .map(mapNavToView)
                      .onValue(function (view) {
                        self.replaceView(view);
                      });
      },
      // watch for form closing - show our view again
      watchForFormClose: function() {
        var self = this;
        Streams.searchBus.filter(filterCloseRequest)
               .onValue(function(value) {
                 if (self.currentView !== undefined) {
                   self.render();
                 }
               });
      },
      // we need to hide the filters if the user wants to create a
      // new entity or if the user clicks to see the full detail
      // of an entity
      watchForHideRequest: function() {
        var self = this;
        Streams.searchBus.filter(filterShowDetail)
                         .onValue(function () {
                           self.hideCurrentView();
                         }); 
        Streams.searchBus.filter(filterCRUD)
                         .onValue(function () {
                           self.hideCurrentView();
                         }); 
      },
      // remove the rendered elements - do not destroy
      hideCurrentView: function() {
        this.$el.empty();
      },

      // re-display the current view
      showCurrentView: function() {
        this.render();
      },

      // destroy the currently rendered child view and replace it with the
      // next one to be displayed
      replaceView: function(View) {
        this.destroyCurrentView();
        if (View) {
          this.currentView = new View();
        }

      },
      // call the destroy method on the current view
      destroyCurrentView: function() {
        if (this.currentView !== undefined) {
          this.currentView.destroy();
          this.currentView = undefined;
          //delete(this.currentView);
        }
      }
    });

    // module export
    return {
      FilterManagerView : FilterManagerView
    };
});
