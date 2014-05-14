/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Collection to hold sources
// TODO: decide what to do with collection after form closed, should we 
// a) destroy the collection and make the form re-initialise it  
// b) reset the collection in the view

define (
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';
    
    var CrimeCollection,
        CrimeModel,
        crimeCollection;

    // ### CrimeModel
    // relates to an individual source
    CrimeModel = Backbone.Model.extend({
      
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/crime/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    
    // ## CrimeCollection
    // store a list of predefined crimes to be used to categorise incidents
    // via an autocomplete textfield
    CrimeCollection = Backbone.Collection.extend({
      model: CrimeModel,
      initialize: function() {
        this.reset(Bootstrap.crimes);
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
      CrimeModel: CrimeModel,
      CrimeCollection: CrimeCollection
    };
});



