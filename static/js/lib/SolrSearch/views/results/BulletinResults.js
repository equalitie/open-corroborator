/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Show the bulletin results

define (
  [
    'backbone', 'underscore',
    'lib/Data/collections',
    'lib/SolrSearch/templates/results/bulletin.tpl',
    'lib/SolrSearch/templates/results/bulletin-results.tpl',
    'lib/SolrSearch/templates/results/empty-results.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (Backbone, _, Collections, bulletinTmp, bulletinResultsTmp, emptyResultsTmp, i18n) {
    'use strict';

    var BulletinCollection = Collections.BulletinCollection,
        BulletinResultsView, BulletinResultView;

    //render an individual result
    BulletinResultView = Backbone.View.extend({
      tagName: 'tr',
      events: {
        'click input[type="checkbox"]': 'selectBulletin'
      },

      // constructor
      initialize: function(options) {
        this.addi18n();
        this.index = options.index;
        this.listenTo(this.model, 'change', this.updateView.bind(this));
        this.listenTo(this.model, 'render', this.render.bind(this));
        this.listenTo(this.model, 'sync', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },


      // user clicked checkbox
      selectBulletin: function() {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.trigger('change', this.model);
      },

      updateView: function(model) {
        if (_.isEqual(model.changed ,{checked: 'checked'})) {
          this.$el.children('.is-selector')
                  .children('input[type=checkbox]')
                  .attr('checked', 'checked');
        }
        else {
          this.render();
        }
      },

      // render the bulletin
      render: function() {
        var html = bulletinTmp({
          i18n: i18n,
          model: this.model.toJSON()
        });
        this.$el.empty()
                .addClass('REPEAT Bulletin in-table')
                .append(html);
        return this;
      },

      // remove event listeners
      onDestroy: function() {
        this.stopListening();
      }

    });

    // Show the results of a search for actors
    BulletinResultsView = Backbone.View.extend({
      listElementHeight: 46,

      childViews: [],
      className: 'results-body',
      template: bulletinResultsTmp,
      events: {
        'scroll': 'handleScroll'
      },
      initialize: function() {
        this.collection = Collections.BulletinCollection;
        this.listenTo(this.collection, 'add', this.renderItem.bind(this));
        this.listenTo(this.collection, 'sort', this.sortRequested.bind(this));
        this.listenTo(this.collection, 'reset', this.renderStart.bind(this));
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

      sortRequested: function() {
        this.renderStart();
        this.$el.scrollTop(0);
      },

      // paging config
      chunkSize: 30,
      loadAfter: 10,
      currentPage: 0,
      offset: Bootstrap.locale === 'ar' ? 20: 0,

      // event listener for scroll events, when the scrollbar gets below a 
      // certain height load the next 'page' of elements
      handleScroll: function(evt) {
        var currentPosition, slice, start, end;
        currentPosition = this.$el.scrollTop();
        if (currentPosition > this.loadAfter * (this.listElementHeight-this.offset)) {
          this.loadAfter = this.loadAfter + this.chunkSize;
          start = this.currentPage * this.chunkSize;
          end   = start + this.chunkSize;
          slice = this.collection.slice(start + 1, end);
          _.each(slice, this.renderItem, this);
          this.currentPage = this.currentPage + 1;
        }
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
      // render the empy message
      renderEmpty: function() {
        var emptyView = new Backbone.View({
          className: 'empty-results'
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
      // render each of our actor results
      renderList: function(model, index) {
        this.destroyChildren();
        this.collection.each(this.renderItem, this);
        return this;
      },
      renderItem: function(model, index, list) {
        var resultView = new BulletinResultView({
          model: model,
          index: index
        });
        this.$el.children()
                .children()
                .children()
                .append(resultView.$el);
        this.childViews.push(resultView);
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

    return BulletinResultsView;
});

