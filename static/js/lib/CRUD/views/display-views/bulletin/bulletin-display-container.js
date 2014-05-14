/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the bulletin element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections', 'lib/streams',

    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/views/display-views/media/media-container',
    'lib/CRUD/views/display-views/comment/comment-container',
    'lib/CRUD/views/display-views/event/event-container',
    'lib/CRUD/views/map-view',
    'lib/CRUD/views/search-views/revision/revision-view',
    'lib/CRUD/views/display-views/misc/entity-not-found',

    'lib/CRUD/templates/display-templates/bulletin-display.tpl',
    'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, Collections, Streams, 
    ActorListView, BulletinListView, IncidentListView, MediaListView,
    CommentListView, EventListView, CoordinateDisplayView, RevisionView,
    EntityNotFoundView, bulletinDisplayTmp, expandedBulletinDisplayTmp, i18n) {
    'use strict';

    var BulletinDisplayView,
        crudBus = Streams.crudBus,
        bulletinCollection = Collections.BulletinCollection;

    // ### BulletinDisplayView
    // Display and bulletin and all its related fields
    BulletinDisplayView = Backbone.View.extend({
      className: 'bulletin-display-view',
      template: bulletinDisplayTmp,
      childViews: [],
      initialize: function(options) {
        this.addi18n();
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = bulletinCollection.getEntity(options.entityDetails.id, 'bulletin');
        this.listenTo(this.model, 'sync', this.redisplayView.bind(this));
        this.listenTo(this.model, 'sync-error', this.displayNotFoundView.bind(this));
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        this.listenTo(this, 'resize', this.sendResizeEvent.bind(this));
        this.expanded = options.entityDetails.expanded === undefined
          ? false 
          : options.entityDetails.expanded;
        this.selectInitialLanguage();
      },

      displayNotFoundView: function() {
        this.destroyChildren();
        var entityNotFoundView = new EntityNotFoundView({
          entity: i18n.bulletin_label
        });
        this.childViews.push(entityNotFoundView);
        this.$el.html(entityNotFoundView.$el);
        return this;
      },

      redisplayView: function() {
        var displayFunction = (this.expanded)
          ? this.displayExpandedView
          : this.displayView;
        displayFunction.bind(this)();

      },

      // edit button pressed 
      requestEdit: function() {
        crudBus.push({
          type: 'edit_bulletin_request',
          content: {
            model: this.model,
            expanded: this.expanded
          }
        });
      },

      // render expanded view
      displayExpandedView: function() {
        this.displayView()
            .renderRelatedEvents()
            .renderRelatedMedia()
            .renderRevisions();
      },

      // display view and standard elements
      displayView: function() {
        this.render()
            .renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents()
            .renderRelatedComments()
            .renderMap();
        return this;
      },

      // switch betwee preview and expanded view
      toggleExpanded: function() {
        if (this.expanded === true) {
          this.template = bulletinDisplayTmp;
          this.expanded = false;
          this.displayView();
        }
        else {
          this.template = expandedBulletinDisplayTmp;
          this.expanded = true;
          this.displayExpandedView();
        }
      },

      sendResizeEvent: function() {
        _.each(this.childViews, function(view) {
          view.trigger('resize');
        });
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
          el = this.$el.children()
                       .children('.body')
                       .children('.' + className);
        }
        return el;
      },
      // render the related actors
      renderRelatedActors: function() {
        var actorsEl, actorsContainer, content, roles_en;
        actorsEl = this.getContainerEl('actors');
        roles_en = this.model.get('actor_roles_status');
        content = this.model.get('actors');
        actorsContainer = new ActorListView({
          el: actorsEl,
          content: content,
          roles: roles_en,
          expanded: this.expanded
        });
        _.each(actorsContainer.childViews, function(childView) {
          childView.selectInitialLanguage();
        });
        this.childViews.push(actorsContainer);
        return this;
      },

      // render the comments
      renderRelatedEvents: function() {
        var eventsEl, content, eventsContainer;
        eventsEl = this.getContainerEl('events');

        content = this.model.get('times');
        eventsContainer = new EventListView({
          el: eventsEl,
          content: content
        });
        this.childViews.push(eventsContainer);
        return this;
      },

      // render the comments
      renderRelatedComments: function() {
        var commentsEl, content, commentsContainer;
        commentsEl = this.getContainerEl('comments');

        content = this.model.get('bulletin_imported_comments');
        commentsContainer = new CommentListView({
          el: commentsEl,
          content: content
        });
        this.childViews.push(commentsContainer);
        return this;
      },

      // render the related bulletins
      renderRelatedBulletins: function() {
        var bulletinsEl, content, bulletinsContainer;
        bulletinsEl = this.getContainerEl('bulletins');

        content = this.model.get('ref_bulletins');
        bulletinsContainer = new BulletinListView({
          el: bulletinsEl,
          content: content,
          expanded: this.expanded
        });
        this.childViews.push(bulletinsContainer);
        return this;
      },

      // render the related incidents
      renderRelatedIncidents: function() {
        var incidentsEl, content, incidentsContainer; 
        incidentsEl = this.getContainerEl('incidents');
        content = this.model.get('ref_incidents');
        incidentsContainer = new IncidentListView({
          el: incidentsEl,
          content: content,
          expanded: this.expanded
        });
        this.childViews.push(incidentsContainer);
        return this;
      },

      // render the related media
      renderRelatedMedia: function() {
        var content, mediaEl, mediaView;
        mediaEl = this.$el.children()
                          .children()
                          .children('.body')
                          .children('.is-media');
        content = this.model.get('medias');
        mediaView = new MediaListView({
          el: mediaEl,
          content: content
        });
        this.childViews.push(mediaView);
        return this;
      },

      renderMap: function() {
        var mapEl, content, mapContainer, collection;
        mapEl = this.getContainerEl('bulletin-map');
        if (this.model.get('locations') !== undefined &&
            this.model.get('locations').length > 0) {
          content = _.map(this.model.get('locations'), function(uri) {
            return { resourceUri: uri };
          });
          mapContainer = new CoordinateDisplayView({
            el: mapEl,
            content: content
          });
          this.childViews.push(mapContainer);
        }
        return this;
      },

      renderRevisions: function() {
        if (!this.isList('bulletin_comments', this.model)) {
          return this;
        }
        var revisionView = new RevisionView({
          el: '#revision-container',
          content: this.model.get('bulletin_comments')
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
          model: this.model.toJSON(),
          i18n: i18n
        });
        this.$el.html(html);
        return this;
      },

      // destroy child views and remove listeners
      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
      },

      // invoke destroy on all child views and clear the array
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      }
    });

    return BulletinDisplayView;
    
});

