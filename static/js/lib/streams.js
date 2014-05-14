/*global window, document, define */
// Author: Cormac McGuire  
// define the streams that are used to pass messages between modules  
//
define(
  ['bacon', 'underscore'],
  function(Bacon, _) {
    'use strict';
    var createTypeFilter = function(eventType) {
      return function (value) {
        return value.type === eventType;
      };
    };
    var searchBus = new Bacon.Bus(),
        navBus = new Bacon.Bus(),
        crudBus = new Bacon.Bus(),
        navProperty = navBus.toProperty('incident');
    //navBus.toEventStream().log();
    //searchBus.toEventStream().log();
    //crudBus.toEventStream().log();
    return {
      filterLib: {
        createTypeFilter: createTypeFilter
      },
      searchBus: searchBus,
      navBus: navBus,
      crudBus: crudBus,
      navProperty: navProperty
    };
  }
);
