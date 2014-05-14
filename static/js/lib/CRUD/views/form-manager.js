// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/CRUD/views/actor-form',
    'lib/CRUD/views/bulletin-form',
    'lib/CRUD/views/incident-form',
    'lib/streams',
    'lib/Data/actor',
    'lib/Data/bulletin',
    'lib/Data/incident',
    'lib/Data/collections',
    'lib/elements/overlay',
    'lib/Navigation/TabRouter',
    'lib/CRUD/templates/search-templates/confirm-dialog.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, _, Backbone, ActorForm, BulletinForm, IncidentForm,
  Streams, Actor, Bulletin, Incident, Collections, Overlay,
  TabRouter, confirmDialogTmp, i18n) {


    // ## Stream processing helpers
    // map nav events to the filter views we will be displaying
    var crudBus   = Streams.crudBus,
        navBus    = Streams.navBus,
        searchBus = Streams.searchBus,

        // look for update multiple event
        filterUpdateMultipleEvent = function(value) {
          return value.type === 'action_combo_combined' &&
                 value.option === 'update';
        },

        mapUpdateEventToView = function(value) {
          var updateMap = {
            actor: {
              view: ActorForm.ActorFormView,
              nav  : 'actor',
              model: Actor.ActorListUpdateModel
            },
            bulletin: {
              view: BulletinForm.BulletinFormView,
              nav  : 'bulletin',
              model: Bulletin.BulletinListUpdateModel
            },
            incident: {
              view: IncidentForm.IncidentFormView,
              nav  : 'incident',
              model: Incident.IncidentListUpdateModel
            }
          };
          return updateMap[value.navValue];
        },
        mapEntityToCollection = function(entityType) {
          var collectionMap = {
            actor: Collections.ActorCollection,
            bulletin: Collections.BulletinCollection,
            incident: Collections.IncidentCollection
          };
          return collectionMap[entityType];
        },
        filterSelected = function(model) {
          return model.get('checked') === 'checked';
        },
        getResourceUri = function(model) {
          return model.get('resource_uri');
        },
        getSelectedEntities = function(entityType) {
          var collection = mapEntityToCollection(entityType);
          return collection.chain()
                           .filter(filterSelected)
                           .map(getResourceUri)
                           .value();
        },
        // pick the form view to match the create event
        mapCreateEventToView = function(value) {
          var createMap = {
            create_actor: {
              view: ActorForm.ActorFormView,
              model: Actor.ActorModel,
              nav  : 'actor'
              //collection: 
            },
            create_bulletin: {
              view: BulletinForm.BulletinFormView,
              model: Bulletin.BulletinModel,
              nav  : 'bulletin'
            },
            create_incident: {
              view: IncidentForm.IncidentFormView,
              model: Incident.IncidentModel,
              nav  : 'incident'
            }
          };
          return createMap[value.type];
        },

        mapEditEventToView = function(value) {
          var editMap = {
            edit_actor_request: ActorForm.ActorFormView,
            edit_bulletin_request: BulletinForm.BulletinFormView,
            edit_incident_request: IncidentForm.IncidentFormView
          };
          return {
            view: editMap[value.type],
            model: value.content.model,
            expanded: value.content.expanded
          };
        },

        // close embedded search box requested
        filterEmbeddedSearchClose = function(value) {
          return value.type === 'close_embedded_results';
        },

        // look for an event denoting an embedded search
        filterEmbeddedSearchRequest = function(value) {
          return value.type === 'actor-results'    ||
                 value.type === 'bulletin-results' ||
                 value.type === 'location-results' ||
                 value.type === 'media-results'    ||
                 value.type === 'incident-results';
        },

        filterCreateRequest = function(value) {
          return value.type === 'create_actor' ||
                 value.type === 'create_bulletin' ||
                 value.type === 'create_incident';
        },

        filterEditRequest = function(value) {
          return value.type === 'edit_actor_request'    ||
                 value.type === 'edit_bulletin_request' ||
                 value.type === 'edit_incident_request';
        };

    // ### FormManagerView
    // Manage the creation and hiding of forms to save and update actors, bulletins
    // and incidents
    var FormManagerView = Backbone.View.extend({
      el: '.form_overlay',
      currentTab: '',
      currentView: undefined,
      expanded: false,
      router: undefined,
      events: {
        'click .form.do-hide' : 'closeViewRequested',
        'click .do-expand-form'  : 'expandFormRequested',
        'click .do-collapse-form': 'expandFormRequested'
      },
      getRouter: function() {
        this.router = this.router || TabRouter.getTabRouter();
        return this.router;
      },
      // constructor - watch for stream events
      initialize: function() {
        this.watchSearchStream();
        this.watchCrudStream();
        this.router = new Backbone.Router();
      },

      // user clicked x on form
      closeViewRequested: function(evt) {
        evt.preventDefault();
        var $dialog = $(confirmDialogTmp({i18n: i18n})),
            buttons = {},
            view = this,
            closeForm = this.closeCurrentForm;

        // create buttons for the dialog with i18n-able labels
        buttons[i18n.dialog.Close] = function() {
          closeForm.apply(view);
          $(this).dialog('close');
        };
        buttons[i18n.dialog.Cancel] = function() {
          $(this).dialog('close');
        };

        // show the dialog
        $dialog.dialog({
          height: 160,
          modal: true,
          buttons: buttons
        });

      },

      // close the display view - trigger a navigate to tab to allow
      // for reselection of the entity
      closeCurrentForm: function() {
        this.getRouter().navigate(
          '#tab/' + this.currentTab, {trigger: true});
        this.destroyCurrentView();
        this.$el.children().remove();
      },

      expandFormRequested: function() {
        this.expanded = ! this.expanded;
        if (this.expanded === false) {
          this.moveFormToMiddle();
        }
        else {
          this.$el.children().removeClass('is-middle');
        }
        this.currentView.trigger('expand');
      },

      // move the edit form to the middle on collapse if embed is open
      moveFormToMiddle: function() {
        if (this.embeddedFormOpen === true) {
          this.$el.children('.is-expanded').addClass('is-middle');
        }
      },

      // display a semi opaque overlay above the form to prevent futher 
      // edits during save
      showOverlay: function(model) {
        this.overlay = new Overlay({
          $targetEl: this.$el.children('.overlay'),
          widthOffset: 20
        });
        this.overlay.showOverlay();
      },

      // save complete hide the overlay
      hideOverlay: function(model) {
        this.overlay.displaySaved(this.returnToDisplayView.bind(this));
      },

      // save faild - notify user and hide the overlay
      saveFailed: function(model, xhr, options) {
        this.overlay.displayError(this.closeFormAfterSaveError.bind(this));
      },

      closeFormAfterSaveError: function() {
        this.destroyCurrentView();
      },

      // close the form and send message to opent the
      // display view
      returnToDisplayView: function() {
        if (this.multiple !== true) {
          navBus.push({
            type: 'entity-display',
            content: {
              entity: this.model.get('entityType'),
              id: this.model.get('id'),
              expanded: this.expanded
            }
          });
        }
        this.destroyCurrentView();
      },

      // watch for embedded searches being fired move the form position 
      // accordingly
      watchCrudStream: function() {
        crudBus.filter(filterEmbeddedSearchRequest)
               .onValue(function() {
                 this.embeddedFormOpen = true;
                 if (!this.expanded) {
                   this.$el.children().addClass('is-middle');
                 }
               }.bind(this));
        crudBus.filter(filterEmbeddedSearchClose)
               .onValue(function() {
                 this.embeddedFormOpen = false;
                 this.$el.children().removeClass('is-middle');
               }.bind(this));
      },

      // watch for a request to create an entity
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterCreateRequest)
                 .map(mapCreateEventToView)
                 .onValue(function(viewModel) {
                   self.replaceView(viewModel);
                 });

        searchBus.filter(filterUpdateMultipleEvent)
                 .map(mapUpdateEventToView)
                 .onValue(function(view) {
                   self.replaceUpdateView(view);
                 });
        crudBus.filter(filterEditRequest)
               .map(mapEditEventToView)
               .onValue(this.openEditView.bind(this));

        // watch for form close request
      },

      openEditView: function(value) {
        this.expanded = value.expanded;
        this.model = value.model;
        this.destroyCurrentView();
        this.listenForSaveEvents();
        this.currentView = new value.view({
          model: value.model,
          expanded: value.expanded
        });
        
        this.render();
        this.makeFormModal();
      },

      listenForSaveEvents: function() {
        this.listenTo(this.model, 'request', this.showOverlay.bind(this));
        this.listenTo(this.model, 'sync', this.hideOverlay.bind(this));
        this.listenTo(this.model, 'error', this.saveFailed.bind(this));
      },

      listenForCreateEvents: function() {
        this.listenTo(this.model, 'create', this.showOverlay.bind(this));
        this.listenTo(this.model, 'sync', this.hideOverlay.bind(this));
        this.listenTo(this.model, 'error', this.saveFailed.bind(this));
      },

      replaceUpdateView: function(viewMap) {
        this.expanded = false;
        var selected = getSelectedEntities(viewMap.nav);
        this.multiple = true;
        if (selected.length > 0) {
          this.currentTab = viewMap.nav;
          this.destroyCurrentView();
          this.model = new viewMap.model();
          this.listenForSaveEvents();
          this.currentView = new viewMap.view({
            model: this.model,
            entityType: viewMap.nav,
            selected: selected,
            expanded: this.expanded,
            multiple: true
          });
          this.render();
          this.$el.children()
                  .children('.body')
                  .addClass('multiple');
          this.makeFormModal();
        }
      },

      // replace the current form view with the requested one
      replaceView: function(viewModel) {
        this.expanded = false;
        this.currentTab = viewModel.nav;
        this.destroyCurrentView();
        this.model = new viewModel.model({});
        this.listenForSaveEvents();
        this.currentView = new viewModel.view({
          model: this.model,
          expanded: this.expanded
        });
        this.render();
        this.makeFormModal();
      },

      makeFormModal: function() {
        this.$el.prepend('<div class="cover WIREFRAME"></div>');
      },

      // call the destroy method on the current view
      destroyCurrentView: function() {
        this.stopListening();
        if (this.currentView !== undefined) {
          this.currentView.destroy();
          delete(this.currentView);
          this.currentView = undefined;
        }
        this.$el.children('.cover').remove();
      },
      // render the form, calls enable widgets to enable the dropdowns and
      // date widgets, this must be done after the form has rendered
      render: function() {
        this.$el.html(this.currentView.$el);
        this.currentView.toggleExpanded();
      }
    });

    // module export
    return {
      FormManagerView: FormManagerView
    };
});
