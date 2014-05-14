/*global spyOn, runs, waitsFor, jasmine, describe, beforeEach, xit, it, expect*/
// Author: Cormac McGuire
// ### Description
// test display/hide of the search activity indicator


define (
  [
    'jquery',
    'lib/streams',
    'lib/Navigation/activity'
  ],
  function ($, Streams, Activity) {
    'use strict';
    var createTypeFilter = function(eventType) {
      return function (value) {
        return value.type === eventType;
      };
    };
    describe('Test activity display gets shown and hidden appropriately',
    function () {
      var flag, activityView;
    
      beforeEach(function() {
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load('test/fixtures/base.html');
        activityView = Activity.init();
        $('.searching img').hide();
      });
      
    
      it("should show the activity monitor when a search is requested",
      function() {
        runs(function() {
          var filterFunc = createTypeFilter('search_request');
          Streams.searchBus.filter(filterFunc)
                           .onValue(function() {
                             flag = true;
                           });
          Streams.searchBus.push({
            type: 'search_request',
            content: {}
          });
        });
        waitsFor(function() {
          return flag;
        });
        runs(function() {
          expect($('.searching img')).not.toHaveCss({display: 'none'});
        });
      });

      it("should hide the activity monitor when a search is completed",
      function() {
        runs(function() {
          $('.searching img').show();
          var filterFunc = createTypeFilter('results_incident');
          Streams.searchBus.filter(filterFunc)
                           .onValue(function() {
                             flag = true;
                           });
          Streams.searchBus.push({
            type: 'results_incident',
            content: {}
          });
        });
        waitsFor(function() {
          return flag;
        });
        runs(function() {
          expect($('.searching img')).toHaveCss({display: 'none'});
        });
      });
      
    });
    
});



