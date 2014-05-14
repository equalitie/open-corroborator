/*global window, document, define */
// Author: Cormac McGuire
// ### Application Entry point
// Trigger a search


define(
  [
    'lib/Navigation/main',
    'lib/SolrSearch/main',
    'lib/CRUD/main',
    'jquery', 'underscore',
    // create our event streams
    'lib/streams',
    // register the handlebars helpers
    'lib/elements/helpers/date-helper',
    // ie polyfills
    'lib/elements/helpers/ie-fixes',
    // backbone memory management helpers and some i18n functionality
    'lib/elements/helpers/view-close',
    // augment jquery with jquery ui
    'jquery_ui',
    // augment jquery with jquery form
    'jquery_form',
    // augment jquery with time selector
    'jquery_time',
    'jquery_slider',
    // augment jquery with flowplayer for videos
    'flowplayer'
  ],
  function(Navigation, SolrSearch, CRUD, $, _, Streams) {
    'use strict';
    var actorsLoaded = false,
        bulletinsLoaded = false,
        incidentsLoaded = false,
        searchBus = Streams.searchBus,
        unsub,
        postSearchInit = function() {
          // stop listening for result events
          unsub();
          //start the CRUD application
          CRUD.init();
          // start the navigation application
          Navigation.init();
        },
        initialize = _.once(postSearchInit),
        loadComplete = function(value) {
          if (value.type === 'results_actor') {
            actorsLoaded = true;
          }
          if (value.type === 'results_incident') {
            incidentsLoaded = true;
          }
          if (value.type === 'results_bulletin') {
            bulletinsLoaded = true;
          }
          return actorsLoaded && incidentsLoaded && bulletinsLoaded;
        };
        
    // subscribe search events and create the unsub function which is later
    // used to un-subscribe when we have our results
    unsub = searchBus.toProperty()
                     .filter(loadComplete)
                     .subscribe(postSearchInit);
    // start the SolrSearch application
    SolrSearch.init();
  }
);

