/*global define*/
// Author: Cormac McGuire
// ### Description
// Search for bulletins, provide display of selected bulletins and select element
// to store them for the containing form

define (
  [
    'jquery', 'backbone', 'underscore', 'lib/streams',
    'lib/elements/select-option',
    'lib/Data/bulletin',
    'lib/CRUD/views/search-views/bulletin/bulletin-result',
    'lib/CRUD/templates/search-templates/bulletin/bulletin-search-field.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, _, Streams, SelectOptionView, Bulletin, BulletinResult,
    bulletinSearchTmp, i18n) {
    'use strict';
    var BulletinSearchView,
        crudBus = Streams.crudBus,
        filterBulletinResults = function(value) {
          return value.type === 'results_bulletin';
        },
        filterBulletinUpdateRelationship = function(value) {
          return value.type === 'update_bulletin_relationship_request';
        },
        filterBulletinRelateRequest = function(value) {
          return value.type === 'relate_bulletin_request';
        };

    // ### BulletinSearchView
    // Search for bulletins and display bulletins already associated with and entity
    // allows for adding of search results
    BulletinSearchView = Backbone.View.extend({
      childViews: [],
      unsubFunctions: [],
      events: {
        'click .do-search-embedded': 'searchBulletinsRequested',
        'click .do-clear' : 'clearSearchRequested'
      },
      template: bulletinSearchTmp,
      bulletinCollection: undefined,
      renderCollection: undefined,
      // constructor
      // pass in collection of existing Bulletins related to this entity
      // or create a new one
      initialize: function(options) {
        if (this.collection === undefined) {
          this.collection = new Backbone.Collection();
        }
        this.entityType = options.entityType;
        this.listenTo(this.collection, 'sync reset add remove',
          this.renderBulletins.bind(this));
        this.listenTo(this.collection, 'sync reset add remove',
          this.renderSelectOptions.bind(this));
        this.listenForBulletinsAdded();
        this.render();
        if (options.content) {
          _.each(options.content, this.loadExistingContent, this);
        }
      },


      loadExistingContent: function(resourceUri) {
        var initialBulletinModel = new Bulletin.BulletinModel({
          resourceUri: resourceUri
        });
        this.collection.add(initialBulletinModel);
      },

      requestAvailableBulletins: function(inputText) {
        var searchText = inputText !== undefined ? inputText : '';
        // send a search request - handled in TextSearch
        crudBus.push({
          type: 'new_embedded_search',
          content: {
            raw: searchText,
            entity: 'bulletin'
          }
        });
      },

      // turn off event listeners and remove dom elements
      destroy: function() {
        this.stopListening();
        //this.collection = undefined;
        this.destroySelectViews();
        this.destroyChildViews();
        this.unsubStreams();
        this.$el.remove();
        this.undelegateEvents();
      },

      // user clicked search
      searchBulletinsRequested: function(evt) {
        evt.preventDefault();
        // get the text from the search box
        var inputText = this.$el.children('.search').children('input').val();
        this.requestAvailableBulletins(inputText);
        // opent the bulletin results box
        crudBus.push({
          type: 'bulletin-results',
          content: {}
        });
      },

      // clear the input box
      clearSearchRequested: function(evt) {
        evt.preventDefault();
        $(evt.currentTarget).siblings('input').val('');
      },

      // listen for the list of all available bulletins, used to populate the
      // added bulletins data
      listenForAvailableBulletins: function() {
        var self = this;
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterBulletinResults)
                 .subscribe(function(evt) {
                   var value = evt.value();
                   self.bulletinCollection.reset(value.content);
                 });
       this.unsubFunctions.push(subscriber);
      },

      // listen for an event specifying the bulletin who has been added
      listenForBulletinsAdded: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterBulletinRelateRequest)
                 .subscribe(this.attachBulletin.bind(this));
       this.unsubFunctions.push(subscriber);
      },

      attachBulletin: function(evt) {
        var bulletinModel = evt.value().content.model,
            existingBulletin = this.existingBulletin(bulletinModel);
        if (existingBulletin === undefined) { // create bulletin
          this.collection.add(bulletinModel);
        }
      },


      // check if the bulletin is already associated with this entity
      existingBulletin: function(bulletinModel) {
        return this.collection
                   .chain()
                   .filter(function(model) { 
                      return model.get('id') === bulletinModel.get('id');
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

      // destroy the displayed bulletin views
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

      // render the related bulletins
      renderBulletins: function() {
        this.destroyChildViews();
        this.collection.each(this.renderBulletin, this);
      },

      // render a single bulletin
      renderBulletin: function(model) {
        var resultView = new BulletinResult({
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
    return BulletinSearchView;
});

