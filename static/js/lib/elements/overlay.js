/*global define, document, window*/
// Author: Cormac McGuire
// ### Description
// Create an overlay for forms while they are saving

define (
  [
    'jquery', 'underscore'//, 'spin'
  ],
  function ($, _/*, Spinner*/) {
    'use strict';

    var OverlayManager = function(options) {
      this.setDefaults(options);
      this.setStyles();
    };

    var prototypeFunctions = {
      defaults: {
        $overlayEl: $('<div id="osfosfj-form-cover"></div>'),
        widthOffset: 0,
        color: 'black',
        successText: 'Saved!',
        errorText: 'Save Failed'
      },
      completedCallback: function() {
      },

      setDefaults: function(options) {
        this.defaults = _.defaults(options, this.defaults);
        _.each(this.defaults, function(value, key) {
          this[key] = value;
        }, this);
        delete(this.defaults);
      },

      setStyles: function() {
        this.$overlayEl.height(this.$targetEl.height());
        this.$overlayEl.width(this.$targetEl.width() - this.widthOffset);
        this.$overlayEl.css('opacity', '0.5');
        this.$overlayEl.css('z-index', '2000');
        this.$overlayEl.css('background-color', 'black');
      },
      hideOverlay: function() {
        this.completedCallback();
        this.$overlayEl.removeData().unbind();
        this.$overlayEl.children().remove();
        this.$overlayEl.remove();
      },

      displayCompletedText: function(message) {
        var $savedTextEl = $('<p>' + message + '</p>');
        $savedTextEl.css('color', 'white');
        $savedTextEl.css('text-align', 'center');
        $savedTextEl.css('font-size', '18px');
        this.$overlayEl.append($savedTextEl);
        $savedTextEl.position({
          my: "center center",
          at: "center center",
          of: this.$overlayEl
        });

      },

      displayError: function(completedCallback) {
        this.displayCompletedText(this.errorText);
        this.completedCallback = completedCallback;
        window.setTimeout(this.hideOverlay.bind(this), 500);
      },

      displaySaved: function(completedCallback) {
        this.displayCompletedText(this.successText);
        this.completedCallback = completedCallback;
        window.setTimeout(this.hideOverlay.bind(this), 500);
      },

      showOverlay: function() {
        this.$targetEl.append(this.$overlayEl);
        this.$overlayEl.position({
          my: "left top",
          at: "left top",
          of: this.$targetEl
        });
      }
      
    };

    _.extend(OverlayManager.prototype, prototypeFunctions);

    return OverlayManager;
});

