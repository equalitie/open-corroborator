/*global require*/
// Author: Cormac McGuire
// ### Description: entry point for the simple data entry application
// 
define(
  [
    'backbone',
    'lib/data-entry/router/data-entry-router',
    'lib/elements/helpers/view-close',
    'lib/elements/helpers/date-helper',
    'jquery', 'jquery_ui', 'jquery_time',
    'jquery_form'
  ],
  function (Backbone, DataEntryRouter) {
  'use strict';

  var router = new DataEntryRouter();
  Backbone.history.start();
  
});
