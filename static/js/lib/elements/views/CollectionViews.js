/*global define*/
// Author: Cormac McGuire
// ### Description
// Define list views that can be reused to display collections, it will
// auto load the individual list elements from the api

define (
  [
    'backbone', 'underscore'
  ],
  function (Backbone, _) {
    'use strict';
    var ListView, ListLoadView, ModelView, ListPrototype, ListLoadPrototype;

    // list view
    ListPrototype = {
      template: undefined,
      templateVars: {
      },
      destroy: function() {
        this.$el.removeData().unbind();
        this.remove();
        this.undelegateEvents();
        this.destroyChildren();
        this.stopListening();
        if (this.onDestroy) {
          this.onDestroy();
        }
      },
      // destroy child views
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
      },

      // render the container
      render: function () {
        var html = this.containerTmp(this.templateVars);
        this.$el.html(html);
      },

      // render the child models
      renderChildren: function() {
        var html = this.containerTmp(this.templateVars);
        this.destroyChildren();
        this.collection.each(this.renderChild, this);
      },

      // render a single model
      renderChild: function (model) {
        var childView = new this.childView({
          model: model,
          expanded: this.expanded
        });
        this.childViews.push(childView);
        this.$el.children('.' + this.fieldType + '-list')
                .append(childView.el);
      }
    };

    // create the List View
    ListView = Backbone.View.extend();
    _.extend(ListView.prototype, ListPrototype);

    // create a prototype that can be used to autoload resources
    // from their passed in uri
    // TODO - Load from passed in solr collection option
    ListLoadPrototype = {
      loadFromList: function(list) {
        this.collection = new Backbone.Collection();
        this.listenTo(this.collection, 'sync', this.renderChildren.bind(this));
        _.each(list, this.loadExistingContent, this);
      },
      loadFromCollection: function (uri, collection) {
        return  _.last(collection.where(
          { resource_uri: uri}
        ));
      },
      loadExistingContent: function(resourceUri) {
        var initialModel = new this.modelType({
          resourceUri: resourceUri
        });
        this.collection.add(initialModel);
      }
    };

    // create our List view adding the extra functionality on to the prototype
    ListLoadView = Backbone.View.extend();
    _.extend(ListLoadView.prototype, ListLoadPrototype);
    _.extend(ListLoadView.prototype, ListPrototype);

    // ### ModelView render a single model
    ModelView = Backbone.View.extend({
      // constructor, call the render function
      initialize: function(options) {
        this.templateVars.expanded = options.expanded ? 'expanded' : '';
        this.addi18n();
        this.render();
        this.listenTo(this.model, 'change', this.render);
      },

      // render the model with template vars hung off model,
      // and set the html of this view to be the result
      render: function() {
        var html = this.template({
          model: this.model.toJSON(),
          i18n: this.templateVars.i18n,
          expanded: this.templateVars.expanded
        });
        this.$el.html(html);
        this.selectInitialLanguage();
      }
    });

    // expose our Views
    return {
      ListView: ListView,
      ModelView: ModelView,
      ListLoadView: ListLoadView
    };
});

