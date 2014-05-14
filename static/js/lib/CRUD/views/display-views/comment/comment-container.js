/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a single comment
//

define (
  [
    'backbone', 'underscore', 'jquery',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/data/CommentCollection',
    'lib/CRUD/templates/display-templates/misc/comment-container.tpl',
    'lib/CRUD/templates/display-templates/misc/comment.tpl',
    'i18n!lib/CRUD/nls/dict'

  ],
  function (Backbone, _, $, CollectionViews, Comment, commentContainerTmp, commentTmp, i18n) {
    'use strict';

    var CommentListView,
        CommentView,
        CommentModel = Comment.CommentModel,
        ListView = CollectionViews.ListView,
        ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView;


    CommentView = ModelView.extend({
      templateVars: {
        i18n: i18n
      },
      template: commentTmp,
      className: 'comment-display'
    });

    // ### CommentContainerView
    // 
    CommentListView = ListLoadView.extend({
      templateVars: {
        i18n: i18n
      },
      modelType: CommentModel,
      childView: CommentView,
      childViews: [],
      fieldType: 'comments',
      className: 'comment-display-list',
      containerTmp: commentContainerTmp,

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }

    });


    
    return CommentListView;
});



