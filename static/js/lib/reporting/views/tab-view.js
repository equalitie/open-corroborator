/*global require*/
// Author: Cormac McGuire
// ### view to control reporting tabs - add remove classes
// 

define(
  ['jquery', 'backbone'],
  function($, Backbone) {
    'use strict';

    // control the tabs
    var TabView = Backbone.View.extend({
      events: {
        'click .tabs li': 'showTabSelected'
      },
      initialize: function(options) {
        this.router = options.router;
        this.listenForInitialRoute();
      },

      listenForInitialRoute: function() {
        this.listenToOnce(this.router, 'route', this.setInitialTab.bind(this));
      },

      setInitialTab: function(routeFunc, params) {
        var entityTab = params[0] !== undefined
         ? '.is-' + params + 's'
         : '.is-incidents';
         this.addRemoveClasses($(entityTab));
      },

      showTabSelected:function(evt) {
        this.addRemoveClasses($(evt.currentTarget));
      },

      addRemoveClasses: function($tab) {
        $tab.addClass('current')
            .siblings()
            .removeClass('current');
      }
    });
  
    return TabView;
  }
);
