/*global define, window*/
// Author: Cormac McGuire
// ### Description
// Watch for save search requests and display a dialog to the user allowing
// them to set a name for the saved search

define (
  [
    'backbone', 'underscore', 'jquery', 
    'lib/streams',
    'lib/SolrSearch/templates/save-search-dialog.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (Backbone, _, $, Streams, saveSearchDialogTmp, i18n) {
    'use strict';
    var watchForSaveSearchRequest, init, displayDialog, searchBus,
        SaveSearchDialogView, filterSaveSearchRequest, checkLength,
        filterSaveSearchResponseResult, saveSearchDialog;

    searchBus = Streams.searchBus;

    filterSaveSearchResponseResult = function(value) {
      return value.type === 'save_search_response_result';
    };

    filterSaveSearchRequest = function(value) {
      return value.type === 'save_search_request';
    };

    init = function() {
      watchForSaveSearchRequest();
    };

    watchForSaveSearchRequest = function() {
      searchBus.toEventStream()
               .filter(filterSaveSearchRequest)
               .onValue(displayDialog);
    };

    displayDialog = function() {
      saveSearchDialog = new SaveSearchDialogView();
    };

    // ## Save search dialog
    //
    SaveSearchDialogView = Backbone.View.extend({
      id: 'save-search-dialog-form',
      template: saveSearchDialogTmp,
      subscribers: [],

      // constructor
      initialize: function() {
        this.render();
      },

      // remove bus watchers
      onDestroy: function() {
        _.each(this.subscribers, function(unsub) {
          unsub();
        });
      },

      // display form feedback
      updateTips: function( tipText ) {
        var formTipsEl = this.$el.children('.form-error');
        formTipsEl.text( tipText )
                  .addClass( 'ui-state-highlight' );
        setTimeout(function() {
          formTipsEl.removeClass( 'ui-state-highlight', 1500 );
        }, 500 );
      },
 
      // check the length of the title
      checkLength: function( formEl, title, min, max ) {
        var passed = true;
        if ( formEl.val().length > max || formEl.val().length < min ) {
          formEl.addClass( 'ui-state-error' );
          var errorTemplate = _.template(i18n.dialog.Length_error);
          this.updateTips(errorTemplate({
            min: min,
            max: max
          }));
          passed = false;
        } 
        return passed;
      },

      // show the dialog
      displayDialog: function () {
        var buttons = {};
        buttons[i18n.dialog.Save_search] =
          this.saveSearchRequested.bind(this);
        buttons[i18n.dialog.Cancel] = this.closeDialog.bind(this);

        this.$el.dialog({
          width: 350,
          modal: true,
          buttons: buttons
        });
      },
      closeDialog: function() {
        this.$el.dialog('close');
        this.destroy();
      },

      // respond to click on save button
      saveSearchRequested: function() {
        var formValid, titleEl, makeGlobalEl, global;
        formValid = true;
        titleEl = this.$el
                      .children()
                      .children('#search-title');

        global = this.$el
                     .children()
                     .children()
                     .children('#search-global').prop('checked') === true;

        formValid = this.checkLength(titleEl, 'Search title', 3, 16);
        if(formValid === true) {
          this.dispatchSaveRequest(titleEl.val(), global);
          this.watchForSaveResult();
          this.updateTips('Saving search');
        }
      },

      // send off the save request
      dispatchSaveRequest: function (title, global) {
        searchBus.push({
          type: 'save_search_form_request',
          content: {
            searchTitle: title,
            global: global
          }
        });
      },

      // watchForTheResult of the save search request
      watchForSaveResult: function() {
        var subscriber = 
        searchBus.toEventStream()
                 .filter(filterSaveSearchResponseResult)
                 .subscribe(this.displaySaveSearchResult.bind(this));
        this.subscribers.push(subscriber);
      },

      displaySaveSearchResult: function(evt) {
        var result, errorText, successText;
        result = evt.value().content;
        errorText = i18n.dialog.Error_saving_search;
        successText = i18n.dialog.Search_saved;
        if (result.error === true) {
          this.updateTips(errorText);
        }
        else {
          this.updateTips(successText);
        }
        window.setTimeout(function() {
          saveSearchDialog.closeDialog();
          this.destroy();
        }.bind(this), 500);
      },

      // render the dialog html and open it
      render: function() {
        var html = this.template({
          i18n: i18n
        });
        this.$el.attr('title', i18n.dialog.Search_title);
        this.$el.html(html);
        this.displayDialog();
      }
    });


    return {
      init: init
    };
});

