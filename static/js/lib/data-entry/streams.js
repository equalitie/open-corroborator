/*global window, document, define */
// Author: Cormac McGuire  
// define the streams that are used to pass messages between modules  
//
define(
  ['bacon'],
  function(Bacon) {
    'use strict';
    var dataEntryBus = new Bacon.Bus();
    return {
      dataEntryBus: dataEntryBus
    };
});
