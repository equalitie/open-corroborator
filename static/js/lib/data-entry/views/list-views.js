/*global define*/
// Author: Cormac McGuire
// ### Display a list of actors, loaded from the bootstrap
// 

define(
  [
    'backbone',
    'lib/data-entry/data/collections',
    'lib/data-entry/templates/actor-list-container.tpl',
    'lib/data-entry/templates/bulletin-list-container.tpl',
    'lib/data-entry/templates/actor-list-item.tpl',
    'lib/data-entry/templates/bulletin-list-item.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function(Backbone, Collections, bulletinContainerTpl, actorContainerTpl,
  actorListItemTpl, bulletinListItemTpl, i18n) {
  'use strict';
    var ItemView, ListView;

    ListView = Backbone.View.extend({
      childViews: [],
      initialize: function(options) {
        this.childTag = options.childTag;
        this.template = options.template;
        this.itemTemplate = options.itemTemplate;
        this.render();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },
      show: function() {
        this.$el.show();
      },
      hide: function() {
        this.$el.hide();
      },

      render: function() {
        this.collection.each(function(model) {
          var itemView = new ItemView({
            tagName: this.childTag,
            template: this.itemTemplate,
            model: model
          });
          this.$el.append(itemView.$el);
          this.childViews.push(itemView);
        }, this);
      }
    });

    ItemView = Backbone.View.extend({
      initialize: function(options) {
        this.template = options.template;
        this.render();
      },
      onDestroy: function() {
        this.stopListening();
      },

      render: function() {
        var html = this.template({
          model: this.model.toJSON(),
          i18n: i18n
        });
        this.$el.html(html);
      }

    });
    var actorListView =  new ListView({
          el: '#actor-list',
          collection: Collections.actorCollection,
          itemTemplate: actorListItemTpl,
          template: actorContainerTpl,
          childTag: 'div'
        }),
        bulletinListView = new ListView({
          el: '#bulletin-list',
          collection: Collections.bulletinCollection,
          template: bulletinContainerTpl,
          itemTemplate: bulletinListItemTpl,
          childTag: 'tr'
        });
    return {
      actorListView: actorListView,
      bulletinListView: bulletinListView
    };
  }
);
