/*global define*/
// Author: Cormac McGuire
// ### Description
// display a list of actor results

define (
  [
   'backbone', 'underscore',
    'lib/Data/collections',
    'lib/SolrSearch/templates/results/actor.tpl',
    'lib/SolrSearch/templates/results/actor-results.tpl',
    'lib/SolrSearch/templates/results/empty-results.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (Backbone, _, Collections, actorTmp, actorResultsTmp, emptyResultsTmp, i18n) {
    'use strict';

    var ActorResultsView, ActorResultView;


    ActorResultView = Backbone.View.extend({
      tagName: 'li',
      events: {
        //'click .actor-content': 'expandActor',
        'click .toggle lang:(ar)': 'showArabic',
        'click .toggle lang:(en)': 'showEnglish',
        'click input[type="checkbox"]': 'selectActor'
      },

      // constructor
      initialize: function(options) {
        this.index = options.index;
        this.listenTo(this.model, 'change', this.updateView.bind(this));
        this.listenTo(this.model, 'render', this.render.bind(this));
        this.listenTo(this.model, 'sync', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.addi18n();
        this.render();
      },

      updateView: function(model) {
        if (_.isEqual(model.changed ,{checked: 'checked'})) {
          this.$el.children()
                  .children('.is-selector')
                  .children('input[type=checkbox]')
                  .attr('checked', 'checked');
        }
        else {
          this.render();
        }
      },

      // show longer version in list ( disabled )
      expandActor: function() {
        this.$el.children()
                .children()
                .children()
                .children('.actor-long-summary, .actor-summary')
                .toggleClass('hidden');
      },

      // check the checkbox
      selectActor: function(e) {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.trigger('change', this.model);
      },

      // render a single actor
      render: function() {
        this.$el.empty();
        var pos = this.index % 2 === 1 ? 'right': 'left';
        var html = actorTmp({
          i18n: i18n,
          model: this.model.toJSON(),
          pos:pos
        });
        this.$el.addClass('result');
        this.$el.append(html);
        return this;
      },
      onDestroy: function() {
        this.model.stopListening();
      }

    });

    // Show the results of a search for actors
    ActorResultsView = Backbone.View.extend({
      //el: '.results-body',
      className: 'results-body',

      template: actorResultsTmp,
      events: {
        'scroll': 'handleScroll'
      },
      childViews: [],
      initialize: function() {
        this.addi18n();
        this.collection = Collections.ActorCollection;
        this.listenTo(this.collection, 'add', this.renderItem.bind(this));
        this.listenTo(this.collection, 'sort', this.sortRequested.bind(this));
        this.listenTo(this.collection, 'reset', this.renderStart.bind(this));
        this.listenTo(this, 'rendered', this.setLanguage.bind(this));
        this.render();
        this.renderStart();
      },

      //render container template
      render: function() {
        this.$el.remove().unbind();
        var html = this.template();
        this.$el.html(html);
        return this;
      },

      chunkSize: 30,
      loadAfter: 10,
      currentPage: 0,
      listElementHeight: 66,
      // look at the current position of the scroll bar and determine
      // if we should render the next lot of results
      handleScroll: function(evt) {
        var currentPosition, nextLoad, slice, start, end;
        currentPosition = this.$el.scrollTop();
        if (currentPosition > this.loadAfter * this.listElementHeight) {
          this.loadAfter = this.loadAfter + this.chunkSize;
          start = this.currentPage * this.chunkSize;
          end   = start + this.chunkSize;
          slice = this.collection.slice(start, end);
          _.each(slice, this.renderItem, this);
          this.currentPage = this.currentPage + 1;
        }
      },
      
      sortRequested: function() {
        this.renderStart();
        this.$el.scrollTop(0);
      },

      renderStart: function() {
        this.destroyChildren();
        if (this.collection.length > 0) {
        var renderInitial = this.collection.slice(0, 30);
        this.currentPage = 1;
        this.loadAfter = 10;
        _.each(renderInitial, this.renderItem, this);
        }
        else {
          this.renderEmpty();
        }
      },

      // render a single actor result
      renderItem: function(model, index) {
        var resultView = new ActorResultView({
          model: model,
          index: index
        });
        this.$el.children()
                .children()
                .children()
                .append(resultView.$el);
        resultView.selectInitialLanguage();
        this.childViews.push(resultView);
      },
      setLanguage: function() {
        try {
          _.each(this.childViews, function(actorView) {
            actorView.selectInitialLanguage();
          });
        }
        catch (e) {
        }
      },

      renderEmpty: function() {
        var emptyView = new Backbone.View({
          className: 'empty-results',
        });
        emptyView.$el.html(emptyResultsTmp({
          i18n: i18n
        }));
        this.$el.children()
                .children()
                .children()
                .empty()
                .append(emptyView.$el);
        this.childViews.push(emptyView);
      },

      destroyChildren:function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      onDestroy: function() {
        this.destroyChildren();
        this.stopListening();
      }
    });

    return ActorResultsView;

});
