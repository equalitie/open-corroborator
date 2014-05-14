/*global define, Bootstrap */
// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/views/search-views/actor/actor-search-field',
    'lib/CRUD/views/search-views/media/media-search-field',
    'lib/CRUD/views/search-views/revision/revision-view',
    'lib/Data/LocationCollection',
    'lib/CRUD/data/ConditionCollection',
    // templates
    'lib/CRUD/templates/search-templates/actor/actor.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, _, Backbone, Streams, Mixins, ActorSearchView, MediaSearchView,
    RevisionView, Location, Condition,  actorFormTmp, i18n) {
    'use strict';

    var ActorFormView,
        crudBus             = Streams.crudBus,
        Formatter           = Mixins.Formatter,
        WidgetMixin         = Mixins.WidgetMixin,
        LocationCollection  = Location.LocationCollection,
        ConfirmMixin        = Mixins.ConfirmMixin,
        ConditionCollection = Condition.ConditionCollection,

        userList = function() {
          return Bootstrap.gl_ac_users_list;
        };

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      template: actorFormTmp,
      className: 'actor-overlay overlay WIREFRAME',
      childViews: [],
      subscribers: [],
      entityType: 'actor',
      expanded: false,
      events: {
        'click button#actor-action_save'  : 'saveRequested',
        'click button#expanded-actor-save': 'saveRequested',
        'click button.do-hide'            : 'requestCloseForm',
        'change #status'                  : 'onSelectStatus'
      },

      // define the fields that will have autocomplete enabled  
      // className refers to the input field which will have the autocomplete
      // result, content is an array of usernames and ids. name is the name of
      // the hidden field that stores the userid
      autoCompleteFields: [
        {
          className: '.is-assigned-to',
          content  : userList(),
          name     : 'assigned_user'
        }
      ],

      // keys for date fields, these need to be validated and removed
      // from the model object if invalid
      dateFields: ['DOB'], 

      // ids of combo boxes
      comboIds: ['#sex', '#age', '#civilian'],

      // represent free text input fields that will autocomplete
      // based on the content of the collection, these labels will
      // persist based on the model type in the collecion
      labelFields: {
        condition: {
          containerid: '#actor-condition-block',
          collection : ConditionCollection,
          multiple: false,
          bus: crudBus,
          eventIdentifier: 'actor_condition',
          display: {
            field_name : 'condition',
            field_label: i18n.actor.condition
          },
          content: {
            values: 'condition'
          }
        },
        POB: {
          containerid: '#actor-pob-block',
          collection : LocationCollection,
          multiple: false,
          bus: crudBus,
          eventIdentifier: 'actor_pob',
          display: {
            field_name : 'POB',
            field_label: i18n.actor.Place_Of_Birth
          },
          content: {
            values: 'POB'
          }
        },
        current_location: {
          containerid: '#actor-current-location-block',
          collection : LocationCollection,
          multiple: false,
          bus: crudBus,
          eventIdentifier: 'actor_current',
          display: {
            field_name : 'current_location',
            field_label: i18n.actor.Current_Location
          },
          content: {
            values: 'current_location'
          }
        }

      },
      mapFields: [
        {
          containerid: '#actor-current-map-block',
          locationSource: 'actor_current_label',
          bus: crudBus
        },
        {
          containerid: '#actor-pob-map-block',
          locationSource: 'actor_pob_label',
          bus: crudBus
        }
      ],
      // constructor
      initialize: function(options) {
        this.multiple = options.multiple;
        this.addi18n();
        this.populateWidgets();
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        // a little trickery here - cos we use toggleExpanded to render the view
        this.expanded = ! options.expanded;
        this.displayForm  = this.displayFormFunction();
        //this.model.set('actors', options.selected);
        this.model.set('selectedActors', options.selected);
      },

      // toggle the expanded switch and render the form
      toggleExpanded: function() {
        this.displayForm();
        if (this.expanded === true) {
          this.expanded = false;
          this.$el.removeClass('is-expanded');
          this.$el.addClass('is-preview');
          this.$el.children('.body')
                  .children('.first')
                  .children('.Actor')
                  .removeClass('is-expanded')
                  .addClass('in-preview');

          this.$el.children('.body')
                  .children('.first')
                  .removeClass('span-66p');
        }
        else {
          this.expanded = true;
          this.$el.addClass('is-expanded');
          this.$el.removeClass('is-preview');
          this.$el.children('.body')
                  .children('.first')
                  .children('.Actor')
                  .addClass('is-expanded')
                  .removeClass('in-preview');
          this.$el.children('.body')
                  .children('.first')
                  .addClass('span-66p');
        }
        if (this.multiple === true) {
          this.hideMultipleElements();
        }
        this.sendResizeEvent();
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
      hideMultipleElements: function() {
        $('.hide-multiple').remove();
      },

      // hack to make stupid map view work
      sendResizeEvent: function() {
        _.each(this.childViews, function(view) {
          view.trigger('resize');
        });
      },

      // return a function that creates the form only once
      displayFormFunction: function() {
        return _.once(function() {
          this.render()
              .renderChildren()
              .enableWidgets()
              .setUpScrollToPositions();
        });
      },

      

      // remove the dom elements and all associated events
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



      // we need to remove DOB from the object if they do not have
      // valid dates - test it baby
      validateDateFields: function(formContent) {
        var invalidKeys = [];
        _.each(formContent, function(value, key) {
          if (_.indexOf(this.dateFields, key) !== -1 && this.validateDate(value)=== null) {
            invalidKeys.push(key);
          }
        }, this);
        return _.omit(formContent, invalidKeys);

      },
      validateDate: function(dateString) {
        return dateString.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/);
      },



      delegateSave: function() {
        if (this.model.isNew() === true) {
          crudBus.push({
            type: 'create_new_actor',
            content: this.model
          });
        }
        this.model.save();
      },

      // render the form
      render: function() {
        var isNew = (this.multiple !== true && this.model.id === undefined);
        var html = this.template({
          model: this.model.toJSON(),
          createStatus: Bootstrap.create_status,
          statuses: Bootstrap.comment_statuses,
          perms: Bootstrap.perms,
          isNew: isNew,
          i18n: i18n
          });
        this.$el.html(html);
        return this;
      },

      // render the sub views
      renderChildren: function() {
        this.destroyChildren();

        var revisionView = new RevisionView({
          el: '.revision-container',
          content: this.model.get('incident_comments')
        });

        // show the media search view
        var mediaSearchView = new MediaSearchView({
          el: '#actor-media-block',
          content: this.model.get('media'),
          entityType: 'actor',
          multiple: false,
          label: i18n.actor.Actor_Image,
          name: 'media'
        });

        var actorSearchView = new ActorSearchView({
          el: '#actor-actor-list-block',
          mainModel: this.model,
          entityType: 'actor',
          relationshipType: 'relation'
        });


        this.childViews.push(mediaSearchView, actorSearchView, revisionView);
        this.actorSearchView = actorSearchView;
        return this;
      }

    });
    //_.extend(ActorFormView.prototype, ConfirmMixin);
    _.extend(ActorFormView.prototype, WidgetMixin);
    _.extend(ActorFormView.prototype, Formatter);
    
    return {
      ActorFormView: ActorFormView
    };

});
