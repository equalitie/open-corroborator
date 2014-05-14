/*global define */
// Author: Cormac McGuire  
// ### dialog.js
// represent a dialog box that can be reused across the site  
// This is a jquery_ui element
//
// Currently only useful for saving search
// TODO: make it more generic
define(
  [
    'jquery', 'jquery_ui',
    'lib/dispatcher'
  ],
  function ($, jquery_ui, dispatcher) {
    'use strict';
    // stores a ref to the dialog dom element
    var dialogElement;

    // called when the dialog Save button is pressed
    var handleSaveSearch = function() {
      $(dialogElement).dialog('close');
    };

    // called when the dialog Cancel button is pressed
    var handleClose = function() {
      $(dialogElement).dialog('close');
    };

    var resetError = function() {};

    // open the dialog
    var openDialog = function () {
      $(dialogElement).dialog('open');
    };

    var createDialog = function () {
      $(dialogElement).dialog({
        autoOpen: false,
        height: 200,
        width: 350,
        modal: true,
        buttons: {
          'Save Search': handleSaveSearch,
          'Cancel': handleClose
        },
        close: resetError
      });
    };

    var init = function (openEvent, dialogId) {
      dialogElement = dialogId;
      dispatcher.on(openEvent, openDialog);
      createDialog();
    };


    // expose our init function as a module export
    return {
      init: init
   };
});


