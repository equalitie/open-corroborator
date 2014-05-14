/*global runs, waitsFor, jasmine, describe, beforeEach, xit, it, expect */
// ## solr-textsearch-test.js
// Author: Cormac McGuire
// Test that filters are displaying and dispatching filter events
// to our streams
define(
  [
    'underscore',
    'lib/SolrSearch/solr/parse-filters',
    'lib/streams',
    'test/fixtures/filters'
  ],
  function(_, ParseFilter, Streams, filters) {
    'use strict';
    var actorFields = [
          'age_en_exact',
          'sex_en_exact',
          'civilian_en_exact',
          'nationality_en_exact'
        ],
        bulletinFields = [
          'bulletin_labels_exact',
          'bulletin_assigned_user_exact',
          'most_recent_status_bulletin_exact',
          'bulletin_sources_exact'
        ],
        incidentFields = [
          'incident_labels_exact', 
          'incident_assigned_exact',
          'crimes_exact',
          'most_recent_status_incident_exact'
        ],
        filterBulletin = function(value) {
          var isSame = 
            _.difference(bulletinFields, _.keys(value.content)).length === 0;
          return value.type === 'parse_filters_bulletin' && isSame;
        },
        filterIncident = function(value) {
          try {
          var isSame = 
            _.difference(incidentFields, _.keys(value.content)).length === 0;
          return value.type === 'parse_filters_incident' && isSame;
          }
          catch (e) {
          }
        },
        filterActor = function(value) {
          var isSame = 
            _.difference(actorFields, _.keys(value.content)).length === 0;
          return value.type === 'parse_filters_actor' && isSame;
        },

        bus = Streams.searchBus,
        manager;

    describe('Solr Search result parser', function() {
      var value, flag;
    
      
      beforeEach(function() {
        value = 0;
      });

      it('should return the filter parser function', function() {
        expect(typeof(ParseFilter)).toEqual('function');
      });
      var testParseFilters = function (filterFunction, entity) {
        runs(function() {
          bus.toEventStream()
             .filter(filterFunction)
             .take(1)
             .onValue(function(myVal) {
               flag = true;
             });
          var fp = new ParseFilter(filters, entity);
        });

        waitsFor(function() {
          value++;
          return flag;
        }, 'The value should be incremented', 500);

        runs(function() {
          expect(value).toBeGreaterThan(0);
        });


      };
      xit('should parse the bulletin filters', function(done) {
        testParseFilters(filterBulletin, 'bulletin');
      });

      xit('should parse the incident filters', function(done) {
        testParseFilters(filterIncident, 'incident');
      });
      xit('should parse the actor filters', function(done) {
        testParseFilters(filterIncident, 'incident');
      });
    });

});


