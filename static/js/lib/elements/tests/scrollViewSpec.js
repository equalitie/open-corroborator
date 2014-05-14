/*global runs, waitsFor, jasmine, describe, beforeEach, afterEach, xit, it, expect,
 loadStyleFixtures, spyOn
*/
// Author: Cormac McGuire
// ### Description
// test suite for the scroll view mixin

define(
  [
    'jquery', 'backbone', 'underscore',
    'lib/elements/views/ScrollViewMixin',
    'lib/elements/helpers/view-close',
    'test/fixtures/extensions'
  ],
  function ($, Backbone, _, ScrollViewMixin) {
  'use strict';

  var collection;
  var ScrollableView = Backbone.View.extend({
    initialize: function(options) {
      this.setUpScrollOptions(options);
    },
    destroyChildren:function() {},
    renderEmpty: function() {},
    renderItem: function() {}

  });
  _.extend(ScrollableView.prototype, ScrollViewMixin);
  var createTestData = function(numModels) {
    var i = 0, collection = new Backbone.Collection();
    var modelData = {
      title: 'test render model',
      description: 'some test data'
    };
    for (i; i < numModels; i++) {
      collection.add(modelData);
    }
    return collection;
  };

  describe('scroll view test suite', function() {

    beforeEach(function() {
      var f = jasmine.getFixtures();
      f.fixturesPath = 'base';
      f.load('test/fixtures/scrollView.html');
      loadStyleFixtures('test/fixtures/style/scrollViewStyles.css');
      collection = createTestData(200);
    });

    afterEach(function() {
    });

    it('should setup defaults correctly', function(){
      var scrollableView = new ScrollableView({
        collection: collection
      });
      var passed = _.isEqual(
        scrollableView.scrollOptions, ScrollViewMixin.scrollDefaults);
      expect(passed).toBe(true);
    });

    it ('should initially render the amount of entities specified',
    function() {
      var scrollableView = new ScrollableView({
        collection: collection,
        scrollOptions: {
          listElementHeight: 50
        }
      });
      scrollableView.renderStart();
      expect(scrollableView.scrollOptions.currentPage).toBe(1);
    });

    it ('should render the next chunk',
    function() {
      var scrollableView = new ScrollableView({
        collection: collection,
        scrollOptions: {
          listElementHeight: 50
        }
      });
      scrollableView.renderStart();
      scrollableView.renderNextChunk();
      expect(scrollableView.scrollOptions.currentPage).toBe(2);
      expect(scrollableView.scrollOptions.loadAfter).toBe(40);
    });

    it('should render the empty view if the collection is empty', function(){
      collection  = new Backbone.Collection();
      spyOn(ScrollableView.prototype, 'renderEmpty');
      var scrollableView = new ScrollableView({
        collection: collection,
        scrollOptions: {
          listElementHeight: 50
        }
      });
      scrollableView.renderStart();
      expect(scrollableView.renderEmpty).toHaveBeenCalled();
    });

  });
});
