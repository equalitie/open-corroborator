/*global define*/
// Author: Cormac McGuire
// ### Description: 
// wrap the home button - trigger a search with the assigned user set
// to the current user across all entities

define(
  [
  'backbone', 'lib/streams', 'lib/Navigation/TabRouter'],
  function (Backbone, Streams, Router) {
  'use strict';

  var HomeSearchView = Backbone.View.extend({
    el: '.home',
    events: {
      'click': 'homePressed'
    },
    homePressed: function() {
      var tabRouter = Router.getTabRouter();
      tabRouter.navigate('/', {trigger: true});
    }
  });

  return HomeSearchView;
  
});
