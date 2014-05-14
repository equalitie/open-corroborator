/*global define*/
// Author: Cormac McGuire
// ### Description
// Search for incidents, provide display of selected incidents and select element
// to store them for the containing form

define (
  [
    'jquery', 'backbone', 'underscore', 'lib/streams',
    'lib/elements/select-option',
    'lib/Data/incident',
    'lib/CRUD/views/search-views/incident/incident-result',
    'lib/CRUD/templates/search-templates/incident/incident-search-field.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, _, Streams, SelectOptionView, Incident, IncidentResult,
    incidentSearchTmp, i18n) {
    'use strict';
    var IncidentSearchView,
        crudBus = Streams.crudBus,
        filterIncidentResults = function(value) {
          return value.type === 'results_incident';
        },
        filterIncidentUpdateRelationship = function(value) {
          return value.type === 'update_incident_relationship_request';
        },
        filterIncidentRelateRequest = function(value) {
          return value.type === 'relate_incident_request';
        };

    // ### IncidentSearchView
    // Search for incidents and display incidents already associated with and entity
    // allows for adding of search results
    IncidentSearchView = Backbone.View.extend({
      childViews: [],
      unsubFunctions: [],
      events: {
        'click .do-search-embedded': 'searchIncidentsRequested',
        'click .do-clear' : 'clearSearchRequested'
      },
      template: incidentSearchTmp,
      incidentCollection: undefined,
      renderCollection: undefined,
      // constructor
      // pass in collection of existing Incidents related to this entity
      // or create a new one
      initialize: function(options) {
        if (this.collection === undefined) {
          this.collection = new Backbone.Collection();
        }
        this.entityType = options.entityType;
        this.listenTo(this.collection, 'reset add remove sync',
          this.renderIncidents.bind(this));
        this.listenTo(this.collection, 'reset add remove sync',
          this.renderSelectOptions.bind(this));
        this.listenForIncidentsAdded();
        this.render();
        if (options.content) {
          _.each(options.content, this.loadExistingContent, this);
        }
      },

      loadExistingContent: function(resourceUri) {
        var initialIncidentModel = new Incident.IncidentModel({
          resourceUri: resourceUri
        });
        this.collection.add(initialIncidentModel);
      },

      requestAvailableIncidents: function(inputText) {
        var searchText = inputText !== undefined ? inputText : '';
        // send a search request - handled in TextSearch
        crudBus.push({
          type: 'new_embedded_search',
          content: {
            raw: searchText,
            entity: 'incident'
          }
        });
      },

      // turn off event listeners and remove dom elements
      onDestroy: function() {
        this.stopListening();
        this.collection = undefined;
        this.destroySelectViews();
        this.destroyChildViews();
        this.unsubStreams();
      },

      // user clicked search
      searchIncidentsRequested: function(evt) {
        evt.preventDefault();
        // get the text from the search box
        var inputText = this.$el.children('.search').children('input').val();
        this.requestAvailableIncidents(inputText);
        // opent the incident results box
        crudBus.push({
          type: 'incident-results',
          content: {}
        });
      },

      // clear the input box
      clearSearchRequested: function(evt) {
        evt.preventDefault();
        $(evt.currentTarget).siblings('input').val('');
      },

      // listen for the list of all available incidents, used to populate the
      // added incidents data
      listenForAvailableIncidents: function() {
        var self = this;
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterIncidentResults)
                 .subscribe(function(evt) {
                   var value = evt.value();
                   self.incidentCollection.reset(value.content);
                 });
       this.unsubFunctions.push(subscriber);
      },

      // listen for an event specifying the incident who has been added
      listenForIncidentsAdded: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterIncidentRelateRequest)
                 .subscribe(this.attachIncident.bind(this));
       this.unsubFunctions.push(subscriber);
      },

      attachIncident: function(evt) {
        var incidentModel = evt.value().content.model,
            existingIncident = this.existingIncident(incidentModel);
        if (existingIncident === undefined) { // create incident
          this.collection.add(incidentModel);
        }
      },


      // check if the incident is already associated with this entity
      existingIncident: function(incidentModel) {
        return this.collection
                   .chain()
                   .filter(function(model) { 
                      return model.get('id') === incidentModel.get('id');
                   })
                   .last()
                   .value();
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

      // destroy the displayed incident views
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
        _.each(this.unsubFunctions, function(unsub) {
          unsub();
        });
        this.unsubFunctions = [];
      },

      // render the related incidents
      renderIncidents: function() {
        this.destroyChildViews();
        this.collection.each(this.renderIncident, this);
      },

      // render a single incident
      renderIncident: function(model) {
        var resultView = new IncidentResult({
          model: model,
          collection: this.collection,
          type: 'selected'
        });
        this.childViews.push(resultView);
        this.$el.children('ul').append(resultView.$el);
      },

      //render the input field and buttons
      render: function() {
        var html = this.template({
          entityType: this.entityType,
          i18n: i18n
        });
        this.$el.empty()
                .append(html);
      }
    });
    return IncidentSearchView;
});

