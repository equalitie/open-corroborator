/*global require*/
// Author: Cormac McGuire
// ### Description: entry point for the monitor application
// 
define(
  [
    'backbone',
    'lib/monitor/router/monitor-router',
    'lib/elements/helpers/view-close',
    'lib/elements/helpers/date-helper',
    'jquery', 'jquery_ui', 'jquery_time'
  ],
  function (Backbone, MonitorRouter) {
  'use strict';

  var router = new MonitorRouter();
  Backbone.history.start();
  
});
