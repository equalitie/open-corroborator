/*global window, define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Handle the media form display and interaction with the backend to create 
// a media entity with file upload
// The file will be uploaded first and meta data added afterwards

define (
  [
    'backbone', 'jquery', 'lib/streams',
    'lib/Data/media',
    'lib/CRUD/templates/search-templates/media/media-form.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, $, Streams, Media,  mediaFormTmp, i18n) {
    'use strict';
    var MediaFormView,
        crudBus = Streams.crudBus,
        mediaTypes = [
          { value: 'Video',    text : 'Video'    },
          { value: 'Picture',  text : 'Picture'  },
          { value: 'Document', text : 'Document' }
        ];

    // ### MediaFormView
    // 
    MediaFormView = Backbone.View.extend({
      template: mediaFormTmp,
      events: {
      },
      formOptions: function() {
        return {
          resetForm     : true,
          success       : this.submitSuccess.bind(this),
          error         : this.submitError.bind(this),
          beforeSubmit  : this.validateFile.bind(this),
          uploadProgress: this.uploadProgress.bind(this),
          dataType      : 'json',
          url           : this.buildUrl()
        };
      },
      initialize: function() {
        this.addi18n();
        this.render();
      },
      buildUrl: function() {
        return '/api/v1/media/?format=json&username=' + Bootstrap.username +
               '&api_key=' + Bootstrap.apiKey;
      },

      // render the html then call the openDialog function
      render: function() {
        var html = this.template({
          mediaTypes: mediaTypes,
          username  : Bootstrap.username,
          apiKey    : Bootstrap.apiKey,
          i18n      : i18n
        });
        this.$el.html(html);
        this.openDialog();
        this.formify();
      },

      // open the dialog box
      openDialog: function() {
        var buttons = {};
        buttons[i18n.media.upload_media] = this.uploadRequested.bind(this);
        buttons[i18n.media.cancel] = this.cancelRequested.bind(this);
        this.$el.dialog({
          autoOpen : true,
          height   : 380,
          width    : 350,
          title    : i18n.media.Upload_new_media,
          modal    : true,
          draggable: false,
          close    : this.cancelRequested.bind(this),
          buttons  : buttons
        });
      },
      formify: function() {
        this.$formEl = this.$el.children()
                               .children('form.media-form');
        this.$formEl.ajaxForm(function() {
                      //console.log('did something');
                     });
      },

      createProgressBar: function() {
        this.progressbar = this.$el.children()
                               .children('.media-progressbar')
                               .progressbar({
                                 value: 5
                               });
      },

      // validate that a file has been added and create the entity
      uploadRequested: function() {
        this.createProgressBar();
        this.progressbar.show();
        this.$formEl.ajaxSubmit(this.formOptions());
      },
      validateFile: function(arr, $form, options) {
        if (arr[2].value === "") {
            this.progressbar.hide();
            this.showMessage('.file');
            window.setTimeout(this.hideMessage.bind(this, '.file'), 2000);
          return false;
        }
      },
      showMessage: function(messageClass) {
            this.$el.children()
                    .children('.message-text')
                    .children(messageClass)
                    .addClass('show-message');
      },
      hideMessage: function(messageClass) {
            this.$el.children()
                    .children('.message-text')
                    .children(messageClass)
                    .removeClass('show-message');
      },

      // upload failed show error message
      submitError: function() {
        this.showMessage('.server');
        window.setTimeout(this.hideMessage.bind(this, '.server'), 2000);
        this.progressbar.hide();
      },

      submitSuccess: function(responseObject) {
        var mediaModel = new Media.MediaModel(responseObject);
        this.showMessage('.success');
        window.setTimeout(this.hideMessage.bind(this, '.success'), 2000);
        this.progressbar.hide();
        crudBus.push({
          type: 'relate_media_request',
          content: {
            model: mediaModel
          }
        });

      },

      uploadProgress: function(evt, position, total, percent) {
        this.progressbar.progressbar('option', { value: percent });
      },

      // close the dialog and send a message to say that it has been 
      // closed
      cancelRequested: function() {
        crudBus.push({
          type: 'media_upload_cancelled',
          content: {}
        });
        this.$el.dialog('close');
      }
    });

    return MediaFormView;
    
});

