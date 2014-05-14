/*global define*/
// Author: Cormac McGuire
// ### Description
// Search for medias, provide display of selected medias and select element
// to store them for the containing form

define (
  [
    'jquery', 'backbone', 'underscore', 'lib/streams',
    'lib/elements/select-option',
    'lib/Data/media',
    'lib/CRUD/views/search-views/media/media-result',
    'lib/CRUD/views/search-views/media/media-form',
    'lib/CRUD/templates/search-templates/media/media-search-field.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, _, Streams, SelectOptionView, Media, MediaResult,
    MediaFormView, mediaSearchTmp, i18n) {
    'use strict';
    var MediaSearchView,
        crudBus = Streams.crudBus,
        filterMediaResults = function(value) {
          return value.type === 'results_media';
        },
        filterMediaUpdateRelationship = function(value) {
          return value.type === 'update_media_relationship_request';
        },
        filterMediaRelateRequest = function(value) {
          return value.type === 'relate_media_request';
        };

    // ### MediaSearchView
    // Search for medias and display medias already associated with and entity
    // allows for adding of search results
    MediaSearchView = Backbone.View.extend({
      childViews: [],
      unsubFunctions: [],
      events: {
        'click .do-search': 'searchMediasRequested',
        'click .do-upload': 'uploadMediasRequested',
        'click .do-clear' : 'clearSearchRequested'
      },
      template: mediaSearchTmp,
      mediaCollection: undefined,
      renderCollection: undefined,
      // constructor
      // pass in collection of existing Medias related to this entity
      // or create a new one
      initialize: function(options) {
        if (this.collection === undefined) {
          this.collection = new Backbone.Collection();
        }
        this.entityType = options.entityType;
        this.label = options.label;
        this.multiple = options.multiple;
        this.name = options.name;
        this.noSearch = options.noSearch || false;
        this.listenTo(this.collection, 'sync reset add remove',
          this.renderMedias.bind(this));
        this.listenTo(this.collection, 'reset add remove',
          this.renderSelectOptions.bind(this));
        this.listenForMediasAdded();
        this.render();
        if (typeof(options.content) === 'object') {
          _.each(options.content, this.loadExistingContent, this);
        }
        else if(options.content !== undefined){
          this.loadExistingContent(options.content);
        }
      },

      loadExistingContent: function(resourceUri) {
        var initialMediaModel = new Media.MediaModel({
          resourceUri: resourceUri
        });
        this.collection.add(initialMediaModel);
      },

      requestAvailableMedias: function(inputText) {
        var searchText = inputText !== undefined ? inputText : '';
        // send a search request - handled in TextSearch
        crudBus.push({
          type: 'new_embedded_search',
          content: {
            raw: searchText,
            entity: 'media'
          }
        });
      },

      // turn off event listeners and remove dom elements
      destroy: function() {
        this.stopListening();
        this.collection = undefined;
        this.mediaCollection = undefined;
        this.destroySelectViews();
        this.destroyChildViews();
        this.unsubStreams();
        this.$el.remove();
        this.undelegateEvents();
      },

      // user clicked upload
      uploadMediasRequested: function(evt) {
        evt.preventDefault();
        this.mediaUploadForm = new MediaFormView();
      },
      // user clicked search
      searchMediasRequested: function(evt) {
        evt.preventDefault();
        // get the text from the search box
        var inputText = this.$el.children('.search').children('input').val();
        this.requestAvailableMedias(inputText);
        // opent the media results box
        crudBus.push({
          type: 'media-results',
          content: {}
        });
      },

      // clear the input box
      clearSearchRequested: function(evt) {
        evt.preventDefault();
        $(evt.currentTarget).siblings('input').val('');
      },

      // listen for the list of all available medias, used to populate the
      // added medias data
      listenForAvailableMedias: function() {
        var self = this;
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterMediaResults)
                 .subscribe(function(evt) {
                   var value = evt.value();
                   self.mediaCollection.reset(value.content);
                   console.log(self.mediaCollection);
                 });
       this.unsubFunctions.push(subscriber);
      },

      // listen for an event specifying the media who has been added
      listenForMediasAdded: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterMediaRelateRequest)
                 .subscribe(this.attachMedia.bind(this));
       this.unsubFunctions.push(subscriber);
      },

      attachMedia: function(evt) {
        var mediaModel = evt.value().content.model,
            existingMedia = this.existingMedia(mediaModel);
        if (existingMedia === undefined) { // create media
          if (this.multiple === false) {
            // remove each module individually so they reappear in
            // search window
            this.collection.each(function(model) {
              this.collection.remove(model);
            }, this);
          }
          this.collection.add(mediaModel);
        }
      },

      // check if the media is already associated with this entity
      existingMedia: function(mediaModel) {
        return this.collection
                   .chain()
                   .filter(function(model) { 
                      return model.get('id') === mediaModel.get('id');
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

      // destroy the displayed media views
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

      // render the related medias
      renderMedias: function() {
        this.destroyChildViews();
        this.collection.each(this.renderMedia, this);
      },

      // render a single media
      renderMedia: function(model) {
        var resultView = new MediaResult({
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
          label: this.label,
          multiple: this.multiple,
          entityType: this.entityType,
          name: this.name,
          noSearch: this.noSearch,
          i18n: i18n
        });
        this.$el.empty()
                .append(html);
      }
    });
    return MediaSearchView;
});

