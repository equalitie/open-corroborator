/*global spyOn, runs, waitsFor, jasmine, describe, afterEach, beforeEach, xit, it, expect*/
// Author: Cormac McGuire
// ### Description
// test router dispatching the correct events

define (
  [
    'underscore', 
    'lib/reporting/data/graph-types',
    'lib/reporting/data/graph-data',
    'lib/reporting/tests/test-data'
  ],
  function (_, GraphTypes, GraphData, TestData) {
    'use strict';
    var pieBarMapping = GraphData.pieBarMapping,
        mapToParsedJsonData = GraphData.mapToParsedJsonData;
    describe('Solr Data Parsing ', function() {
      beforeEach(function() {
      });
      afterEach(function() {});
      xit('should parse data to pie/bar charts', function(){
        var test_data = TestData.inputData.pieBarData,
            dataEvent = {
              key: 'age_en_exact',
              content: test_data
            },
            parsedData = {};

        parsedData = mapToParsedJsonData(dataEvent);
        expect(parsedData.values[0].label).toBe('Child');
        expect(parsedData.values[0].value).toBe(3454);
      });

      xit('should parse the type of a graph from its key', function(){
        var key = 'age_en_exact',
            type = GraphTypes.selectGraphTypeFromKey(key);
        expect(type).toEqual('bar');
        type = GraphTypes.selectGraphTypeFromKey('actor_created');
        expect(type).toEqual('trend');
            
      });


      it('should parse data to trend charts', function(){
        var dataEvent = {
              key: 'actor_created',
              content:TestData.inputData.trendData
            },
            parsedData = mapToParsedJsonData(dataEvent);

        expect(parsedData.values[0].values[0]).toEqual({
          x:1381849897000,
          y:3
        });
        //expect(parsedData.values[0].values[0].y).toEqual(7);


      });

      xit('should dispatch routing events', function(){
        runs(function() {
        });
        waitsFor(function() {
          return true;
        }, 'value should be incremented', 500);

        runs(function() {
        });
      });
    });
});
