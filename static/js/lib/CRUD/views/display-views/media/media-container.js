/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a list of media files with a preview box

define (
  [
    'jquery', 'backbone', 'lib/Data/media', 
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/media/media.tpl',
    'lib/CRUD/templates/display-templates/media/media-container.tpl',
    'lib/CRUD/templates/search-templates/media/media-viewer.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, Backbone, Media, CollectionViews, mediaTmp, mediaListTmp,
    mediaViewerTmp, i18n) {
    'use strict';

    var ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView,
        MediaListView, MediaView,
        MediaModel = Media.MediaModel;


    // show a single media element
    MediaView = ModelView.extend({
      templateVars: {
        i18n: i18n
      },
      tagName: 'li',
      className: 'medium REPEAT',
      template: mediaTmp,
      initialize: function() {
        this.addi18n();
        this.render();
        this.$el.tooltip();
      },
      events: {
        'click .media-image-thumbnail'   : 'previewImage',
        'click .media-video-thumbnail'   : 'previewMedia'
      },
      previewMedia: function() {
        this.model.trigger('previewMedia', this.model);
      },
      previewImage: function() {
        var dialogHtml = mediaViewerTmp({
          image: true,
          uri: this.model.get('media_file'),
          alt: this.model.get('name_en')
        });
        this.openDialog($(dialogHtml));
      },

      openDialog: function($dialogHtml) {
        $dialogHtml.attr('title', this.model.get('name_en'));
          $dialogHtml.dialog({
            resizable: true,
            close: function( event, ui ) {
              $(this).children().remove();              
            },
            modal: true,
            resizable: true,
            width:800,
            position:["center",20]
          });
      },
    });

    // show a list of media elements with a preview
    MediaListView = ListLoadView.extend({
      templateVars: {
        i18n: i18n
      },
      childViews: [],
      modelType: MediaModel,
      childView: MediaView,
      fieldType: 'media',
      containerTmp: mediaListTmp,

      initialize: function(options) {
        this.addi18n();
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
        this.listenTo(this.collection, 'previewMedia', this.previewMedia.bind(this));
      },
      previewMedia: function(model) {
        $('.is-media.group').children('.preview')
                            .remove();
        $('.is-media.group').prepend('<div class="preview"></div>');
        var video, fileType, fileName;
        video = {};
        fileType = model.get('media_file_type');
        fileType = 'mp4';
        fileName = model.get('media_file');
        video[fileType] = fileName;
        
        this.$el.children('.preview').flowplayer({
          playlist: [
            fileName
          ]
        });
      },
      onDestroy: function() {
        this.destroyChildren();
        this.stopListening();
      }
    });

    return MediaListView;
});

