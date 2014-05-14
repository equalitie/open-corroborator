/*global define*/
// Author: Cormac McGuire
// ### View for when an entity is not found - if a user puts a non existent id
// into the url
// 

define(
  [
    'backbone',
    'lib/CRUD/templates/display-templates/misc/entity-not-found.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function(Backbone, entityNotFoundTpl, i18n) {
  'use strict';
  
    return Backbone.View.extend({
      template: entityNotFoundTpl,
      initialize: function(options) {
        this.entity = options.entity;
        this.render();
      },
      render: function() {
        var html = entityNotFoundTpl({
          i18n: i18n,
          entity: this.entity
        });
        this.$el.html(html);
      }
    });
  }
);
