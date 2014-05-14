/*global define*/
// Author: Cormac McGuire
// ### Description: 
// Open a popup with more information on search functionality

define(
  [
    'backbone', 'underscore', 'jquery',
    'lib/Navigation/templates/search-help.tpl'
  ],
  function (Backbone, _, $, searchHelpTpl) {
  'use strict';
  
  var SearchInfoView;

  SearchInfoView = Backbone.View.extend({
    el: '.info',
    template: searchHelpTpl,
    events : {
      'click': 'showInfoWindow'
    },
    showInfoWindow: function() {
      var html = this.template();
      $(html).dialog({
        modal: true,
        width: 600
      });

    }
  });

  return SearchInfoView;
});

