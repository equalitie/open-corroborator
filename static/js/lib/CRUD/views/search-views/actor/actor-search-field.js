/*global define*/
// Author: Cormac McGuire
// ### Description
// Search for actors, provide display of selected actors and select element
// to store them for the containing form
// TODO - there is way too much going on in here needs to be broken up

define (
  [
    'jquery', 'backbone', 'underscore', 'lib/streams',
    'lib/elements/select-option',
    'lib/Data/actor',
    'lib/CRUD/data/ActorRoleCollection',
    'lib/CRUD/views/search-views/actor/actor-result',
    'lib/Data/collections',
    'lib/CRUD/templates/search-templates/actor/actor-search-field.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, _, Streams, SelectOptionView, Actor, ActorRole,
    ActorResult, Collections, actorSearchTmp, i18n) {
    'use strict';
    var ActorSearchView,
        ActorRoleModel = ActorRole.ActorRoleModel,
        crudBus = Streams.crudBus,
        fieldNameMap = {
          role: 'role_status',
          relation: 'relation_status'
        },

        // create filter functions
        createFilter = Streams.filterLib.createTypeFilter;

    // ### ActorSearchView
    // Search for actors and display actors already associated with and entity
    // allows for adding of search results
    ActorSearchView = Backbone.View.extend({
      childViews: [],
      subscribers: [],
      events: {
        'click .do-search-embedded': 'searchActorsRequested',
        'click .do-clear' : 'clearSearchRequested'
      },
      template: actorSearchTmp,
      actorCollection: undefined,
      renderCollection: undefined,
      // constructor
      // pass in collection of existing Actors related to this entity
      // or create a new one
      initialize: function(options) {
        if (this.collection === undefined) {
          this.collection = new ActorRole.ActorRoleCollection();
        }
        // this specifies the relationship type for incident/bulletin vs
        // actor relationships
        this.fieldName = fieldNameMap[options.relationshipType];

        this.entityType = options.entityType;
        this.renderCollection = new Backbone.Collection();
        this.createActorCollection();
        this.listenForActorsAdded();
        this.listenForActorsRemoved();
        this.listenForActorUpdate();
        this.listenForRelationshipTypeRequest();

        // load existing content
        if (options.mainModel) {
          this.loadActors(options.mainModel);
        }

        this.render()
            .renderSelectOptions()
            .renderActors();

        this.listenTo(this.collection, 'remove sync', this.renderSelectOptions.bind(this));
        this.listenTo(this.renderCollection, 'add remove', this.renderActors.bind(this));
      },

      // load the actors from the existing object
      loadActors: function(mainModel) {
        var actorRoleArrays = {
          roles:       mainModel.get('actor_roles_status'),
          actors:      mainModel.get('actors'),
          actors_role: mainModel.get('actors_role'),
          autoFetch:   false
        };
        this.createActorRoleCollection(actorRoleArrays);
      },

      // create the collection of actor role objects from the data
      // on the entity
      createActorRoleCollection: function(actorRoleArrays) {
        var preparedArrays =
          ActorRole.prepareForCollection(actorRoleArrays);
        this.collection =
          new ActorRole.ActorRoleCollection(preparedArrays);
        this.collection.invoke('setRelationType', this.fieldName);
        this.collection.each(this.createRenderActorCollection, this);
      },

      // create the collection of actors for display
      createRenderActorCollection: function(model) {
        var allActors = Collections.ActorCollection;
        var actorModel = new Backbone.Model();
        var existingActor =
          allActors.findWhere({resource_uri: model.get('actor')});
        if (existingActor) {
          actorModel.set(existingActor.toJSON());
          actorModel.set('id', model.id);
          this.renderCollection.add(actorModel);
        }
        else {
          actorModel = new Actor.ActorModel(
            { resourceUri: model.get('actor') }
          );
          this.renderCollection.add(actorModel);
        }
      },

      // create a collection to store all available actors
      createActorCollection: function() {
        this.actorCollection = new Actor.SimpleActorCollection();
        //this.actorCollection.on('reset', this.updateRenderCollection, this);
        this.actorCollection.model = Actor.ActorModel;
        this.listenForAvailableActors();
      },

      // search solr for actors
      requestAvailableActors: function(inputText) {
        var searchText = inputText !== undefined ? inputText : '*';
        // send a search request - handled in TextSearch
        crudBus.push({
          type: 'new_embedded_search',
          content: {
            raw: inputText,
            entity: 'actor'
          }
        });
      },

      // turn off event listeners and remove dom elements
      onDestroy: function() {
        this.stopListening();
        this.collection = undefined;
        this.actorCollection = undefined;
        this.renderCollection = undefined;
        this.destroySelectViews();
        this.destroyChildViews();
        this.unsubStreams();
      },

      // user clicked search
      searchActorsRequested: function(evt) {
        evt.preventDefault();
        // get the text from the search box
        var inputText = this.$el.children('.search').children('input').val();
        this.requestAvailableActors(inputText);
        // opent the actor results box
        crudBus.push({
          type: 'actor-results',
          content: {}
        });
      },

      // clear the actor search box
      clearSearchRequested: function(evt) {
        evt.preventDefault();
        $(evt.currentTarget).siblings('input').val('');
      },

      // listen for the list of all available actors, used to populate the
      // added actors data
      listenForAvailableActors: function() {
        var self = this;
        var filterActorResults = createFilter('results_actor');
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterActorResults)
                 .subscribe(function(evt) {
                   var value = evt.value();
                   self.actorCollection.reset(value.content);
                 });
       this.subscribers.push(subscriber);
      },

      // listen for an event specifying the actor who has been added
      listenForActorsAdded: function() {
        var filterActorRelateRequest = createFilter('relate_actor_request');
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterActorRelateRequest)
                 .subscribe(this.addActorToCollections.bind(this));
       this.subscribers.push(subscriber);
      },

      // listen for an event specifying the actor who has been removed
      listenForActorsRemoved: function() {
        var filterActorUnRelateRequest = createFilter('unrelate_actor_request');
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterActorUnRelateRequest)
                 .subscribe(this.removeActorFromCollections.bind(this));
       this.subscribers.push(subscriber);
      },

      // listen for actor updated request
      listenForActorUpdate: function() {
        var filterActorUpdateRelationship = createFilter('update_actor_relationship_request');
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterActorUpdateRelationship)
                 .subscribe(this.processActorUpdateData.bind(this));
        this.subscribers.push(subscriber);
      },

      // we have a list of actors and we want to know how to relate them
      listenForRelationshipTypeRequest: function() {
        var filterRelationshipTypeRequest = createFilter('request_actor_relationship_type');
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterRelationshipTypeRequest)
                 .subscribe(function(evt) {
                   crudBus.push({
                     type: 'actor_relationship_type_response',
                     content: this.fieldName
                   });
                 }.bind(this));
          this.subscribers.push(subscriber);
      },

      // update the relationship type
      processActorUpdateData: function(evt) {
        var model = evt.value().content.model,
            role = {
              role_status: evt.value().content.relationship_key,
              role_en:     evt.value().content.relationship
            };
        this.updateActorRoleModel(model, role);
      },

      // set the new role on the actor_role and save it
      updateActorRoleModel: function(model, role) {
        model.set('role_en', role.role_en);
        model.set(this.fieldName, role.role_status);
        model.save();
        this.renderActors();
      },

      // create a new actor role
      createNewActorRole: function(actorRoleData) {
        var actorRole = new ActorRoleModel(actorRoleData);
        this.collection.add(actorRole);
        actorRole.save();
      },

      // see if the actor is already related to the entity
      existingActor: function(actorRoleData) {
        return this.collection
                   .chain()
                   .filter(function(model) {
                      return model.get('actor') === actorRoleData.actor;
                   })
                   .last()
                   .value();
      },

      // add the selected actor to the render collection
      // and to the data collection
      addActorToCollections: function(evt) {
        var actorContent = evt.value().content,
            actorRoleData = {
          role_en: actorContent.relationship,
          actor: actorContent.model.get('resource_uri')
        };
        actorRoleData[this.fieldName] = actorContent.relationship_key;
        this.createActorRoleEntity(actorRoleData, actorContent.model);
      },

      // create the actor role entity on the backend that the
      // entity will refer to  
      // if the actor role already exists
      // update it
      createActorRoleEntity: function(actorRoleData, actorModel) {
        var existingActor = this.collection.findModelFromActor(actorRoleData);
        if (existingActor === undefined) {
          this.createNewActorRole(actorRoleData);
          this.addActorToRenderCollection(actorModel);
        }
        else {
          this.updateActorRoleModel(existingActor, {
            role_en: actorRoleData.role_en,
            role_status: actorRoleData.role_status
          });
        }
      },

      // render the multiple select box
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

      // destroy the displayed actor views
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // destroy the select option views
      destroySelectViews: function() {
        _.invoke(this.selectViews, 'destroy');
        this.selectViews = [];
      },

      // unsubscribe from bacon event streams
      unsubStreams: function() {
        _.each(this.subscribers, function(unsub) {
          unsub();
        });
        this.subscribers = [];
      },

      // add an actor model to the render collection
      addActorToRenderCollection: function(actorModel) {
        this.renderCollection.add(actorModel);
      },

      addOldModels: function(newRenderCollection, oldRenderCollection) {
        newRenderCollection.add(oldRenderCollection.toJSON());
        var merged = _.uniq(newRenderCollection.toJSON());
        return newRenderCollection.reset(merged, {silent: true});
      },

      // an actor has been removed propogate to the collecgtions
      removeActorFromCollections: function(evt) {
        var model = evt.value().content.model;
        var findModel = function(actorRoleModel) {
          return actorRoleModel.get('actor') === model.get('resource_uri');
        };

        this.collection.remove(this.collection.find(findModel));
      },

      // render the related actors
      renderActors: function() {
        this.destroyChildViews();
        this.renderCollection.each(this.renderActor, this);
        return this;
      },

      // render a single actor
      renderActor: function(model) {
        var resultView = new ActorResult({
          model: model,
          fieldName: this.fieldName,
          actorRoleModel: _.last(this.collection.where({
            'actor': model.get('resource_uri')
          })),
          collection: this.renderCollection,
          type: 'selected'
        });
        this.childViews.push(resultView);
        this.$el.children('ul').append(resultView.$el);
        resultView.selectInitialLanguage();
      },

      //render the input field and buttons
      render: function() {
        var html = this.template({
          i18n: i18n,
          entityType: this.entityType
        });
        this.$el.empty()
                .append(html);
        return this;
      }
    });
    return ActorSearchView;
});
