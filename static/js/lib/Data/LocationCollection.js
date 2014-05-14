/*global setTimeout, define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Collection to hold sources

define (
  [
    'backbone', 'underscore'
  ],
  function (Backbone, _) {
    'use strict';
    
    var LocationCollection,
        LocationModel,
        locationCollection,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        };


    // ### LocationModel
    // relates to an individual source
    LocationModel = Backbone.Model.extend({
      
      initialize: function(options) {
        if (options.resourceUri !== undefined) {
        // bold v bold, ask me and I'll tell you the why
        // to do with /lib/CRUD/views/map-view lines 55 and 61
        // set is fine, setTimeout is not really
          setTimeout(function() {
            this.set(_(Bootstrap.locations).chain().filter(function(loc) {
              return options.resourceUri === loc.resource_uri;
            }).last().value());
          }.bind(this), 1000);
        }
      }
    });
    
    LocationCollection = Backbone.Collection.extend({
      model: LocationModel,
      initialize: function(options) {
        if (this.length === 0) {
          this.reset(Bootstrap.locations);
        }
      },

      // map a list of models to autocomplete format
      autoCompleteFormat: function() {
        return this.map(this.mapAutoCompleteFormat);
      },

      // convert single model to format expected by jquery ui autocomplete
      mapAutoCompleteFormat: function(model) {
        return {
          label: model.get('label'),
          id   : model.get('resource_uri')
        };
      }

    });

    return {
      LocationModel: LocationModel,
      LocationCollection: LocationCollection
    };
});

