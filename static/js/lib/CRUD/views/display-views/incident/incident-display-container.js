/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Display the incident element and it's related content

define (
  [
    'backbone', 'underscore', 'jquery', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/map-view',
    'lib/CRUD/views/display-views/comment/comment-container',
    'lib/CRUD/views/display-views/misc/event-container',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/views/search-views/revision/revision-view',
    'lib/CRUD/views/display-views/misc/entity-not-found',

    'lib/CRUD/templates/display-templates/incident-display.tpl',
    'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, $, Collections, Streams, CoordinateDisplayView,
    CommentListView, EventListView, ActorListView, BulletinListView,
    IncidentListView, RevisionView, EntityNotFoundView, incidentDisplayTmp,
    expandedIncidentDisplayTmp, i18n) {
    'use strict';

    var IncidentDisplayView,
        crudBus = Streams.crudBus,
        incidentCollection = Collections.IncidentCollection;

    // ### IncidentDisplayView
    // Display and incident and all its related fields
    IncidentDisplayView = Backbone.View.extend({
      template: function() {
        var templateFunc = this.expanded
        ? expandedIncidentDisplayTmp
        : incidentDisplayTmp;
        return templateFunc.apply(this, arguments);
      },
      className: 'Incident in-view',
      expanded: false,
      childViews: [],
      initialize: function(options) {
        this.addi18n();
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = incidentCollection.getEntity(
          options.entityDetails.id, 'incident');
        this.listenTo(this.model, 'sync', this.displayView.bind(this));
        this.listenTo(this.model, 'sync-error', this.displayNotFoundView.bind(this));
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        this.listenTo(this, 'resize', this.sendResizeEvent.bind(this));
        this.expanded = options.entityDetails.expanded === undefined 
          ? false 
          : options.entityDetails.expanded;
      },

      displayNotFoundView: function() {
        this.destroyChildren();
        var entityNotFoundView = new EntityNotFoundView({
          entity: i18n.incident_label
        });
        this.childViews.push(entityNotFoundView);
        this.$el.html(entityNotFoundView.$el);
        return this;
      },

      displayExpandedView: function() {
        this.displayView()
            .renderRevisions();
      },
      displayView: function() {
        this.render()
            .renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents()
            .renderRelatedEvents()
            .renderMap();
            return this;
      },
      toggleExpanded: function() {
        if (this.expanded === true) {
          this.expanded = false;
          this.displayView();
        }
        else {
          this.expanded = true;
          this.displayExpandedView();
        }
      },

      sendResizeEvent: function() {
        _.each(this.childViews, function(view) {
          view.trigger('resize');
        });
      },

      requestEdit: function() {
        crudBus.push({
          type: 'edit_incident_request',
          content: {
            model: this.model,
            expanded: this.expanded
          }
        });
      },
      renderRelatedActors: function() {
        var actorsEl, content, roles_en, actorsContainer;
        actorsEl = this.getContainerEl('actors');
        content = this.model.get('actors');
        roles_en = this.model.get('actor_roles_status');
        actorsContainer = new ActorListView({
          el: actorsEl,
          content: content,
          roles: roles_en,
          expanded: this.expanded
        });
        _.each(actorsContainer.childViews, function(childView) {
          childView.selectInitialLanguage();
        });
        return this;
      },
      renderRelatedBulletins: function() {
        var bulletinsEl, content, bulletinsContainer;
        bulletinsEl = this.getContainerEl('bulletins');
        content = this.model.get('ref_bulletins');
        bulletinsContainer = new BulletinListView({
          el: bulletinsEl,
          content: content,
          expanded: this.expanded
        });
        return this;
      },
      renderRelatedIncidents: function() {
        var incidentsEl, content, incidentsContainer;
        incidentsEl = this.getContainerEl('incidents');
        content = this.model.get('ref_incidents');
        incidentsContainer = new IncidentListView({
          el: incidentsEl,
          content: content,
          expanded: this.expanded
        });
        return this;
      },

      renderRelatedEvents: function() {
        var eventsEl, content, incidentsContainer;
        if (this.expanded) {
          eventsEl = this.$el
                         .children()
                         .children()
                         .children('.body')
                         .children('.is-events');
        }
        else {
          eventsEl = this.$el
                         .children('.header')
                         .children('.group')
                         .children('.events');
        }
        content = this.model.get('times');
        incidentsContainer = new EventListView({
          el: eventsEl,
          content: content
        });
        return this;
      },
      // get the containing el for normal and expanded view
      getContainerEl: function(className) {
        var el;
        if (this.expanded === true) {
          el = this.$el.children()
                       .children()
                       .children('.body')
                       .children('.is-' + className);
        }
        else {
          el = this.$el.children('.body')
                       .children('.' + className);
        }
        return el;
      },
      renderMap: function() {
        // are there any locations
        if (!this.isList('locations', this.model)) {
          return this;
        }
        var mapEl, content, mapContainer, collection;
          mapEl = $('#is-incident-map');

        content = _.map(this.model.get('locations'), function(uri) {
          return { resourceUri: uri };
        });
        mapContainer = new CoordinateDisplayView({
          el: mapEl,
          content: content
        });
        this.childViews.push(mapContainer);
        return this;
      },

      renderRevisions: function() {
        if (!this.isList('incident_comments', this.model)) {
          return this;
        }
        console.log(this.model.get('incident_comments'));
        var revisionView = new RevisionView({
          el: '#revision-container',
          content: this.model.get('incident_comments')
        });
        this.childViews.push(revisionView);
      },

      isList: function(key, model) {
        var field = model.get(key);
        return field !== undefined && field.length > 0;
      },

      // render the container
      render: function() {
        this.destroyChildren();
        this.$el.children().remove();
        var html = this.template({
          model: this.model.translate(),
          i18n: i18n
        });
        this.$el.html(html);
        return this;
      },

      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      }
    });

    return IncidentDisplayView;
});

