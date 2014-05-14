/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description

define (
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';
    
    var ConditionCollection,
        ConditionModel,
        conditionCollection;

    // ### ConditionModel
    // relates to an individual source
    ConditionModel = Backbone.Model.extend({
      
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/actorCondtion/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    
    // ## ConditionCollection
    // store a list of predefined conditions to be used to categorise
    // actors via an autocomplete textfield
    ConditionCollection = Backbone.Collection.extend({
      model: ConditionModel,
      initialize: function() {
        this.reset(Bootstrap.conditions);
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
      ConditionModel: ConditionModel,
      ConditionCollection: ConditionCollection
    };
});



