/*global Bootstrap*/
// Author: Cormac McGuire  
// bulletin.js  
// Represent a single bulletin and a group of bulletins  
// TODO: refactor common logic for all collections
define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams',
    'lib/Data/collection-mixins',
    'lib/Data/comparator',
    'lib/elements/helpers/cookie'
  ],
  function($, _, Backbone, Streams, Mixins, Comparator, cookie) {
    'use strict';

    var PersistSelectionMixin = Mixins.PersistSelectionMixin,
        crudBus               = Streams.crudBus,
        searchBus             = Streams.searchBus,
        ModelSelectionMixin   = Mixins.ModelSelectionMixin,
        CollectionUpdateMixin = Mixins.CollectionUpdateMixin,
        ModelSaveMixin        = Mixins.ModelSaveMixin,
        Filters               = new Mixins.Filters(),
        parseComparator       = Comparator.parseComparator,
        // ### Bulletin Specific filter stream processors

        // filter bulletin nav requests
        filterBulletin = function(value) {
          return value.navValue === 'bulletin';
        },

        filterExternalBulletinUpdates = function(value) {
          return value.type === 'solr:update_bulletins';
        },

        filterUpdatedBulletins = function(value) {
          return value.type === 'multiple_update_results_bulletins';
        },

        // filter out bulletin results
        filterBulletinResults = function(value) {
          return value.type === 'results_bulletin';
        },

        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        },

        // map sort request to model field
        mapSort = function(value) {
          var sortMap = {
            'date'    : 'bulletin_created',
            'title'   : 'title_en',
            'score'   : 'confidence_score',
            'status'  : 'most_recent_status_bulletin',
            'location': 'bulletin_locations'
          };
          return {
            field: sortMap[value.option],
            direction: value.direction
          };
        };

    // ##Data representations

    var BulletinListUpdateModel = Backbone.Model.extend({
      textFields: [
        'assigned_user'
      ],
      intFields: [
        'confidence_score'
      ],
      manyToManyFields: [
        'ref_bulletins', 'labels', 'locations',
        'sources', 'bulletin_imported_comments'
      ],
      url: '/corroborator/bulletin/0/multisave/',
      formatSaveMultiple: function() {
        this.set('actorsRoles',
          this.get('relatedActors').map(this.formatActorCollectionForSave, this));
        //this.unset('actors_role');
        return this.toJSON();
      },
      formatActorCollectionForSave: function(model) {
        return {
          actor: model.get('actor'),
          role_en: model.get('role_en'),
          role_status: model.get('role_status')
        };
      },
      updateResults: function(model, updatedBulletins) {
        searchBus.push({
          type: 'multiple_update_results_bulletins',
          content: updatedBulletins
        });
      },
      updateError: function() {
      },
      saveMultiple: function() {
        var attributes = this.formatSaveMultiple();
        this.save(attributes, {
          success: this.updateResults.bind(this),
          error: this.updateError.bind(this),
          headers: {
            'X-CSRFToken':cookie
          }
        });
      }
    });
    _.extend(BulletinListUpdateModel.prototype, ModelSaveMixin);

    // ### Bulletin Model
    // provide api endpoint for Bulletin model  
    // if resourceUri is set in the options the model will
    // auto fetch it's data
    // extended via the 
    var BulletinModel = Backbone.Model.extend({
      idAttribute: 'id',
      // the four arrays which follow are used to mark them for formatting to make
      // django/tastypie happy
      // format methods in collection-mixins
      foreignKeyFields: [
        'assigned_user'
      ],
      intFields: [
        'confidence_score'
      ],
      manyToManyFields: [
        'sources', 'bulletin_comments', 'actors_role', 'times', 'medias',
        'locations', 'labels', 'ref_bulletins', 'bulletin_imported_comments'
      ],
      // this is to remove the bulletin_modified field if it is set to true
      // it's set to true for some older bulletins, don't know why, it should
      // be a datetime
      removeIfTrueFields: [
        'bulletin_modified'
      ],

      // autoFetch if resourceUri set
      // TODO: remove this auto fetch
      initialize: function(options) {
        this.set('entityType', 'bulletin');
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('django_id', id);
          this.set('id', id);
          this.set('resource_uri', options.resourceUri);
          this.fetch();
        }
      },

      // fetches and triggers a render request
      fetchWithUpdate: function() {
        this.fetch({
          error: this.notFound.bind(this),
          success: function () {
            this.trigger('render');
          }.bind(this)
        });
      },

      // if the fetch is not successful trigger and error
      // used in display of entities
      notFound: function() {
        this.trigger('sync-error');
      },

      // build the url for fetch
      url: function() {
        var base = '/api/v1/bulletin/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    _.extend(BulletinModel.prototype, ModelSaveMixin);

    var SimpleBulletinCollection = Backbone.Collection.extend({
      model: BulletinModel
    });

    // ### Bulletin Collection
    // provide sort, selection functionality  
    // stores bulletins 
    var BulletinCollection = Backbone.Collection.extend({
      compareField: 'bulletin_created',
      modifiedField: 'bulletin_modified',
      updateFilter: filterExternalBulletinUpdates,
      model: BulletinModel,
      initialize: function() {
        this.watchEventStream();
        this.watchUpdate();
        this.watchSelection();
        this.watchSort();
        this.watchCreate();
        // event handlers for these are in the PersistSelectionMixin
        // TODO: have the mixin set these some way
        this.on('change', this.updateSelectedIdList, this);
        this.on('reset', this.selectModelsAfterReset, this);
      },
      // models are sorted based on the result of this function
      comparator: function(modelA, modelB) {
        var comparison, inversion, compareFieldA, compareFieldB, minVal, maxVal;
        if (this.compareField === 'confidence_score') {
          minVal = 1; maxVal = 100;
        }
        compareFieldA = parseComparator(
          modelA.get(this.compareField),
          this.direction,
          minVal, maxVal
        );
        compareFieldB = parseComparator(
          modelB.get(this.compareField),
          this.direction,
          minVal, maxVal
        );

        inversion = this.direction === 'ascending' ? 1: -1;
        if (compareFieldA < compareFieldB) { comparison = (inversion * -1);}
        if (compareFieldA > compareFieldB) { comparison = inversion;}
        return comparison;
      },
      // watch the search bus to update the bulletin collection when new  
      // bulletin results are received from solr
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterBulletinResults)
               .onValue(this.resetCollection.bind(this));
        searchBus.filter(filterUpdatedBulletins)
                 .onValue(this.multiUpdateModels.bind(this));
      },
      resetCollection: function(searchResults) {
        var results = searchResults.content.results;
        this.numFound = searchResults.content.numFound;
        if (this.length !==0) {
          _.map(results, function(result) {
            result.id = result.django_id;
          });
        }
        this.reset(results, {parse: true});
      },


      // watch for selections from the action combo box
      watchSelection: function() {
        var self = this;
        var bulletinStream = Streams.searchBus.filter(filterBulletin);

        bulletinStream.filter(Filters.filterSelectAll)
          .onValue(function() {
          self.selectAll();
        });
        bulletinStream.filter(Filters.filterUnselectAll)
          .onValue(function() {
          self.unSelectAll();
        });
        bulletinStream.filter(Filters.filterDeleteSelected)
          .onValue(function() {
          self.deleteSelected();
        });
      },

      // listen for sort request events  
      // these originate from header.js in SolrSearch views
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterBulletin)
        .map(mapSort)
        .onValue(function (value) {
          self.compareField = value.field;
          self.direction = value.direction;
          self.sort();
        });
      },
      watchCreate: function() {
        var self = this;
        crudBus.filter(function(value) { return value.type === 'create_new_bulletin'; })
               .onValue(function(value) {
                 self.add(value.content);
               });
      }


    });
    _.extend(BulletinCollection.prototype, PersistSelectionMixin);
    _.extend(BulletinCollection.prototype, ModelSelectionMixin);
    _.extend(BulletinCollection.prototype, CollectionUpdateMixin);

  return {
    BulletinModel: BulletinModel,
    BulletinCollection: BulletinCollection,
    SimpleBulletinCollection: SimpleBulletinCollection,
    BulletinListUpdateModel: BulletinListUpdateModel
  };

});
