/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// collection and model for comments to allow us to load and store
// comments to the database for a bulletin

define (
  [
    'backbone', 'underscore',
    'lib/Data/collection-mixins'
  ],
  function (Backbone, _, Mixins) {
    'use strict';
    var EventCollection,
        EventModel,
        ModelSaveMixin = Mixins.ModelSaveMixin,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        };

    // ### EventModel
    // describe a single comment
    EventModel = Backbone.Model.extend({
      dateTimeFields: [
        'time_from',
        'time_to'
      ],
      intFields: [
        'confidence_score'
      ],
      idAttribute: 'id',
      initialize: function(options) {
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('id', id);
          this.set('resource_uri', options.resourceUri);
          this.fetch();
        }
      },
      url: function() {
        var base = '/api/v1/timeInfo/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    _.extend(EventModel.prototype, ModelSaveMixin);
    

    // ### EventCollection
    // Store comments
    EventCollection = Backbone.Collection.extend({
      model: EventModel,
      initialize: function() {
      }
    });

    
    return {
      EventCollection: EventCollection,
      EventModel: EventModel,
    };
    
});
