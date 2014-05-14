/*global window, document, define */
/* simple event dispatcher module
 * used to pass messages around our app
 */
(function(window, document, undefined) {
  define(
    ['backbone', 'underscore'],
    function(Backbone, _) {
      'use strict';
      var dispatcher = {};
      _.extend(dispatcher, Backbone.Events);
      return dispatcher;
  });
}(window, document));

