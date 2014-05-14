/*global define*/
// Author: Cormac McGuire
// ### define our actor and bulletin collections
// 

define(
  ['lib/Data/actor', 'lib/Data/bulletin'],
  function(Actor, Bulletin) {
  'use strict';
  var ActorCollection = Actor.SimpleActorCollection,
      BulletinCollection = Bulletin.SimpleBulletinCollection,

      actorCollection = new ActorCollection(Bootstrap.actors),
      bulletinCollection = new BulletinCollection(Bootstrap.bulletins);
  return {
    actorCollection: actorCollection,
    bulletinCollection: bulletinCollection
  };
  
  }
);
