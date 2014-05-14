/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Collection to hold sources

define (
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';
    
    var SourceCollection,
        SourceModel,
        sourceCollection;

    // ### SourceModel
    // relates to an individual source
    SourceModel = Backbone.Model.extend({
      
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/source/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    
    SourceCollection = Backbone.Collection.extend({
      model: SourceModel,
      initialize: function() {
        this.reset(Bootstrap.sources);
      },
      autoCompleteFormat: function() {
        return this.map(this.mapAutoCompleteFormat);
      },
      mapAutoCompleteFormat: function(model) {
        return {
          label: model.get('name'),
          id   : model.get('resource_uri')
        };
      }
    });

    return {
      SourceModel: SourceModel,
      SourceCollection: SourceCollection
    };
});
