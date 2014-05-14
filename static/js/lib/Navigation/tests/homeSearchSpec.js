/*global runs, waitsFor, jasmine, describe, beforeEach, afterEach, xit, it, expect, spyOn */
// Author: Cormac McGuire
// ### Description
// Tests for the home button, which should navigate to the base url

define(
  [
    'backbone',
    'jquery',
    'lib/Navigation/views/home-search',
    'lib/streams',
    'lib/Navigation/TabRouter',
    'jasmine_jquery'
  ],
  function (Backbone, $, HomeSearchView, Streams, Router) {
  'use strict';

  describe('the home button should display a users assigned items', function() {

    var searchBus = Streams.searchBus,
        homeSearchView,
        tabRouter;
    Router.init();
    beforeEach(function() {
      tabRouter = Router.getTabRouter();
      var f = jasmine.getFixtures();
      f.fixturesPath = 'base';
      f.load('test/fixtures/base.html');
      spyOn(HomeSearchView.prototype, 'homePressed').andCallThrough();
      homeSearchView = new HomeSearchView();
    });

    afterEach(function() {
    });

    it('should respond to a user click', function(){
      $('.home').click();
      expect(homeSearchView.homePressed).toHaveBeenCalled();
      // test case   
    });

    it('should navigate to /', function(){
      tabRouter.navigate('tab/incident', {trigger: true});
      $('.home').click();
      expect(Backbone.history.fragment).toEqual('');
    });
  });
  
});

