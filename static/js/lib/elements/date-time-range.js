/*global define*/
// Author: Cormac McGuire
// ### Description
// View to create a date time range widget

define (
  [
    'jquery', 'backbone',
    'lib/elements/templates/date-time-range.tpl',
    'i18n!lib/elements/nls/dict',
    'jquery_slider'
  ],
  function ($, Backbone, dateRangeTmp, i18n) {
    'use strict';
    var DateTimeRangeView;

    // ### DateTimeRangeView
    // 
    DateTimeRangeView = Backbone.View.extend({
      template: dateRangeTmp,
      initialize: function(options) {
        this.entityType = options.entityType;
        this.templateVars = {
          from: options.from,
          to  : options.to
        };
        this.render();
        this.enableDateTimeFields();
      },

      enableDateTimeFields: function() {
        $('input[name=' + this.templateVars.from.name + ']')
          .datetimepicker({
          });

        $('input[name=' + this.templateVars.to.name + ']')
          .datetimepicker({
          });
      },

      render: function() {
        var html = this.template({
          i18n: i18n,
          entityType: this.entityType,
          options: this.templateVars
        });
        this.$el.append(html);
      }
    });

    return DateTimeRangeView;
    
});


