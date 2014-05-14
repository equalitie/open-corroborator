/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a form to add events to the database and expose and input field
// with added events to be saved to the records it is related to
// Composed of three views EventContainerView holds EventFormView and
// EventDisplayView
define (
  [
    'jquery', 'backbone', 'underscore',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/data/EventCollection',
    'lib/elements/select-option',
    'lib/CRUD/templates/search-templates/event/event-container.tpl',
    'lib/CRUD/templates/search-templates/event/event-display.tpl',
    'lib/CRUD/templates/search-templates/event/event-form.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, _, Mixins, EventData, SelectOptionView,
    eventContainerTmp, eventDisplayTmp, eventFormTmp, i18n) {
    'use strict';

    var EventFormView,
        EventContainerView,
        EventsDisplayView,
        EventDisplayView,
        Formatter    = Mixins.Formatter,
        WidgetMixin  = Mixins.WidgetMixin;

    // ### EventContainerView
    // Hold the other two views
    EventContainerView = Backbone.View.extend({
      //store a reference to our child views so we can destroy them
      childViews: [],
      selectViews: [],

      template: eventContainerTmp,

      // constructor
      initialize: function(options) {
        this.addi18n();
        if (options.entityType === undefined) {
          throw 'Exception: entityType not set';
        }
        this.content = options.content;
        this.collection = new EventData.EventCollection();
        this.listenTo(this.collection, 'sync', this.renderSelectOptions.bind(this));
        this.entityType = options.entityType;
        this.render()
            .renderChildren();
      },

      //destroy the view and it's children
      onDestroy: function() {
        this.stopListening();
        this.destroyChildViews();
        this.destroySelectViews();
      },
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },
      destroySelectViews: function() {
        _.invoke(this.selectViews, 'destroy');
        this.selectViews = [];
      },

      // render all display elements
      renderChildren: function() {
        this.renderEventForm()
            .renderEventsDisplay()
            .renderSelectOptions();
      },

      // render the event form
      renderEventForm: function() {
        var eventFormView = new EventFormView({
          el: '.event-form',
          collection: this.collection
        });
        this.childViews.push(eventFormView);
        return this;
      },

      // render the existing events
      renderEventsDisplay: function() {
        var eventsDisplayView = new EventsDisplayView({
          el: this.$el.children('ul.events'),
          collection: this.collection,
          content: this.content
        });
        this.childViews.push(eventsDisplayView);
        return this;
      },

      // render the select options used by forms above this
      renderSelectOptions: function() {
        this.destroySelectViews();
        this.collection.each(this.addToSelectList, this);
        return this;
      },

      // add a selected option to the hidden select element
      addToSelectList: function(model) {
        var selectOptionView = new SelectOptionView({
          model: model
        });
        this.$el.children('select')
                .append(selectOptionView.$el);
        this.selectViews.push(selectOptionView);
      },

      render: function() {
        var html = this.template({
          entityType: this.entityType,
          i18n: i18n
        });
        this.$el.append(html);
        return this;
      }
    });

    // ### EventFormView
    // Display the event form
    EventFormView = Backbone.View.extend({
      formElClass: 'timeinfo-field',
      entityType: 'timeinfo',
      events: {
        'click .do-addEvent': 'addEventRequested'
      },
      childViews: [],
      selectViews: [],

      // specify slider fields
      sliderFields: {
        confidence_score: { // reliability score ( event )
          sliderDiv : '#bulletin-event-block .score-editor .slider, #incident-event-block .score-editor .slider',
          display   : '.bulletin_event-cscore',
          formField : 'confidence_score',
          startPoint: 0,
          endPoint  : 100,
          suffix    : '%',
          marks     : [0, 50, 100],
          snap      : false,
          value     : 50 // TODO enable for update
        }
      },

      // specify a field to be built as a datetime range element
      dateTimeRangeFields: [
        {
          el: '.event-time-range',
          from: {
            name: 'time_from',
            value: '',
            classes: ''
          },
          to: {
            name: 'time_to',
            value: '',
            classes: ''
          }
        }
      ],

      template: eventFormTmp,
      // constructor - render the form and enable form widgets
      initialize: function() {
        this.render();
        this.enableWidgets();
        this.collection.on('edit', this.populateForm, this);
        this.collection.on('destroy', this.checkCurrentModelMatches, this);
      },

      // handle click on add event
      addEventRequested: function(evt) {
        evt.preventDefault();
        if (this.model === undefined) { // new comment
          var eventModel = new EventData.EventModel(this.formContent());
          eventModel.save();
          this.collection.add(eventModel);
        }
        else { // update existing comment
          this.model.set(this.formContent());
          this.model.save();
          this.model = undefined;
        }
        this.clearForm();
      },

      // populate the form with the model details if the user wants to
      // edit
      populateForm: function(model) {
        this.model = model;
        this.dateTimeRangeFields[0].from.value = model.get('time_from');
        this.dateTimeRangeFields[0].to.value = model.get('time_to');

        this.sliderFields.confidence_score.value = model.get('confidence_score');
        this.render();
        this.$el.children()
                .children('textarea[name=comments_en]')
                .val(model.get('comments_en'));
        this.$el.children()
                .children('textarea[name=comments_ar]')
                .val(model.get('comments_ar'));
        this.enableWidgets();
      },
      // check if we are editing the model that is being deleted
      // empty the form if it is
      checkCurrentModelMatches: function(model) {
        if (_.isEqual(model, this.model)) {
          this.clearForm();
          this.model = undefined;
        }
      },

      clearForm: function() {
        this.render();
        this.sliderFields.confidence_score.value = 50;

        // TODO check for possible mem leak
        this.enableWidgets();
      },

      // remove dom elements and unsubscribe from events
      destroy: function() {
        this.disableWidgets();
        this.collection.off('edit', this.populateForm, this);
        this.collection.off('destroy', this.checkCurrentModelMatches, this);
        this.$el.remove();
        this.undelegateEvents();
      },

      // render dom elements
      render: function() {
        var modelJSON = {};
        if (this.model !== undefined) {
          modelJSON = this.model.toJSON();
        }
        var html = this.template({
          entityType: this.entityType,
          model: modelJSON,
          i18n: i18n
        });
        this.$el.html(html);
      }
    });

    // extend the form view with our mixins
    _.extend(EventFormView.prototype, WidgetMixin);
    _.extend(EventFormView.prototype, Formatter);

    // ### EventsDisplayView
    //
    EventsDisplayView = Backbone.View.extend({
      childViews: [],
      initialize: function(options) {
        this.listenTo(this.collection, 'add remove change', this.render.bind(this));
        this.render();
        if (options.content) {
          _.each(options.content, this.loadExistingContent, this);
        }
      },

      loadExistingContent: function(resourceUri) {
        var initialEventModel = new EventData.EventModel({
          resourceUri: resourceUri
        });
        this.collection.add(initialEventModel);
      },


      onDestroy: function() {
        this.destroyChildren();
        this.stopListening();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },
      render: function() {
        this.destroyChildren();
        this.collection.each(function(model) {
          var eventView = new EventDisplayView({
            model: model,
            collection: this.collection
          });
          this.$el.prepend(eventView.$el);
          this.childViews.push(eventView);
        }, this);
      }
    });

    // ### EventDisplayView
    // display a single event, handle edit/remove events
    EventDisplayView = Backbone.View.extend({
      // define a template
      template: eventDisplayTmp,
      tagName: 'li',
      className: 'comment',
      // define event handlers
      events: {
        'click .do-edit-event': 'editEvent',
        'click .do-remove-event': 'removeEvent'
      },
      // constructor - render the view
      initialize: function() {
        this.render();
      },
      // edit comment clicked - trigger an edit event on the model
      // and send the model with it
      editEvent: function(evt) {
        evt.preventDefault();
        this.collection.trigger('edit', this.model);
      },
      // remove comment clicked, delete the model and destroy
      // this view
      removeEvent: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        this.model.destroy();
        this.destroy();
      },

      // render the comment
      render: function(evt) {
        var html = this.template({
          model: this.model.toJSON(),
          i18n: i18n
        });
        this.$el.empty().append(html);
      }
    });

    return {
      EventContainerView: EventContainerView,
      EventFormView: EventFormView,
      EventsDisplayView: EventsDisplayView,
      EventDisplayView: EventDisplayView
    };
});
