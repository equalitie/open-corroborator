/*global define*/
// Author: Cormac McGuire
// ### general utility functions
// 

define(
  ['underscore'],
  function(_) {
    'use strict';
    var maybe = function(fn) {
      return function() {
        var args = Array.prototype.slice.call(arguments, 0),
            shouldCall = false;
        if (args.length > 0) {
          shouldCall = _.reduce(args, function(prevResult, arg) {
              var exists = arg !== undefined &&
              arg !== null &&
              arg !== false &&
              arg!== '';
              return prevResult && exists;
              }, true);
        }
        if (shouldCall) {
          fn.apply(this, args);
        }
      };

    };
  
    return {
      maybe: maybe
    };
  }
);
