/*global beforeEach, describe, it, expect*/
// Author: Cormac McGuire
// ### Description
// test the date range view

define (
  [
    'moment',
    'lib/SolrSearch/views/filters/date-range',
    'lib/streams'
  ],
  function (moment, dateRangeView, Streams) {
    'use strict';
    var searchBus = Streams.searchBus,
        DateRange = dateRangeView.DateRange;
    describe('date range tests', function () {
      //var 
    
      beforeEach(function() {
      });
      
    
      it('should pass a valid date range', function() {
          var startDate = '2012-11-30',
              endDate = '2012-12-27';

          var dr = new DateRange(startDate, endDate);
          expect(dr.validate().passed).toEqual(true);
      });
      it('should check both dates exist', function() {
        var startDate = '2012-11-30',
            endDate = '';

        var dr = new DateRange(startDate, endDate);
        expect(dr.validate().passed).toEqual(false);
        
      });
      it('should check both dates are valid', function() {
          var startDate = '2012-11-30',
              endDate = '2012-11-36';

          var dr = new DateRange(startDate, endDate);
          expect(dr.validate().passed).toEqual(false);
      });
      it('should check first date precedes second date', function() {
          var startDate = '2012-12-30',
              endDate   = '2012-11-15';

          var dr = new DateRange(startDate, endDate);
          expect(dr.validate().passed).toEqual(false);
      });
      it('should export a valid date range string', function() {
        var startDate = '2012-11-30',
            endDate   = '2012-12-27',
            dr = new DateRange(startDate, endDate),
            expectedRange = '[2012-11-30T00:00:00.000Z TO ' +
                            '2012-12-27T00:00:00.000Z]';
            dr.validate();
        
            expect(dr.toString()).toEqual(expectedRange);
      });
      it('should export a display date range string', function() {
        var startDate = '2012-11-30',
            endDate   = '2012-12-27',
            dr = new DateRange(startDate, endDate),
            expectedRange = '30 Nov, 2012 TO ' +
                            '27 Dec, 2012';
            dr.validate();
        
            expect(dr.toDisplayString()).toEqual(expectedRange);
      });
      
    });
    

});

