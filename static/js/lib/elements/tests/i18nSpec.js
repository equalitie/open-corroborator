/*global runs, waitsFor, jasmine, describe, beforeEach, afterEach, xit, it, expect */
// Author: Cormac McGuire
// ### Description
// test i18n intialisation and language switching

define(
  [
    'jquery', 'backbone',
    'lib/elements/helpers/view-close', 'test/fixtures/extensions'
  ],
  function ($, Backbone) {
  'use strict';

  describe('test i18n of backbone views', function() {

    var i18nView;
    beforeEach(function() {
      var f = jasmine.getFixtures();
      f.fixturesPath = 'base';
      f.load('test/fixtures/i18n.html');
      var I18nView = Backbone.View.extend({
        el: '.all-wrapper',
        initialize: function() {
          this.addi18n();
        }
      });
      i18nView = new I18nView();

    });

    afterEach(function() {
      i18nView.destroy();
    });

    it('should display the i18n string that has content', function(){
      i18nView.selectInitialLanguage();
      expect($('.title span[lang=en]')).toBeHidden();
      expect($('.title span[lang=ar]')).toBeVisible();
    });

    it('should toggle between languages', function() {
      $('.title2 .toggle span[lang=ar]').click();
      expect($('.title2 span[lang=en]')).toBeHidden();
    });
  });
  
});

