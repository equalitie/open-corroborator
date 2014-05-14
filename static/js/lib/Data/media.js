/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// This file represents the media models 

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/Data/collection-mixins'
  ],
  function (Backbone, _, Streams, Mixins) {
    'use strict';

    var crudBus   = Streams.crudBus,
        searchBus = Streams.searchBus,
        PersistSelectionMixin = Mixins.PersistSelectionMixin,
        ModelSelectionMixin = Mixins.ModelSelectionMixin,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        },
        filterMediaResults = function(value) {
          return value.type === 'results_media';
        };

    // ##Data representations

    // ### Media Model
    // provide api endpoint for Media model
    var MediaModel = Backbone.Model.extend({
      foreignKeyFields: ['POB', 'current_location', 'media'] ,
      idAttribute: 'django_id',
      initialize: function(options) {
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('django_id', id);
          this.set('resource_uri', options.resourceUri);
          this.fetch();
        }
      },
      url: function() {
        var base = '/api/v1/media/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });

    var SimpleMediaCollection = Backbone.Collection.extend({
      model: MediaModel

    });
    return {
      MediaModel: MediaModel,
      SimpleMediaCollection: SimpleMediaCollection
    };
});
