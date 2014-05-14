/*global define*/
// Author: Cormac McGuire
// ### Description
// Show the list of related incidents

define (
  [
    'backbone', 'underscore',
    'lib/Data/incident',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/incident/incident-container.tpl',
    'lib/CRUD/templates/display-templates/incident/incident.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, Incident, CollectionViews, incidentContainerTmp, incidentTmp, i18n) {
    'use strict';

    var ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView,
        IncidentListView, IncidentView,
        IncidentModel = Incident.IncidentModel;

    IncidentView = ModelView.extend({
      templateVars: {
        i18n: i18n
      },
      className: 'related-incident',
      template: incidentTmp
    });

    // ### IncidentListView
    // Display a list of incidents
    IncidentListView = ListLoadView.extend({
      templateVars: {
        i18n: i18n
      },
      childViews: [],
      modelType: IncidentModel,
      childView: IncidentView,
      fieldType: 'incidents',
      containerTmp: incidentContainerTmp,

      initialize: function(options) {
        this.expanded = options.expanded;
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }
    });


    return IncidentListView;
    
});


