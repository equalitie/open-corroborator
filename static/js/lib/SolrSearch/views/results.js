/**
 * Author: Cormac McGuire
 * results.js
 * Display the results for actors, bulletins and incidents
 */
define(
  [
    'jquery',
    'lib/streams',
    'lib/SolrSearch/views/results/ActorResults',
    'lib/SolrSearch/views/results/BulletinResults',
    'lib/SolrSearch/views/results/IncidentResults'
  ],
  function($, Streams, ActorResultsView, BulletinResultsView,
    IncidentResultsView
  ) {
    'use strict';
    var extractResults = function(value) {
      return value.content;
    };

    
    var currentView,
        viewMap = {
          actor: ActorResultsView,
          bulletin: BulletinResultsView,
          incident: IncidentResultsView
        },
        displayCurrentView = function (view) {
          if (currentView !== undefined) {
            $('.results-container').append(currentView.$el);
            currentView.trigger('rendered');
          }
        },
        destroy = function (view) {
          if (view !== undefined) {
            view.destroy();
          }
        },

        // show the actor search results view
        showResultsView = function(entity) {
          // destroy current view
          destroy(currentView);
          // show actor view
          currentView = new viewMap[entity]();
          displayCurrentView();
        },

        filterTabNav = function(value) { return value.type === 'navigate'; },
        mapNavToEntity = function(value) { return value.content.entity; },
        actorClicked = function(value) { return value === 'actor'; },
        incidentClicked = function(value) { return value === 'incident'; },
        bulletinClicked = function(value) { return value === 'bulletin'; };

    //////////////////////////////////////////////////////////////////////////
    // ## init
    //////////////////////////////////////////////////////////////////////////
    // TODO - handle initial load if bulletin selected path sent
    var init = function () {
      // connect to the navStream to choose our initial result display
      var tabSelected = Streams.navProperty
                               .filter(filterTabNav)
                               .map(mapNavToEntity)
                               .onValue(showResultsView);

    };

    return {
      init: init
    };

});
