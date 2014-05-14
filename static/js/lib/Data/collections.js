/*global Bootstrap*/

// Author: Cormac McGuire  
// collections.js  
// Instantiate and store a reference to our collections
define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams',
    'lib/Data/actor',
    'lib/Data/bulletin',
    'lib/Data/incident',
    'lib/Data/saved-search-collection'
  ],
  function($, _, Backbone, Streams, Actor, Bulletin, Incident, SavedSearch) {
    var actorCollection       = new Actor.ActorCollection();
    var bulletinCollection    = new Bulletin.BulletinCollection();
    var incidentCollection    = new Incident.IncidentCollection();
    var savedSearchCollection = new SavedSearch.SavedSearchCollection();

  return {
    ActorCollection: actorCollection,
    BulletinCollection: bulletinCollection,
    IncidentCollection: incidentCollection,
    SavedSearchCollection: savedSearchCollection
  };

});
