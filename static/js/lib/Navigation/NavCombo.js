/*global window, define, Bacon, Bootstrap */
// Author: Cormac McGuire  
// ### combo
// represent the combo box in the navigation area
// 
// collection contains the elements to be displayed can be filtered based on 
// current tab
// 

define(
  [
    // vendor
    'jquery', 'underscore', 'backbone', 'bacon',
   // event streams
    'lib/streams',
    // local libs
    'lib/elements/combo',
    'lib/Data/collections',
    'i18n!lib/Navigation/nls/dict'
  ],
  function ($, _, Backbone, Bacon, Streams, Combo, Collections, i18n) {
    'use strict';
    var Collection = Collections.SavedSearchCollection;
    var localBus = new Bacon.Bus(),
        searchBus = Streams.searchBus;

    var isSearchRequest = function(value) {
      var model = value.content;
      return model.get('type') === 'search';
    };
    var isComboAction = function(value) {
      return value.type === 'nav_combo';
    };
    var isSavedSearch = function(value) {
      var model = value.content;
      return model.get('type') === 'predefined_search';
    };

    var isSaveSearchRequest = function(value) {
      var model = value.content;
      return model.get('type') === 'default';
    };

    var dispatchSavedSearch = function (value) {
      var model = value.content;
      Streams.searchBus.push({
        type: 'predefined_search',
        content: model
      });
    };

    var dispatchSaveSearchRequest = function (value) {
      var model = value.content;
      Streams.searchBus.push({
        type: 'save_search_request',
        content: model
      });
    };
    var dispatchSearchRequest = function (value) {
      var model = value.content;
      Streams.searchBus.push({
        type: 'search_request',
        content: model
      });
    };

    // send saved search events to the main search bus
    localBus.toProperty()
            .filter(isComboAction)
            .filter(isSavedSearch)
            .onValue(dispatchSavedSearch);

    // send save current search request to the main search bus
    localBus.toProperty()
            .filter(isComboAction)
            .filter(isSaveSearchRequest)
            .onValue(dispatchSaveSearchRequest);

    // send search request to the main bus
    localBus.toProperty()
            .filter(isComboAction)
            .filter(isSearchRequest)
            .onValue(dispatchSearchRequest);

    /**
     * check if the element is a new search
     */
    var isSearch = function(value) {
      return value.type === 'new_search';
    };

    /**
     * create the full collection of items to initialise our collection
     * we add the save search item in here
     */
    var createFullCollection = function() {
      var fullCollection = Collection;
      var item = {
        name: i18n.Save_current_search,
        search_request: 'save_search',
        type: 'default'
      };
      fullCollection.add(item);
      return fullCollection;
    };


    // ## NavComboView
    // This is a subclass for the combo view from combo.js
    //
    var NavComboView = Combo.View.extend({
      filteredCollection: undefined,
      eventIdentifier: 'nav_combo',

      // init the view setting the default item if provided
      initialize: function(options) {
        this.collection = createFullCollection();
        //this.collection = this.fullCollection.clone();
        options.bus = localBus;
        Combo.View.prototype.initialize.call(this, options);
      }


    });

    // expose our view as a module export
    return {
      View: NavComboView,
      Collection: Collection
    };
});

