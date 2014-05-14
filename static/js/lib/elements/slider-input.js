/*global define*/
// Author: Cormac McGuire
// ### Description
// Create a widget that holds the manages the input from a slider

define (
  [
    'jquery', 'backbone', 'underscore',
    'lib/elements/templates/label-widget',
    'lib/elements/templates/label'
  ],
  function ($, Backbone, _, labelWidgetTmp, labelTmp) {
    'use strict';

    var LabelWidgetView;

    LabelWidgetView = Backbone.View.extend({
      events: {
      },
      initialize: function() {
        if (this.collection === undefined) {
          throw 'Widget view requires collection';
        }
        this.render();
        this.initAutocomplete();
      },
      initAutocomplete: function() {},

      render: function() {
        var html = labelWidgetTmp();
        this.$el.empty()
                .append();

      }
    });

    return LabelWidgetView;
});


