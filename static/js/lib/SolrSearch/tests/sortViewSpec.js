/*global spyOn, runs, waitsFor, jasmine, describe, afterEach, beforeEach, xit, it, expect*/
// Author: Cormac McGuire
// ### Description
// test the sort headers, ensure they are firing the right events

define (
  [
    'jquery',
    'lib/SolrSearch/views/sort-view',
    'lib/streams',
    'jasmine_jquery'
  ],
  function ($, SortView, Streams) {
    'use strict';
    var createTypeFilter, searchBus, sortFilter;
    createTypeFilter = Streams.filterLib.createTypeFilter;
    sortFilter = createTypeFilter('filter_view');
    searchBus = Streams.searchBus;
    describe('Test the sort view functionality', function () {
      var sortView, flag, value;
    
      beforeEach(function() {
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load('test/fixtures/sort.html');
        sortView = new SortView();
        flag = false;
      });

      afterEach(function() {
        sortView.destroy();
      });

      it('should render the view', function() {
        expect($('tr.filters')).not.toBeEmpty();
      });
    
      xit('should send a sort request when the user clicks sort', function() {
        var eventContent;
        runs(function() {
          searchBus.toEventStream()
                   .filter(sortFilter)
                   .subscribe(function(getValue) {
                     eventContent = getValue.value().content;
                     flag = true;
                   });
          $('.sort-header .location').click();
        });
        waitsFor(function() {
          return flag;
        });
        runs(function() {
          expect(eventContent.sort).toEqual('location');
          expect(eventContent.direction).toEqual('descending');
        });
      });

      it('should sort numbers correctly', function(){
          
      });

      xit('should reverse the order of the sort if the user clicks the same header twice',
      function() {
        var eventContent;
        runs(function() {
          $('.sort-header .location').click();
          searchBus.toEventStream()
                   .filter(sortFilter)
                   .subscribe(function(getValue) {
                     eventContent = getValue.value().content;
                     flag = true;
                   });
          $('.sort-header .location').click();
        });
        waitsFor(function() {
          return flag;
        });
        runs(function() {
          expect(eventContent.sort).toEqual('location');
          expect(eventContent.direction).toEqual('ascending');
        });
      });
      
      
    });
    
});

