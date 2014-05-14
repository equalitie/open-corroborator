/*global define*/
// Author: Cormac McGuire
// ### Routing for the reporting application
// 

define(
  ['backbone', 'lib/streams'],
  function(Backbone, Streams) {
    'use strict';
    var Router,
        navBus = Streams.navBus,
        routerInstance;

    Router = Backbone.Router.extend({
      routes: {
        '': 'openIncidentPage',
        '/': 'openIncidentPage',
        'tab/:route': 'openReportPage'
      },
      openIncidentPage: function() {
        this.openReportPage('incident');
      },
      openReportPage: function(page) {
        navBus.push({
          type: 'navigate',
          content: {
            route: page,
            entity: page
          }
        });
      }
    });

    return Router;
  
  }
);
