/*global define*/
// Author: Cormac McGuire
// ### Description
// stuff what ie needs

define (
  [
    
  ],
  function () {
    'use strict';

    // Add ECMA262-5 method binding if not supported natively
    //
    if (!('bind' in Function.prototype)) {
        Function.prototype.bind= function(owner) {
            var that= this;
            if (arguments.length<=1) {
                return function() {
                    return that.apply(owner, arguments);
                };
            } else {
                var args= Array.prototype.slice.call(arguments, 1);
                return function() {
                    return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
                };
            }
        };
    }


    // Add ECMA262-5 Array methods if not supported natively
    //
    if (!('indexOf' in Array.prototype)) {
        Array.prototype.indexOf= function(find, i /*opt*/) {
            if (i===undefined) i= 0;
            if (i<0) i+= this.length;
            if (i<0) i= 0;
            for (var n= this.length; i<n; i++)
                if (i in this && this[i]===find)
                    return i;
            return -1;
        };
    }
});



