/*global define*/
// Author: Cormac McGuire
// ### Description
// Show the list of related bulletins

define (
  [
    'backbone',
    'lib/Data/bulletin',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/bulletins/bulletin-container.tpl',
    'lib/CRUD/templates/display-templates/bulletins/bulletin.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, Bulletin, CollectionViews, bulletinContainerTmp, bulletinTmp, i18n) {
    'use strict';

    var ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView,
        BulletinListView, BulletinView,
        BulletinModel = Bulletin.BulletinModel;

    BulletinView = ModelView.extend({
      templateVars: {
        i18n: i18n
      },
      className: 'related-bulletin',
      template: bulletinTmp
    });

    // ### BulletinListView
    // Display a list of bulletins
    BulletinListView = ListLoadView.extend({
      templateVars: {
        i18n: i18n
      },
      childViews: [],
      modelType: BulletinModel,
      childView: BulletinView,
      fieldType: 'bulletins',
      containerTmp: bulletinContainerTmp,

      initialize: function(options) {
        this.render();
        this.expanded = options.expanded;
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }
    });


    return BulletinListView;
    
});

