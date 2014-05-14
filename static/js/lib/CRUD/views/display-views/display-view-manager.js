/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// This view manages the display area, it listens for navigation events and
// displays our entities base on the path sent  
// It instantiates actor bulletin and incident views and handles their
// disposal

define (
  [
    'backbone', 'underscore', 'jquery',
    'lib/streams',
    'lib/CRUD/views/display-views/actor/actor-display-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-display-container',
    'lib/CRUD/views/display-views/incident/incident-display-container',
    'lib/Navigation/TabRouter',
    'lib/CRUD/templates/display-templates/display-manager.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, $, Streams,
    ActorDisplayView, BulletinDisplayView, IncidentDisplayView,
    TabRouter,
    displayManagerContainerTmp, i18n) {
    'use strict';

    var DisplayManagerView,
        navBus = Streams.navBus,
        viewMap = {
          actor: ActorDisplayView,
          bulletin: BulletinDisplayView,
          incident: IncidentDisplayView
        },
        isFinalized = function(uri) {
          try {
            var entityStatus = _.findWhere(
              Bootstrap.all_statuses, {resource_uri: uri});
            return entityStatus.key === 'finalized';
          }
          catch(e) {
            return false;
          }
        },
        extractEntity = function(value) {
          return value.content;
        },
        filterNavEvent = function(value) {
          return value.type=== 'navigate';
        },
        filterEntityNav = function(value) {
          return value.type === 'entity-display';
        };

    // ### DisplayManagerView
    // 
    DisplayManagerView = Backbone.View.extend({
      template: displayManagerContainerTmp,
      el: '.form_overlay',
      childViews: [],
      expanded: false,
      currentTab: '',

      events: {
        'click .display.do-hide'        : 'closeViewRequested',
        'click button.do-select'        : 'selectRequested',
        'click button.do-expand'        : 'expandRequested',
        'click button.do-collapse'      : 'collapseRequested',
        'click .do-edit'                : 'editRequested'
      },

      initialize: function() {
        this.watchNavEvents();
      },
      getRouter: function() {
        this.router = this.router || TabRouter.getTabRouter();
        return this.router;
      },

      closeViewRequested: function(evt) {
        evt.preventDefault();
        this.getRouter().navigate(
          '#tab/' + this.currentTab, {trigger: true});
        this.destroyChildren();
        this.$el.children().remove();
      },

      // edit requested trigger the request edit function
      // TODO - change this to be event driven
      editRequested: function() {
        this.$el.children().remove();
        _.last(this.childViews).requestEdit();
        this.destroyChildren();
      },
      selectRequested: function(evt) {
         var selected = this.model.get('checked') === 'checked' ?
           true : false;
         if (selected === true) {
           this.model.unset('checked');
         }
         else {
           this.model.set('checked', 'checked');
         }
      },
      updateChecked: function(model) {
        var changingClass = model.get('checked') === 'checked' ?
          '.selected' : '.unselected';
        this.$selectionEl.children(changingClass)
                         .removeClass('hidden')
                         .siblings()
                         .addClass('hidden');

      },

      expandRequested: function() {
        this.expandView();
        _.last(this.childViews).trigger('expand');
      },
      expandView: function() {
        var routeTemplate = _.template(
          '<%=model.entityType %>/<%=model.id %>/expanded'),
            route = routeTemplate({
              model: this.model.toJSON()
            });
        this.getRouter().navigate(route);
        this.$el.children().addClass('is-expanded');
      },

      collapseView: function() {
        var routeTemplate = _.template(
          '<%=model.entityType %>/<%=model.id %>'),
            route = routeTemplate({
              model: this.model.toJSON()
            });
        this.getRouter().navigate(route);
        this.$el.children().removeClass('is-expanded');
      },

      collapseRequested: function() {
        _.last(this.childViews).trigger('expand');
        this.collapseView();
      },


      // watch for navigate to entity events
      watchNavEvents: function() {
        navBus.filter(filterEntityNav)
              .map(extractEntity)
              .onValue(this.displayEntity.bind(this));

        navBus.filter(filterNavEvent)
              .onValue(function(value) {
                this.currentTab = value.content.entity;
              }.bind(this));
      },

      // display an entity
      displayEntity: function(content) {
        this.expanded = content.expanded;
        content.expanded = false;
        this.renderContainer(content)
            .renderEntity(content)
            .disableEditIfFinalized(content);
        if (this.expanded) {
          this.expandRequested();
        }
        else {
          this.collapseView();
        }
      },

      // destroy child views
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      passesFinalized: function(entityStatus) {
        return !(isFinalized(entityStatus)
          && Bootstrap.perms.can_update_to_finalized === false);
      },
      mayEdit: function() {
        if (Bootstrap.perms.can_edit_entities) return true;
        if (Bootstrap.perms.can_edit_assigned_entities &&
            this.model.get('assigned_user') === Bootstrap.userResource) {
          return true;
        }
        return false;

      },


      isEditable: function(entityStatus) {
        var passesFinalized = this.passesFinalized(entityStatus),
            mayEdit = this.mayEdit();
        return passesFinalized && mayEdit;
      },


      disableEditIfFinalized: function(content) {
        var entityStatus =
          this.model.get('most_recent_status_' + content.entity);


        if (this.isEditable(entityStatus) === false) {
          this.$el.children()
                  .children()
                  .children('button.do-edit')
                  .remove();
        }
      },

      // render an entity
      renderEntity: function(entityDetails) {
        this.destroyChildren();
        var displayView = new viewMap[entityDetails.entity]({
          el: '.' + entityDetails.entity + '-container',
          entityDetails: entityDetails
        });
        this.model = displayView.model;

        //trigger a resize to be passed on to the map views
        //to get over them being rendered when not actually in the dom
        displayView.trigger('resize');
        displayView.selectInitialLanguage();
        this.updateSelectListener();
        this.childViews.push(displayView);
        return this;
      },

      updateSelectListener: function() {
        this.stopListening();
        this.listenTo(this.model, 'change', this.updateChecked.bind(this));
        this.updateChecked(this.model);
      },

      // render the container
      renderContainer: function(content) {
        content.i18n = i18n;
        var html = this.template(content);
        this.$el.children().remove();
        this.$el.append(html);
        this.setSelectionEl();
        return this;
      },
      setSelectionEl: function() {
        this.$selectionEl = this.$el.children()
                                .children('.footer.actions')
                                .children('.do-select')
                                .children('.selection');
      }
    });

    return DisplayManagerView;
    
});
