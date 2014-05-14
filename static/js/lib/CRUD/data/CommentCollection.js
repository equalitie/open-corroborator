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
    var CommentCollection,
        CommentModel,
        StatusCollection,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        };

    // ### CommentModel
    // describe a single comment
    CommentModel = Backbone.Model.extend({
      idAttribute: 'id',
      comparator:  function () {
        return this.get('comment_created');
      },
      initialize: function(options) {
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('id', id);
          this.set('resource_uri', options.resourceUri);
          this.fetch();
        }
      },
      url: function() {
        var base = '/api/v1/comment/';
        if (this.get('id')) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    

    // ### CommentCollection
    // Store comments
    CommentCollection = Backbone.Collection.extend({
      model: CommentModel,
      initialize: function() {
      }
    });

    // ### StatusCollection
    // list of statuses that can be associated with a Comment
    StatusCollection = Backbone.Collection.extend({
      initialize: function() {
      }
    });
    
    return {
      CommentCollection: CommentCollection,
      CommentModel: CommentModel,
      StatusCollection: StatusCollection
    };
    
});

