/*global define*/
// Author: Cormac McGuire
// ### Description
// parse the fields that are to be used in comparisons

define (
  [
    'underscore'
  ],
  function (_) {
    'use strict';
    var parseComparator, reduceArray, lowerCase, convertNumToString,
    convertUndefinedNumber, convertUndefinedString;

    // parse the compare field
    parseComparator = function(compareField, direction, minVal, maxVal) {
      compareField = reduceArray(compareField);
      compareField = lowerCase(compareField);
      compareField = convertUndefinedNumber(compareField, direction, minVal, maxVal);
      compareField = convertUndefinedString(compareField, direction);
      compareField = convertNumToString(compareField);
      return compareField;
    };

    // pick the first element from the array for comparison
    reduceArray = function(field) {
      if (typeof(field) === 'object') {
        field = reduceArray(_.first(field));
      }
      return field;
    };

    // convert all strings to lower case for comparison
    lowerCase = function(field) {
      if (typeof(field) === 'string') {
        field = field.toLowerCase();
      }
      return field;
    };

    convertUndefinedString = function(field, direction, minVal) {
      if (field === undefined && minVal === undefined) {
        field = direction === 'ascending' ? 'zzz' : 'aaa';
      }
      return field;
    };

    convertUndefinedNumber = function(field, direction, minVal, maxVal) {
      if (field === undefined && minVal !== undefined) {
        field = direction === 'ascending' ? 'zzz' : '000';
      }
      return field;
    };

    convertNumToString = function(field) {
      if (typeof(field) === 'number') {
        if (field < 10) {
          field = '0' + field.toString();
        }
        else {
          field = field.toString();
        }
      }
      return field;
    };

  return {
    parseComparator: parseComparator
  };

});

