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
    
    var LabelCollection,
        LabelModel,
        labelCollection;

    // ### LabelModel
    // relates to an individual source
    LabelModel = Backbone.Model.extend({
      
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/label/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    
    LabelCollection = Backbone.Collection.extend({
      model: LabelModel,
      initialize: function() {
        this.reset(Bootstrap.labels);
      },

      // map a list of models to autocomplete format
      autoCompleteFormat: function() {
        return this.map(this.mapAutoCompleteFormat);
      },

      // convert single model to format expected by jquery ui autocomplete
      mapAutoCompleteFormat: function(model) {
        return {
          label: model.get('name'),
          id   : model.get('resource_uri')
        };
      }

    });

    return {
      LabelModel: LabelModel,
      LabelCollection: LabelCollection
    };
});
