/*global runs, waitsFor, jasmine, describe, beforeEach, xit, it, expect */
// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define(
  [
    'jquery', 'underscore',
    'lib/CRUD/views/actor-form',
    'lib/CRUD/views/bulletin-form',
    'lib/CRUD/views/incident-form',
    'lib/CRUD/views/form-manager',
    'lib/CRUD/views/form-mixins',
    'lib/streams'
  ],
  function($, _, ActorForm, BulletinForm, IncidentForm, FormManager, Mixins,
    Streams) {

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
    describe('Test form display', function () {
      var value, flag;
    
      beforeEach(function() {
        value = 0;
        manager = new FormManager.FormManagerView();
        manager.replaceView = function() { 
          flag = true;
        };
      });
      
      var testReplaceView = function(entity) {
        runs(function() {
          navigate(entity);
          Streams.searchBus.push({
            content: {},
            type: 'create_' + entity
          });
        });
        waitsFor(function() {
          value++;
          return flag;
        });
        runs(function() {
          expect(value).toBeGreaterThan(0);
        });

      };

      it("should display the incident form when new incident pressed", function() {
        testReplaceView('incident');
      });
      it("should display the incident form when new bulletin pressed", function() {
        testReplaceView('bulletin');
      });
      it("should display the incident form when new actor pressed", function() {
        testReplaceView('actor');
      });

      
      describe('Form field formatting', function() {
        var Formatter = Mixins.Formatter;
        it("should create an integer from a string with an integer in it", function() {
          var intString = '1',
              intOut = 1,
              justAString = '56 somewhere st',
              actualIntOut = Formatter.makeIntStringsIntegers(intString),
              actualStringOut = Formatter.makeIntStringsIntegers(justAString);
          expect(actualIntOut).toEqual(intOut);
          expect(actualStringOut).toEqual(justAString);
        });

        it("should convert from jquery's serializeArray format to BB model format",
          function() {

          var jqueryStyle = [
                {"name":"foo","value":"1"},
                {"name":"foo","value":"3"},
                {"name":"bar","value":"xxx"},
                {"name":"this","value":"hi"}
              ],
              requiredStyle = {
                "foo" : [1,3],
                "bar" : "xxx",
                "this": "hi"
              },
              output;

          output = Formatter.formArrayToData(jqueryStyle);
          expect(_.isEqual(output, requiredStyle)).toEqual(true);
          expect(output).toEqual(requiredStyle);

        });
      });
    });
    

});
