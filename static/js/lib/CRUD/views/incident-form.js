/*global define, Bootstrap */
// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
//

define (
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams',
    'lib/CRUD/views/form-mixins',

    'lib/CRUD/data/LabelCollection',
    'lib/CRUD/data/CrimeCollection',
    'lib/Data/LocationCollection',
    'lib/CRUD/views/search-views/actor/actor-search-field',
    'lib/CRUD/views/search-views/bulletin/bulletin-search-field',
    'lib/CRUD/views/search-views/incident/incident-search-field',
    'lib/CRUD/views/search-views/revision/revision-view',

    // child views
    'lib/CRUD/views/event-form',

    // templates/search-templates
    'lib/CRUD/templates/search-templates/incident/incident.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, _, Backbone, Streams, Mixins,  Label, Crime, Location,
    ActorSearchView, BulletinSearchView, IncidentSearchView, RevisionView,
    EventForm, incidentFormTmp, i18n) {

    var IncidentFormView,
        Formatter    = Mixins.Formatter,
        ConfirmMixin = Mixins.ConfirmMixin,
        WidgetMixin          = Mixins.WidgetMixin,
        EventContainerView   = EventForm.EventContainerView,
        CrimeCollection      = Crime.CrimeCollection,
        LocationCollection   = Location.LocationCollection,
        LabelCollection      = Label.LabelCollection,
        crudBus              = Streams.crudBus,
        userList     = function() {
          return Bootstrap.gl_ac_users_list;
        };

    // ### IncidentFormView
    // display create/update form for incidents
    IncidentFormView = Backbone.View.extend({
      className: 'incident-overlay overlay WIREFRAME',
      entityType: 'incident',
      formElClass: 'incident_form',
      template: incidentFormTmp,
      childViews: [],
      events: {
        'click button#incident-action_save': 'saveRequested',
        'click button#clear-user'          : 'clearUser',
        'click button.do-hide'             : 'requestCloseForm',
        'change #status'                   : 'onSelectStatus'
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

      // represent free text input fields that will autocomplete
      // based on the content of the collection, these labels will
      // persist based on the model type in the collecion
      labelFields: {
        crimes: {
          containerid: '#incident-crime-block',
          collection : CrimeCollection,
          multiple: true,
          display: {
            field_name : 'crimes',
            field_label: i18n.incident.Crime
          },
          content: {
            values: 'crimes'
          }
        },
        labels: {
          containerid: '#incident-label-block',
          collection : LabelCollection,
          multiple: true,
          display: {
            field_name : 'labels',
            field_label: i18n.incident.Labels
          },
          content: {
            values: 'labels'
          }
        },
        locations: {
          containerid: '#incident-location-block',
          collection : LocationCollection,
          multiple: true,
          bus: crudBus,
          eventIdentifier: 'incident_map',
          display: {
            field_name : 'locations',
            field_label: i18n.incident.Locations
          },
          content: {
            values: 'locations'
          }
        }
      },
      
      mapFields: [
        {
          containerid: '#incident-map-block',
          locationSource: 'incident_map_label',
          bus: crudBus
        }
      ],
      sliderFields: {
        confidence_score: { // confidence_score
          sliderDiv : '#incident-score-block .score-editor .slider',
          display   : '#incident_confidence_score',
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

      initialize: function(options) {
        this.addi18n();
        this.populateWidgets();
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        // a little trickery here 
        this.expanded = ! options.expanded;
        this.multiple = options.multiple;
        this.model.set('incidents', options.selected);
        this.displayForm = this.displayFormFunction();
      },


      // toggle the expanded switch and render the form
      toggleExpanded: function() {
        this.displayForm();
        var $body = this.$el.children('.body')
                            .children('.Incident');
        if (this.expanded === true) {
          this.$el.removeClass('is-expanded');
          $body.children('.first')
               .removeClass('span-66p');
          $body.children('.last')
               .removeClass('span-33p');
          $body.removeClass('is-expanded');
          this.expanded = false;
        }
        else {
          this.$el.addClass('is-expanded');
          $body.children('.first')
               .addClass('span-66p');
          $body.children('.last')
               .addClass('span-33p');
          $body.addClass('is-expanded');
          this.expanded = true;
        }
        if (this.multiple === true) {
          this.hideMultipleElements();
        }
        this.sendResizeEvent();
      },

      hideMultipleElements: function() {
        $('.hide-multiple').remove();
      },

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

      // handle clear user click
      clearUser: function(e) {
        e.preventDefault();
        $(e.currentTarget).siblings('input').val('');
      },

      enableWidgets: function() {
        this.enableAutoCompleteFields();
        this.enableSliderFields();
        this.enableLabelFields();
      },

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

      render: function() {
        var isNew = (this.multiple !== true && this.model.id === undefined);
        var html = this.template({
          model: this.model.toJSON(),
          isNew: isNew,
          statuses: Bootstrap.comment_statuses,
          createStatus: Bootstrap.create_status,
          perms: Bootstrap.perms,
          i18n: i18n
        });
        this.$el.html(html);
        return this;
      },
      // pull the data from the form
      formContent: function() {
        var formArray = $('#incident_form').serializeArray();
        return this.formArrayToData(formArray);
      },
      validateDateFields: function(formContent) {
        return formContent;
      },

      delegateSave: function() {
        if (this.model.isNew() === true) {
          crudBus.push({
            type: 'create_new_incident',
            content: this.model
          });
        }
        this.model.save();
      },

      renderChildren: function() {
        var revisionView = new RevisionView({
          el: '.revision-container',
          content: this.model.get('incident_comments')
        });
        var actorForm = new ActorSearchView({
          el:               '#incident-actor-list-block',
          mainModel:        this.model,
          entityType:       this.entityType,
          relationshipType: 'role'
        });
        this.actorSearchView = actorForm;
        var eventForm = new EventContainerView({
          el: '#incident-event-block',
          content: this.model.get('times'),
          entityType: this.entityType
        });
        var bulletinSearchView = new BulletinSearchView({
          el: '#incident-bulletin-block',
          content: this.model.get('ref_bulletins'),
          entityType: this.entityType
        });
        var incidentSearchView = new IncidentSearchView({
          el: '#incident-incident-block',
          content: this.model.get('ref_incidents'),
          entityType: this.entityType
        });
        this.childViews.push(revisionView, actorForm, eventForm,
          bulletinSearchView, incidentSearchView);
        return this;
      }
    });
    _.extend(IncidentFormView.prototype, ConfirmMixin);
    _.extend(IncidentFormView.prototype, WidgetMixin);
    _.extend(IncidentFormView.prototype, Formatter);

    return {
      IncidentFormView: IncidentFormView
    };
    
});
