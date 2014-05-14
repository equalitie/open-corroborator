/*global window, define, console */

// Author: Cormac McGuire
// ### input.js
// represent an input field, reacts to the enter button being pressed
// when focus is on the input by sending the content of the input box
// into the search Stream
// 
// When creating an instance of the view, you can either pass in the element to
// watch or have one rendered.

define(
  [
    'jquery', 'underscore', 'backbone', 'bacon',
    'lib/streams',
    'bacon_ui'
  ],
  function ($, _, Backbone, Bacon, Streams) {
    'use strict';
    var searchBus = Streams.searchBus;
    // ## InputView
    // Declare the view that will describe our input field
    var InputView = Backbone.View.extend({
      // declare the events that we will listen for
      events:{
        'keyup input': 'pressed',
        'click .do-clear': 'clearInput'
      },
      // constructor  
      // create our template function
      initialize: function(options) {
        this.createProperty();
        this.template = _.template('<input type="textfield">');
        this.listenForSearchString();
      },

      // clear the contents of the input box
      clearInput: function() {
        this.$el.children('input').val('');
        this.sendText('');
      },
      getInput: function() {
        var inputText = this.$el.children('input').val();
        return {
          raw: inputText,
          encoded: inputText
        };
      },
      listenForSearchString: function() {
        var filter = Streams.filterLib.createTypeFilter('predefined_search');
        searchBus.filter(filter)
                 .map(function(value) {
                   return value.content.get('search_string');
                 })
                 .onValue(this.setInput.bind(this));

      },
      setInput: function(val) {
        this.$el.children('input').val(val);
      },
      

      // create a property to track the text in the search box
      // map the content to an object that contains the raw and encoded text
      createProperty: function() {
        this.textProperty = Bacon.UI.textFieldValue(this.$el.children('input'))
          //.map(this.textLength)
          .map(function(inputText) {
            return {
              raw: inputText,
              encoded: inputText
            };
          })
          .debounce(300);
      },
      // check the length of the text
      // only send the search if the text is longer than 3 chars
      textLength: function(text) {
        if (text.length > 3) {
          return text;
        }
        return '';
      },
      // catch the keyup event
      // send the search when enter is pressed
      pressed: function(e) {
        if (e.keyCode === 13) {
          this.sendText(this.$el.children('input').val());
        }
      },
      // dispatch event with contents of the input field
      // deprecated - we are using event streams
      sendText: function(inputText) {
        var textToSend = {
          raw: inputText,
          encoded: inputText
        };
        searchBus.push({
          type: 'search_updated',
          content: textToSend
        });

      },
      // render the input field
      render: function() {
        var html = this.template();
        this.$el.append(html);
        return this;
      }
    });
    // expose our view as a module export
    return InputView;
});
