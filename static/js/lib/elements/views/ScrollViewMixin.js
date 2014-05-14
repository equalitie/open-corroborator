/*global define, Bootstrap */
// Author: Cormac McGuire
// ### Description: infinite scroll mixin for views rendering a
//     whole pile of models
// 

define(
  [
    'jquery', 'backbone', 'underscore',
    'lib/SolrSearch/templates/results/empty-results.tpl'
  ],
  function ($, Backbone, _, emptyResultsTmp) {
  'use strict';

  var ScrollViewMixin = {

      // override to manage contained views
      childViews: [],

      scrollDefaults: {
        chunkSize: 30,
        loadAfter: 10,
        currentPage: 0,
        listElementHeight: 66
        //$scrollEl: this.$el
      },

      // set up defaults for our scroll box
      setUpScrollOptions: function(options) {
        options = options || {scrollOptions: {}};
        options.scrollOptions = options.scrollOptions || {};
        this.scrollOptions = _.defaults(
          options.scrollOptions, this.scrollDefaults);
      },

      // render the first batch of results
      renderStart: function() {
        this.destroyChildren();
        if (this.collection.length > 0) {
          var renderInitial =
            this.collection.slice(0, this.scrollOptions.chunkSize);
          this.scrollOptions.currentPage = 1;
          this.scrollOptions.loadAfter = 10;
          _.each(renderInitial, this.renderItem, this);
        }
        else {
          this.renderEmpty();
        }
      },
      // look at the current position of the scroll bar and determine
      // if we should render the next lot of results
      handleScroll: function(evt) {
        var currentPosition, nextRenderPoint;
        currentPosition = $(evt.currentTarget).scrollTop();
        nextRenderPoint = 
          this.scrollOptions.loadAfter * this.scrollOptions.listElementHeight;
        
        if (currentPosition > nextRenderPoint) {
          this.renderNextChunk();
        }
      },

      // render the next chunk of results
      renderNextChunk: function() {
        var slice, start, end;
        this.scrollOptions.loadAfter =
          this.scrollOptions.loadAfter + this.scrollOptions.chunkSize;
        start = this.scrollOptions.currentPage * this.scrollOptions.chunkSize;
        end   = start + this.scrollOptions.chunkSize;
        slice = this.collection.slice(start, end);
        _.each(slice, this.renderItem, this);
        this.scrollOptions.currentPage = this.scrollOptions.currentPage + 1;
      }

  };

  return ScrollViewMixin;
  
});
