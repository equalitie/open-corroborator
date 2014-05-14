/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the incident results

define (
  [
    'backbone', 'underscore',
    'lib/Data/collections',
    'lib/SolrSearch/templates/results/incident.tpl',
    'lib/SolrSearch/templates/results/incident-results.tpl',
    'lib/SolrSearch/templates/results/empty-results.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (Backbone, _, Collections, incidentTmp, incidentResultsTmp, emptyResultsTmp, i18n) {
    'use strict';
    var IncidentResultView, IncidentResultsView,
        IncidentCollection = Collections.IncidentCollection;

    IncidentResultView = Backbone.View.extend({
      tagName: 'tr',
      events: {
        'click input[type="checkbox"]': 'selectIncident'
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
      

      // select an incident - user has clicked the checkbox
      selectIncident: function() {
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

      // render the incident
      render: function() {
        var html = incidentTmp({
          i18n: i18n,
          model: this.model.toJSON()
        });
        this.$el.addClass('result REPEAT Incident in-table');
        this.$el.html(html);
        return this;
      },
      onDestroy: function() {
        this.stopListening();
      }

    });

    // Show the results of a search for actors
    IncidentResultsView = Backbone.View.extend({
      //el: '.results-body',
      childViews: [],
      template: incidentResultsTmp,
      className: 'results-body',

      events: {
        'scroll': 'handleScroll'
      },

      // constructor
      initialize: function() {
        this.collection = IncidentCollection;
        this.listenTo(this.collection, 'add', this.renderItem.bind(this));
        this.listenTo(this.collection, 'sort', this.sortRequested.bind(this));
        this.listenTo(this.collection, 'reset', this.renderStart.bind(this));
        this.render();
        this.renderStart();
      },

      // paging config
      listElementHeight: 62,
      chunkSize: 30,
      loadAfter: 10,
      currentPage: 0,

      // event listener for scroll events, when the scrollbar gets below a 
      // certain height load the next 'page' of elements
      handleScroll: function(evt) {
        var currentPosition, slice, start, end;
        currentPosition = this.$el.scrollTop();
        if (currentPosition > this.loadAfter * this.listElementHeight) {
          this.loadAfter = this.loadAfter + this.chunkSize;
          start = this.currentPage * this.chunkSize;
          end   = start + this.chunkSize;
          slice = this.collection.slice(start + 1, end);
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

      //render container template
      render: function() {
        this.$el.remove().unbind();
        var html = this.template();
        this.$el.html(html);
        return this;
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

      // render a single incident
      renderItem: function(model, index, list) {
        var resultView = new IncidentResultView({
          model: model,
          index: index
        });
        this.$el.children()
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

    return IncidentResultsView;
});

