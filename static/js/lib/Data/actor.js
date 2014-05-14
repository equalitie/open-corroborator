/*global Bootstrap*/
//
// Author Cormac McGuire
//
// actor.js
//
// Represent a single actor and a group of actors
//
// TODO: refactor common logic for all collections

define(
  [
    'jquery', 'underscore', 'backbone', 'moment',
    'lib/streams',
    'lib/Data/collection-mixins',
    'lib/Data/comparator',
    'lib/elements/helpers/cookie'
  ],
  function($, _, Backbone, moment, Streams, Mixins, Comparator, 
    cookie) {
    'use strict';


    var crudBus               = Streams.crudBus,
        searchBus             = Streams.searchBus,
        PersistSelectionMixin = Mixins.PersistSelectionMixin,
        ModelSelectionMixin   = Mixins.ModelSelectionMixin,
        CollectionUpdateMixin = Mixins.CollectionUpdateMixin,
        ModelSaveMixin        = Mixins.ModelSaveMixin,
        TranslateMixin        = Mixins.TranslateMixin,
        Filters               = new Mixins.Filters(),
        parseComparator       = Comparator.parseComparator,

        // ### event stream processing helpers
        filterActorResults = function(value) {
          return value.type === 'results_actor';
        },
        filterExternalActorUpdates = function(value) {
          return value.type === 'solr:update_actors';
        },
        filterUpdatedActors = function(value) {
          return value.type === 'multiple_update_results_actors';
        },
        filterActor = function(value) {
          return value.navValue === 'actor';
        },
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        },
        mapSort = function(value) {
          var sortMap = {
            'date' : 'actor_created',
            'title': 'fullname_en',
            'age'  : 'age_en'
          };
          return {
            field: sortMap[value.option],
            direction: value.direction
          };
        },
        // context set to have actorIds variable
        filterByIds = function(model) {
          return _.contains(this.actorIds, model.id);
        };


    // ##Data representations
    var ActorListUpdateModel = Backbone.Model.extend({
      textFields: [
        'sex_en', 'sex_ar', 'age_en', 'age_ar', 'civilian_en', 'civilian_ar',
        'civilian_en', 'position_en', 'position_ar','religion_en','religion_ar',
        'occupation_en', 'occupation_ar', 'ethnicity_en', 'ethnicity_ar',
        'nationality_en', 'nationality_ar', 'religion_en', 'religion_ar',
        'spoken_dialect_en', 'spoken_dialect_ar', 'current_location'
      ],
      //foreignKeyFields: ['current_location', 'POB'] ,
      url: '/corroborator/actor/0/multisave/',
      formatSaveMultiple: function() {
        this.set('actorsRoles',
          this.get('relatedActors').map(this.formatActorCollectionForSave, this));
        this.unset('relatedActors');
        var attrs = this.toJSON();
        attrs.actors = attrs.selectedActors;
        return attrs;
      },
      formatActorCollectionForSave: function(model) {
        return {
          actor: model.get('actor'),
          role_en: model.get('role_en'),
          relation_status: model.get('relation_status')
        };
      },
      updateResults: function(model, updatedActors) {
        searchBus.push({
          type: 'multiple_update_results_actors',
          content: updatedActors
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
    _.extend(ActorListUpdateModel.prototype, ModelSaveMixin);

    // ### Actor Model
    // provide api endpoint for Actor model  
    // if resourceUri is set in the options the model will
    // auto fetch it's data
    var ActorModel = Backbone.Model.extend({
      translatableFields: ['incident_labels'],
      foreignKeyFields: ['POB', 'current_location', 'media', 'assigned_user'] ,
      manyToManyFields: [
        'actors_role'
      ],
      idAttribute: 'id',
      initialize: function(options) {
        this.set('entityType', 'actor');
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('django_id', id);
          this.set('id', id);
          this.set('resource_uri', options.resourceUri);
          this.fetch();
        }
      },

      fetchWithUpdate: function() {
        this.fetch({
          error: this.notFound.bind(this),
          success: function () {
            this.trigger('render');
          }.bind(this)
        });
      },

      notFound: function() {
        this.trigger('sync-error');
      },
      translate: function(locale) {
        var jsonModel = this.toJSON();
        _(this.translatableFields).each(function(field) {
          jsonModel[field] = jsonModel[field + '_' + Bootstrap.locale];
        });
        return jsonModel;
      },

      url: function() {
        var base = '/api/v1/actor/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    _.extend(ActorModel.prototype, ModelSaveMixin);
    _.extend(ActorModel.prototype, TranslateMixin);

    var SimpleActorCollection = Backbone.Collection.extend({
      model: ActorModel,
      filterByIds: function(actorIds) {
        var context = {
          actorIds: actorIds
        };
        return new Backbone.Collection(this.filter(filterByIds, context));
      }

    });

    // ### Actor Collection
    var ActorCollection = SimpleActorCollection.extend({
      compareField: 'actor_created',
      modifiedField: 'actor_modified',
      updateFilter: filterExternalActorUpdates,
      numFound: 0,
      selectedIdList: [],

      initialize: function() {
        this.watchSearchResults();
        this.watchUpdate();
        this.watchSelection();
        this.watchSort();
        this.watchCreate();
        // event handlers for these are in the PersistSelectionMixin
        // TODO: have the mixin set these some way
        this.on('change', this.updateSelectedIdList, this);
        this.on('reset', this.selectModelsAfterReset, this);
      },
      // sort is implemented based on the result of this function
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
      // watch the search bus to update the actor collection when new actor
      // results are received from solr
      watchSearchResults: function() {
        Streams.searchBus.toProperty()
               .filter(filterActorResults)
               .onValue(this.resetCollection.bind(this));
        searchBus.filter(filterUpdatedActors)
                 .onValue(this.multiUpdateModels.bind(this));
      },

      // reset the contents of the entire collection
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
        var actorStream = Streams.searchBus.filter(filterActor);

        actorStream.filter(Filters.filterSelectAll)
          .onValue(function() {
          self.selectAll();
        });
        actorStream.filter(Filters.filterUnselectAll)
          .onValue(function() {
          self.unSelectAll();
        });
        actorStream.filter(Filters.filterDeleteSelected)
          .onValue(function() {
          self.deleteSelected();
        });
      },

      //
      // listen for sort request events
      // originate from header.js in SolrSearch views
      //
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterActor)
        .map(mapSort)
        .onValue(function (value) {
          self.compareField = value.field;
          self.direction = value.direction;
          self.sort();
        });
      },
      watchCreate: function() {
        var self = this;
        crudBus.filter(function(value) { return value.type === 'create_new_actor'; })
               .onValue(function(value) {
                 self.add(value.content);
               });
      }

    });
    // add our mixins to the collection
    _.extend(ActorCollection.prototype, PersistSelectionMixin);
    _.extend(ActorCollection.prototype, CollectionUpdateMixin);
    _.extend(ActorCollection.prototype, ModelSelectionMixin);


    return {
      ActorCollection: ActorCollection,
      SimpleActorCollection: SimpleActorCollection,
      ActorModel: ActorModel,
      ActorListUpdateModel: ActorListUpdateModel
    };
});
