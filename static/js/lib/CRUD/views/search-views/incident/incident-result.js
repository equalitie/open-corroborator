/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// display an embedded search result for an incident

define (
  [
    'jquery', 'backbone',
    'lib/streams',
    'lib/CRUD/templates/search-templates/incident/incident-result.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, Streams, incidentResultTmp, i18n) {
    'use strict';

    var IncidentResultView,
        crudBus = Streams.crudBus;

    // ### IncidentResultView
    // 
    IncidentResultView = Backbone.View.extend({
      template: incidentResultTmp,
      tagName: 'li',
      events: {
        'click .do-relate': 'relateToEntity',
        'click .do-remove': 'removeIncident'
      },
      // constructor
      initialize: function(options) {
        if (options.type === undefined) {
          throw "You must specify a type";
        }
        this.type = options.type;
        this.render();
      },
      // send a message asking to relate this incident to the current  
      // entity being edited
      relateToEntity: function(evt) {
        this.collection.remove(this.model);
        crudBus.push({
          type: 'relate_incident_request',
          content: {
            model: this.model
          }
        });
      },

      // remove the incident from the current entity
      removeIncident: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        crudBus.push({
          type: 'unrelate_incident_request',
          content: {
            model: this.model
          }
        });
      },

      resetFlags: function() {
        this.model.unset('selected');
        this.model.unset('result');
      },

      // render the template
      render: function() {
        this.resetFlags();
        this.model.set(this.type, true);
        var templateVars = {
          model: this.model.toJSON(),
          i18n: i18n
        };
        var html = this.template(templateVars);
        this.$el.append(html);
      }
    });

    return IncidentResultView;
    
});
