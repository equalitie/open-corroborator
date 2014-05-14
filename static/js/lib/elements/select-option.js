/*global define*/
// Author: Cormac McGuire
// ### Description
// Select option for lists, used for multiple select options

define (
  [
    'backbone',
    'lib/elements/templates/select-option.tpl'
  ],
  function (Backbone, selectOptionTmp) {
    'use strict';
    var SelectOptionView;

    // ### SelectOptionView
    // render a single select option
    SelectOptionView = Backbone.View.extend({
      tagName: 'option',
      initialize: function() {
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },
      onDestroy: function() {
        this.stopListening();
      },
      render: function() {
        this.$el.attr('value', this.model.get('resource_uri'));
        this.$el.attr('selected', true);
      }
    });

    return SelectOptionView;
    
});



