/*global afterEach, runs, waitsFor, jasmine, describe, beforeEach, xit, it, expect*/
// Author: Cormac McGuire
// ### Description
// Test that comparators are being formatted correctly
define (
  [
    'lib/Data/comparator'
  ],
  function (Comparator) {
    'use strict';
    var parseComparator = Comparator.parseComparator;

    describe('parsing comparators', function () {
      //var 

      beforeEach(function() {
      });

      it('should return a lower case string for a mixed string', function() {
        var upperString = 'Upper',
            lowerString = 'upper';
        upperString = parseComparator(upperString);
        expect(upperString).toEqual(lowerString);
      });

      it('should return the first element of an array', function() {
        var compareArray = ['firstEl', 'secondEl'];
        var returned = parseComparator(compareArray);
        expect(returned).toEqual('firstel');
      });
      
      it('should return a string for a number', function() {
        var returned = parseComparator(1);
        expect(returned).toEqual('01');
      });

      it('should push undefined values to the end', function() {
        var parsed = parseComparator(undefined, 'ascending', 0, 100);
        expect(parsed).toEqual('zzz');
        parsed = parseComparator(undefined, 'descending', 0, 100);
        expect(parsed).toEqual('000');
        parsed = parseComparator(undefined, 'ascending');
        expect(parsed).toEqual('zzz');
        parsed = parseComparator(undefined, 'descending');
        expect(parsed).toEqual('aaa');
      });
      
      
    });
});



