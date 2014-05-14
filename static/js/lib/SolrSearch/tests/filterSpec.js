/*global jasmine, describe, beforeEach, xit, it, expect */
// ## filterSpec.js
// Author: Cormac McGuire
// Test that filters are displaying and dispatching filter events
// to our streams
define(
  [
    'jquery', 'backbone',
    'lib/SolrSearch/data/actor-filter-collection',
    'lib/SolrSearch/views/filters/filter-manager',
    'lib/SolrSearch/views/filters/actor-filters',
    'lib/SolrSearch/views/filters/incident-filters',
    'lib/SolrSearch/views/filters/bulletin-filters',
    'lib/streams',
    'test/fixtures/extensions',
    //data
    'lib/SolrSearch/data/filter-collections'
  ],
  function($, Backbone, 
    ActorFilterCollection, FilterManager, ActorFilters,
    IncidentFilters, BulletinFilters, Streams, FilterCollection) {
      'use strict';
      var manager;
      var navigate = function(entity) {
        Streams.navBus.push({
          type: 'navigate',
          content: {
            entity: entity
          }
        });
      };
      var createActorFilters = function (filterNames, type, title, key) {
        return filterNames.map(function(name) {
          return {
            displayFilterName: name,
            filterName: name,
            key: key,
            numItems: 33587,
            title: title,
            type: type
          };

        });
      };
      var createFilterModel = function(filterNames, type, title, key) {
        var filterGroupCollection;
        filterGroupCollection = new ActorFilterCollection.ActorFilterCollection(
          createActorFilters(filterNames, type, title, key)
        );
        filterGroupCollection.entityType = type;
        filterGroupCollection.groupKey   = key;

        var filterModel = new Backbone.Model({
          entityType: type,
          groupKey  : key,
          collection: filterGroupCollection
        });
        return filterModel;

      };
      describe('', function () {
        //var 
      
      beforeEach( function() {
        FilterCollection = FilterCollection || {
          ActorFilterCollection: undefined
        };
        manager = new FilterManager.FilterManagerView();
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load('test/fixtures/base.html');
      });

      it('should return the three views', function() {
        expect(typeof(ActorFilters.ActorFilterView)).toEqual('function');
        expect(typeof(BulletinFilters.BulletinFilterView)).toEqual('function');
        expect(typeof(IncidentFilters.IncidentFilterView)).toEqual('function');
        expect(typeof(FilterManager.FilterManagerView)).toEqual('function');
      });

      it('should create a view when the user navigates', function() {
        expect(typeof(manager.currentView)).toEqual('undefined');
        navigate('actor');
        expect(typeof(manager.currentView)).toEqual('object');
      });

      it('should render actor filters container when the user navigates to actors', function() {
        navigate('actor');
        var actorFilterAdded = $('.actor-display');
        expect(actorFilterAdded.length).toEqual(1);
      });
      it('should render incident filters when the user navigates to incidents', function() {
        navigate('incident');
        var actorFilterAdded = $('.incident-display');
        expect(actorFilterAdded.length).toEqual(1);
      });
      it('should render bulletin filters when the user navigates to bulletins', function() {
        navigate('bulletin');
        var actorFilterAdded = $('.bulletin-display');
        expect(actorFilterAdded.length).toEqual(1);
      });

      it('should show the normal filter view when there are 10 filters or less',
      function(){
        var filterNames = ['Adult', 'Child'];

        var filterModel =
          createFilterModel(filterNames, 'actor', 'Age::en', 'age_en_exact');
                
        var actorFilterView = new ActorFilters.ActorFilterView({
          collection: new Backbone.Collection([ filterModel ])
        });
        expect(actorFilterView.filterGroupViews.length).toEqual(1);
        expect(actorFilterView.filterGroupViews[0].el.className).toEqual('filter');
      });

      it('should show the drop down filter view when there > 10 filters',
      function(){
        var filterNames = [
          'Adult', 'Child', 'Newborn', 'Teenager', 'Pensioner', 'Youth', 'Middle Aged',
          'Ancient', 'Tween', 'Adolescent', 'Old', 'Young'];

        var filterModel =
          createFilterModel(filterNames, 'actor', 'Age::en', 'age_en_exact');

        var actorFilterView = new ActorFilters.ActorFilterView({
          collection: new Backbone.Collection([ filterModel ])
        });

        expect(actorFilterView.filterGroupViews.length).toEqual(1);
        expect(actorFilterView.filterGroupViews[0].el.className).toEqual('filter-drop-down');
      });
      it('should separate filters into groups', function(){
        var filterNames = [
          'Adult', 'Child', 'Newborn', 'Teenager', 'Pensioner', 'Youth', 'Middle Aged',
          'Ancient', 'Tween', 'Adolescent', 'Old', 'Young'];

        var filterModel =
          createFilterModel(filterNames, 'actor', 'Age::en', 'age_en_exact');

        var mapFilterModel =
          createFilterModel(['/api/v1/location/1/'], 'actor', 'POB', 'actor_searchable_pob_exact');

        var filterCollection =
          new ActorFilterCollection.ActorFilterCollection(
            [  ]);

        var actorFilterView = new ActorFilters.ActorFilterView({
          collection: filterCollection
        });

        var mapFilters = actorFilterView.collection.filter(function(model) {
          return model.get('filterType') === 'mapFilterGroup';
        });
        var autoFilters = actorFilterView.collection.filter(function(model) {
          return model.get('filterType') === 'dropDownFilterGroup';
        });
        var standardFilters = actorFilterView.collection.filter(function(model) {
          return model.get('filterType') === 'standardFilterGroup';
        });

        //expect(mapFilters.length).toEqual(1);
        //expect(autoFilters.length).toEqual(1);
        expect(standardFilters.length).toEqual(0);

      });


    });
    
  }
);

