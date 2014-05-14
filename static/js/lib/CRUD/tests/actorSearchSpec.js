/*global runs, waitsFor, jasmine, describe, beforeEach, afterEach, xit, it, expect */
// Author: Cormac McGuire
// ### Description
// test the creation and association of actor roles to entities

define(
  [
    'jquery', 'underscore',
    'lib/CRUD/data/ActorRoleCollection',
    'lib/CRUD/views/search-views/actor/actor-search-field',
    'lib/CRUD/tests/fixtures'
  ],
  function ($, _, ActorRole, ActorSearchField, fixtures) {
  'use strict';
  describe('test actor role creation and association', function() {
    var incidents, actorActorRoleCollection, incidentActorRoleCollection,
        actors;

    // ## helper functions
    var getActorRoleArrays = function(entity) {
      return {
        roles: entity.actor_roles_status,
        actors: entity.actors,
        actors_role: entity.actors_role
      };
    };

    var createRoleCollection = function(actorRoleArrays) {
      var preparedArrays =
        ActorRole.prepareForCollection(actorRoleArrays);
     return new ActorRole.ActorRoleCollection(preparedArrays);
    };


    beforeEach(function() {
      incidents = fixtures.incidents;
      actors    = fixtures.actors;
      var incidentActorRoleArrays = getActorRoleArrays(_.first(incidents));
      var actorActorRoleArrays    = getActorRoleArrays(_.first(actors));
      incidentActorRoleCollection = createRoleCollection(incidentActorRoleArrays);
      actorActorRoleCollection    = createRoleCollection(actorActorRoleArrays);
    });

    afterEach(function() {
    });

    it('should create roles collection from the solr actor fields',
    function(){
      expect(actorActorRoleCollection.length).toEqual(2);
    });

    it('should load the correct rolename from the key', function(){
      incidentActorRoleCollection.invoke('setRelationType', 'role_status');
      expect(incidentActorRoleCollection.first().get('role_en')).toEqual('Killed');
    });

    it('should load the correct rolename for keys for actors', function() {
      actorActorRoleCollection.invoke('setRelationType', 'relation_status');
      expect(actorActorRoleCollection.first().get('role_en')).toEqual('Parent');
    });
  });
});
