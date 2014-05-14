/*global runs, waitsFor, jasmine, describe, beforeEach, afterEach, xit, it, expect */
// Author: Cormac McGuire
// ### Description
// test the search info display view

define(
  [
    'jquery',
    'lib/Navigation/views/search-info',
    'jasmine_jquery'
  ],
  function ($, SearchInfoView) {
  'use strict';
  describe('display of the search help box', function() {

    beforeEach(function() {
      var f = jasmine.getFixtures();
      f.fixturesPath = 'base';
      f.load('test/fixtures/base.html');
      var infoView = new SearchInfoView();
    });

    afterEach(function() {
    });

    it('should open a help window when the info icon is clicked',
    function(){
      $('.info').click();
      expect($('.help-text-container')).toBeVisible();
    });
  });
    
});


