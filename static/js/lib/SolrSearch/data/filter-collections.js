/*global define */
// Author: Cormac McGuire
// Aggregation of the filter collections
// if you're looking for some filters, you're in the right place

define(
  [
    'underscore',
    'lib/SolrSearch/data/actor-filter-collection',
    'lib/SolrSearch/data/incident-filter-collection',
    'lib/SolrSearch/data/bulletin-filter-collection'
  ],
  function (_, ActorFilters, IncidentFilters, BulletinFilters) {
    'use strict';
    // instantiate our filter collections

    var actorFilterCollection = new ActorFilters.ActorFilterCollection();
    var bulletinFilterCollection = new BulletinFilters.BulletinFilterCollection();
    var incidentFilterCollection = new IncidentFilters.IncidentFilterCollection();

    var selectedActorFilterCollection = new ActorFilters.SelectedActorFilterCollection();
    var selectedBulletinFilterCollection
      = new BulletinFilters.SelectedBulletinFilterCollection();
    var selectedIncidentFilterCollection
      = new IncidentFilters.SelectedIncidentFilterCollection();

    // return the references to the collection instances
    return {
      ActorFilterCollection: actorFilterCollection,
      BulletinFilterCollection: bulletinFilterCollection,
      IncidentFilterCollection: incidentFilterCollection,
      SelectedActorFilterCollection: selectedActorFilterCollection,
      SelectedBulletinFilterCollection: selectedBulletinFilterCollection,
      SelectedIncidentFilterCollection: selectedIncidentFilterCollection
    };

});

