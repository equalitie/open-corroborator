/*global define, Bootstrap */
// Author: Cormac McGuire

// ### Description
// Handle create update of bulletin(s)

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/data-entry/streams',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/data/SourceCollection',
    'lib/CRUD/data/LabelCollection',
    'lib/Data/LocationCollection',
    'lib/Data/bulletin',
    // child views
    'lib/CRUD/views/comment-form',
    'lib/CRUD/views/display-views/comment/comment-container',
    'lib/CRUD/views/event-form',
    'lib/CRUD/views/display-views/event/event-container',
    'lib/CRUD/views/search-views/media/media-search-field',
    'lib/CRUD/views/display-views/media/media-container',
    'lib/CRUD/views/map-view',
    'lib/data-entry/data/collections',
    'lib/data-entry/utils',
    // templates/search-templates
    'lib/data-entry/templates/bulletin-form.tpl',
    'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, _, Backbone, Streams, Mixins,
    // data
    Source, Label, Location, Bulletin,
    // views
    CommentForm, CommentListView, EventForm, EventListView, MediaSearchView,
    MediaListView, CoordinateDisplayView,
    Collections, Utils,
    bulletinFormTmp, bulletinDisplayTmp, i18n) {
    'use strict';

    var BulletinFormView,
        BulletinPreviewView,
        dataEntryBus         = Streams.dataEntryBus,
        BulletinModel        = Bulletin.BulletinModel,
        Formatter            = Mixins.Formatter,
        ConfirmMixin         = Mixins.ConfirmMixin,
        WidgetMixin          = Mixins.WidgetMixin,
        CommentContainerView = CommentForm.CommentContainerView,
        EventContainerView   = EventForm.EventContainerView,
        SourceCollection     = Source.SourceCollection,
        LabelCollection      = Label.LabelCollection,
        LocationCollection   = Location.LocationCollection,
        bulletinCollection   = Collections.bulletinCollection,
        maybe                = Utils.maybe,

        userList = function() {
          return Bootstrap.gl_ac_users_list;
        };

    // ###BulletinPreviewView
    // show the bulletin before saving it
    BulletinPreviewView = Backbone.View.extend({
      template: bulletinDisplayTmp,
      childViews: [],
      initialize: function (options) {
        this.render()
            .renderRelatedMedia()
            .renderRelatedComments()
            .renderRelatedEvents()
            .renderMap();
      },
      // destroy child views and remove listeners
      onDestroy: function() {
        this.destroyChildren();
      },
      // invoke destroy on all child views and clear the array
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },
      // get the containing el for normal and expanded view
      getContainerEl: function(className) {
        return  this.$el.children()
                       .children()
                       .children('.body')
                       .children('.is-' + className);
      },
      ensureArray: function(val) {
        return _.isArray(val) 
          ? val
          : [val];
      },

      // render the comments
      renderRelatedEvents: function() {
        var eventsEl, content, eventsContainer;
        eventsEl = this.getContainerEl('events');

        content = this.model.get('times');
        eventsContainer = new EventListView({
          el: eventsEl,
          content: this.ensureArray(content)
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
          content: this.ensureArray(content)
        });
        this.childViews.push(commentsContainer);
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
          content: this.ensureArray(content)
        });
        this.childViews.push(mediaView);
        return this;
      },
      renderMap: function() {
        var mapEl, content, mapContainer, collection;
        mapEl = this.getContainerEl('bulletin-map');
        if (this.model.get('locations') !== undefined &&
            this.model.get('locations').length > 0) {
          content = _.map(this.ensureArray(this.model.get('locations')),
          function(uri) {
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
      render: function() {
        console.log(this.model);
        this.$el.html(this.template({
          model: this.model.toJSON(),
          i18n: i18n
        }));
        this.$el.attr('title', i18n.dialog.Preview_add_bulletin);
        return this;
      }
    });

    // ### BulletinFormView
    // display create/update form for bulletins
    BulletinFormView = Backbone.View.extend({
      className: 'bulletin-overlay overlay WIREFRAME',
      entityType: 'bulletin',
      // class name for all input fields to be processed as a bulletin
      // allows us to nest fields that and exclude them from the 
      // serialised array
      formElClass: 'bulletin-field',
      template: bulletinFormTmp,
      //store a reference to our child views so we can destroy them
      childViews: [],
      // define events to be handled
      events: {
        'click input.save-data-entry'  : 'saveRequested',
      },

      // define the fields that will have autocomplete enabled  
      // className refers to the input field which will have the autocomplete
      // result, content is an array of usernames and ids. name is the name of
      // the hidden field that stores the userid
      // represent free text input fields that will autocomplete
      // based on the content of the collection, these labels will
      // persist based on the model type in the collecion
      labelFields: {
        sources: {
          containerid: '#bulletin-source-block',
          collection : SourceCollection,
          multiple: true,
          display: {
            field_name : 'sources',
            field_label: 'Sources'
          },
          content: {
            values: 'sources',
            labels: 'bulletin_sources'
          }
        },
        labels: {
          containerid: '#bulletin-label-block',
          collection : LabelCollection,
          multiple: true,
          display: {
            field_name : 'labels',
            field_label: 'Labels'
          },
          content: {
            values: 'labels',
            labels: 'bulletin_labels'
          }
        },
        locations: {
          containerid    : '#bulletin-location-block',
          collection     : LocationCollection,
          multiple       : true,
          bus            : dataEntryBus,
          eventIdentifier: 'bulletin_map',
          display: {
            field_name : 'locations',
            field_label: 'Locations'
          },
          content: {
            values: 'locations',
            labels: 'bulletin_locations'
          }
        }

      },
      mapFields: [
        {
          containerid: '#bulletin-map-block',
          locationSource: 'bulletin_map_label',
          bus: dataEntryBus
        }
      ],

      // display a slider for scores
      sliderFields: {
        confidence_score: { // confidence_score
          sliderDiv : '#bulletin-score-block .score-editor .slider',
          display   : '#bulletin_confidence_score',
          formField : 'confidence_score',
          startPoint: 0,
          endPoint  : 100,
          suffix    : '%',
          marks     : [0, 50, 100],
          snap      : false,
          value     : 50 // TODO enable for update
        }
      },
        
      onSelectStatus: function(evt) {
        var selected_uri = $(evt.currentTarget).val();
        var selected = _(Bootstrap.comment_statuses)
          .chain()
          .where({resource_uri: selected_uri})
          .first()
          .value().comment_status;
        $('input[name=status]').val(selected);
      },
      // constructor
      initialize: function(options) {
        this.addi18n();
        this.displayNewModel();
        this.showEditForm = maybe(this.showEditForm);
      },

      // this function gets wrapped with maybe on init, so it wont be called
      // if actorid is null
      showEditForm: function(bulletinId) {
        this.model = bulletinCollection.get(bulletinId) || this.model;
        this.displayForm();
      },

      // create and display a blank model to be added to
      displayNewModel: function() {
        this.removeOldModelListeners();
        this.model = this.createModel();
        this.listenTo(this.model, 'sync', this.modelSaved.bind(this));
        this.listenTo(this.model, 'error', this.modelSaveError.bind(this));
        this.populateWidgets();
        this.displayForm();
      },

      removeOldModelListeners: function() {
        this.stopListening(this.model);
      },

      modelSaveError: function() {
        this.getModal().children('p').text(i18n.SaveFailed);
        setTimeout(this.hideModal.bind(this), 500);
      },

      modelSaved: function() {
        this.getModal().children('p').text(i18n.Saved);
        setTimeout(this.hideModal.bind(this), 500);
        this.displayNewModel();
      },

      createModel: function() {
        return new BulletinModel({
          comment: 'Human Created',
          status: 'Human Created',
          status_uri: '/api/v1/statusUpdate/2/'
        });
      },

      show: function(bulletinId) {
        this.$el.removeClass('hidden');
        this.showEditForm(bulletinId);
      },
      hide: function() {
        this.$el.addClass('hidden');
      },

      // toggle the expanded switch and render the form

      hideMultipleElements: function() {
        $('.hide-multiple').remove();
      },

      // return a function that creates the form only once
      displayForm: function() {
          this.render()
              .renderChildren()
              .enableWidgets()
              .setUpScrollToPositions();
      },

      // remove DOM elements and cancel event handlers
      onDestroy: function() {
        this.disableWidgets();
        this.destroyChildren();
        this.stopListening();
      },
      
      // destroy the sub views
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // handle clear user click
      clearUser: function(e) {
        e.preventDefault();
        $(e.currentTarget).siblings('input').val('');
      },
      validateDateFields: function(formContent) {
        return formContent;
      },

      delegateSave: function() {
        this.displayPreview();
      },
      getModal: function() {
        return this.$modal || $('.modal-cover');
      },
      showModal: function() {
        this.getModal().children('p').text(i18n.Saving);
        this.getModal().removeClass('hidden');
      },
      hideModal: function() {
        this.getModal().addClass('hidden');
      },

      displayPreview: function() {
        var model = this.model,
            previewView = new BulletinPreviewView({
              model: this.model
            }),
            buttons = {},
            showModal = this.showModal.bind(this);

        buttons[i18n.dialog.Confirm] = function() {
          $(this).dialog('close');
          model.save();
          showModal();
          previewView.destroy();
        };
        buttons[i18n.dialog.Cancel] = function() {
          $(this).dialog('close');
          previewView.destroy();
        };

        previewView.$el.dialog({
          buttons: buttons,
          modal: true,
          width: 900
        });

      },

      // render out the child views - comment form, event form, add location,
      // add media, add actors, add related bulletins
      renderChildren: function() {
        this.destroyChildren();


        var commentForm = new CommentContainerView({
          el: '#bulletin-comment-block',
          content: this.model.get('bulletin_imported_comments'),
          entityType: 'bulletin'
        });

        var eventForm = new EventContainerView({
          el: '#bulletin-event-block',
          content: this.model.get('times'),
          entityType: 'bulletin'
        });

        var mediaSearchView = new MediaSearchView({
          el        : '#bulletin-media-block',
          content   : this.model.get('medias'),
          multiple  : true,
          entityType: 'bulletin',
          label     : i18n.bulletin.Related_Media,
          noSearch  : true,
          name      : 'medias'
        });


        // add each new view to the child views array
        this.childViews.push(
          commentForm,
          eventForm
        );
        return this;
      },

      // render the form
      render: function() {
        var html = this.template({
          model: this.model.toJSON(),
          statuses: Bootstrap.comment_statuses,
          i18n: i18n
        });
        this.$el.html(html);
        return this;
      }
    });

    // extend the form view with our mixins
    _.extend(BulletinFormView.prototype, ConfirmMixin);
    _.extend(BulletinFormView.prototype, WidgetMixin);
    _.extend(BulletinFormView.prototype, Formatter);

    return BulletinFormView;
});
