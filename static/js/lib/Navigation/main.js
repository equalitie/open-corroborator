/*global define, Bootstrap */
// ### main
// 
// main entry point for the Navigation module  
// We will define and manage events from the various components within this section  
// 
// bacon.js EventStreams are used to build more functionality into our events  
// Certain events must happen in combination before they are propogated  
// For example:  
// To search, the user must have entered text into the input box
// and press the search button  
// To save the search requires the similar requirements  
// Save Search, Search and tab events will be propogated around the whole application  
// 

define(
  [
    'underscore',
    'lib/elements/input',
    'lib/Navigation/NavCombo',
    'lib/elements/dialog',
    'lib/Navigation/TabRouter',
    'lib/streams',
    'lib/Navigation/views/search-info',
    'lib/Navigation/views/home-search',
    'lib/Navigation/activity',
    'i18n!lib/Navigation/nls/dict'
  ],
  function(_, InputView, NavCombo, Dialog, TabRouter,
          Streams, HomeSearchView, SearchInfoView, Activity,
          i18n
  ) {
    'use strict';
    var textEntered,
        textProperty, inputView;

    // create our combo box view
    var createComboBox = function() {
      var Comboview = new NavCombo.View({
        el: '.search-combo',
        primary: {
          name: i18n.Search,
          search_request: 'search_request'
        }
      });
      // add the save item
      Comboview.render();
    };
    // show search spinner while search in progress
    Activity.init();

    // stream processing helper
    var nonEmpty = function(x) {
      return true;
    };

    // create the input view that will read in a search from the user
    var createInputView = function () {
      inputView = new InputView({
        el: '.search'
      });
      return inputView;
    };

    var initActivityWatcher = function() {
      Activity.init();
    };

    // watch for search events
    var watchForSearch = function() {
      var searchRequested = Streams.searchBus.filter(function(e){
        return e.type === 'search_request';
      })
      .map(function(e) {
        return {
          search_request: e.type === 'search_request'
        };
      })
      .onValue(function(value){
        Streams.searchBus.push({
          type: 'search_updated',
          content: inputView.getInput()
        });
      }.bind(this));

    };

    // create the dialog that we will use to save a user's search
    var createDialog = function () {
      Dialog.init('item_clicked', '#search-dialog-form');
    };

    var createHomeView = function() {
      var homeView = new HomeSearchView();
    };
    var createInfoView = function() {
      var infoView = new SearchInfoView();
    };

    // init function used to instantiate the objects required to get 
    // things running
    var init = function () {
      createComboBox();
      createInputView();
      createInfoView();
      createHomeView();
      watchForSearch();
      TabRouter.init();
      createDialog();
    };

    return {
      init: init
    };
  }
);
