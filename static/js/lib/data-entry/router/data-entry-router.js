/*global require*/
// Author: Cormac McGuire
// Created: 2013-12-17
// ### Description: router for data entry
// 

define(
  [
    'backbone',
    'lib/data-entry/views/actor-form',
    'lib/data-entry/views/bulletin-form',
    'lib/data-entry/views/list-views',
  ],
  function (Backbone, ActorFormView, BulletinFormView, ListViews) {
  'use strict';
  var el = '',
      actorFormView = new ActorFormView({el: '#actor-form'}),
      bulletinFormView = new BulletinFormView({el: '#bulletin-form'}),
      actorListView  = ListViews.actorListView,
      bulletinListView = ListViews.bulletinListView;

  var DataEntryRouter = Backbone.Router.extend({
    routes: {
      //'actor/:actorId'      : 'editActor',
      //'bulletin/:bulletinId': 'editBulletin',
      ''                    : 'showBulletinForm',
      'tab/actor'           : 'showActorForm',
      'tab/bulletin'        : 'showBulletinForm'
    },
    showActorForm: function(actorId) {
      this.setActorAsCurrentTab();
      actorFormView.show(actorId);
      actorListView.show();
      bulletinFormView.hide();
      bulletinListView.hide();
    },
    showBulletinForm: function(bulletinId) {
      this.setBulletinAsCurrentTab();
      actorFormView.hide();
      actorListView.hide();
      bulletinListView.show();
      bulletinFormView.show(bulletinId);
    },
    editActor: function(actorId) {
      this.showActorForm(actorId);
    },
    editBulletin: function(bulletinId) {
      this.showBulletinForm(bulletinId);
    },

    // these should really be in a view
    getUl: function() {
      this.$ul = this.$ul || $('.tabs').children('ul');
      return this.$ul;
    },
    setBulletinAsCurrentTab: function() {
      this.getUl().children('.is-bulletins')
                  .addClass('current')
                  .siblings()
                  .removeClass('current');
    },
    setActorAsCurrentTab: function() {
      this.getUl().children('.is-actors')
                  .addClass('current')
                  .siblings()
                  .removeClass('current');
    }

  });

  return DataEntryRouter;

  
});
