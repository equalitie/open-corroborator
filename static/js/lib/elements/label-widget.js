/*global define*/
// Author: Cormac McGuire
// ### Description
// create a label widget that provides a free text input that can persist
// text entered to a specified collection and auto completes with existiong
// content

define (
  [
    'jquery', 'backbone', 'underscore',
    'lib/elements/select-option',
    'lib/elements/templates/label-widget.tpl',
    'lib/elements/templates/label.tpl'
  ],
  function ($, Backbone, _, SelectOptionView, labelWidgetTmp, labelTmp) {
    'use strict';

    var LabelWidgetView;

    // ### LabelView
    // display a single label
    var LabelView = Backbone.View.extend({
      tagName: 'li',
      className: 'tag',
      events: {
        'click .do-clear': 'removeFilter'
      },
      // constructor
      initialize: function(options) {
        this.render();
        this.listenTo(this.model, 'remove_selected', this.destroy.bind(this));
      },

      removeFilter: function() {
        this.collection.remove(this.model);
      },

      // destroy the view
      onDestroy: function() {
        this.stopListening();
      },

      // render a single filter
      render: function() {
        var html = labelTmp({
          model: this.model.toJSON(),
          content: this.content
        });
        this.$el.empty()
                .append(html);
      }
    });

    LabelWidgetView = Backbone.View.extend({
      events: {
        'click .drop-down-handle': 'toggleList'
      },
      selectCollection: undefined,
      displayCollection: undefined,
      selectViews: [],
      displayViews: [],
      // constructor 
      initialize: function(options) {
        if (options.entityType === undefined) {
          throw 'Exception: entityType undefined';
        }
        this.entityType = options.entityType;
        if (this.collection === undefined) {
          throw 'Widget view requires collection';
        }
        this.multiple = options.multiple;

        // TODO reset these with existing values
        this.selectCollection = new Backbone.Collection();

        this.bus = options.bus;
        this.eventIdentifier = options.eventIdentifier;

        // listend for add and remove events to the selected collection
        if (options.displaySelected !== false) {
          this.listenTo(this.selectCollection, 'add remove',
            this.renderSelected.bind(this));
        }

        this.listenTo(this.selectCollection, 'add',
          this.dispatchLabelAddedEvent.bind(this));

        this.listenTo(this.collection, 'deselect', function(model) {
          this.collection.add(model);
          this.selectCollection.remove(model);
        }.bind(this));

        this.listenTo(this.selectCollection, 'remove',
          this.dispatchLabelRemovedEvent.bind(this));
        
        // listen for add and remove events for the available collection
        this.listenTo(this.collection, 'add remove',
          this.initAutocomplete.bind(this));
        
        this.listenTo(this.collection, 'remove',
          this.externalSelect.bind(this));

        this.listenTo(this.collection, 'add',
          this.externalRemove.bind(this));

        this.listenTo(this.selectCollection, 'add remove',
          this.reinsertModel.bind(this));

        // populate existing content
        if (this.options.content !== undefined) {
          this.content = this.options.content;
          this.selectModelsFromResourceUri(this.content.values);
        }


        this.templateVars = {
          display: options.display,
          entityType: this.entityType,
          multiple: this.multiple
        };
        this.render()
            .renderSelected();
        this.initAutocomplete();
      },

      // open and close autocomplete results
      toggleList: function(evt) {
        evt.preventDefault();
        if (this.open === true) {
          this.closeList();
        }
        else {
          this.openList();
        }
      },
      // close the dropdown list
      closeList: function() {
        this.inputEl.focus();
        this.setIcon('d');
        this.open = false;
      },

      // set the dropdown icon
      setIcon: function(icon) {
        this.$el.children('ul')
                .children()
                .children('button')
                .children(':first-child')
                .attr('data-icon', icon);
      },

      // open the drop down list
      openList: function(evt) {
        this.setIcon('u');
        this.inputEl.autocomplete('search', this.inputEl.val());
        this.inputEl.focus();
        this.open = true;
      },

      // enable the autocomplete functionality
      initAutocomplete: function() {
        var autocompleteSrc = this.collection.autoCompleteFormat(),
            inputEl = this.$el.children('ul')
                              .children('li')
                              .children('input');
          inputEl.autocomplete({
          minLength: 0,
          source: autocompleteSrc,
          select: this.addToSelectedList.bind(this, inputEl),
          close: function() {
                   this.closeList();
                 }.bind(this)
        });
        this.inputEl = inputEl;
      },

      addToSelectedList: function(inputEl, evt, ui) {
        this.closeList();
        this.selectModelFromResourceUri(ui.item.id);
        $(inputEl).val('');
        return false;
      },

      selectModelsFromResourceUri: function(resourceUriList) {
        _.each(resourceUriList, this.selectModelFromResourceUri, this);
      },

      selectModelFromResourceUri: function(resourceUri) {
        var filterItemById = function(model) {
          return model.get('resource_uri') === resourceUri;
        };
        var selectedModel = this.collection.chain()
                                .filter(filterItemById)
                                .last()
                                .value();
        // remove the models form the select collection if this is a single
        // value field
        if (this.multiple === false) {
          this.selectCollection.each(function(model) {
            this.selectCollection.remove(model);
          }, this);
        }
        this.selectCollection.add(selectedModel);
        this.collection.remove(selectedModel);
      },


      reinsertModel: function(model) {
        this.collection.add(model);
      },

      
      onDestroy: function() {
        this.destroyChildViews();
        this.stopListening();
      },

      // tidy up
      destroyChildViews: function() {
        _.invoke(this.displayViews, 'destroy');
        _.invoke(this.selectViews, 'destroy');
        this.displayViews = [];
        this.selectViews  = [];
      },

      // push the add event out if a bus has been defined
      dispatchLabelAddedEvent: function(value) {
        this.dispatchLabelEvent({
          action: 'add',
          content: value
        });
      },
      // let the world know that we have removed a label
      dispatchLabelRemovedEvent: function(value) {
        this.dispatchLabelEvent({
          action: 'remove',
          content: value
        });
      },

      externalSelect: function(model) {
        
        var eventInfo = {
          content: model,
          action: 'add'
        };
        this.dispatchLabelEvent(eventInfo);
      },

      externalRemove: function(model) {
        var eventInfo = {
          content: model,
          action: 'remove'
        };
        this.dispatchLabelEvent(eventInfo);
      },

      // send the add/remove event out on the bus
      dispatchLabelEvent: function(eventInfo) {
        
        if (this.bus !== undefined) {
          this.bus.push({
            type: this.eventIdentifier + '_label_' + eventInfo.action,
            content: eventInfo.content
          });
        }
      },

      // render the 
      renderSelected: function() {
        this.destroyChildViews();
        this.selectCollection.each(this.addToDisplayList, this);
        this.selectCollection.each(this.addToSelectList, this);
        return this;
      },

      // add label view li to the ul in the view
      addToDisplayList: function(model) {
        var displayView = new LabelView({
          collection: this.selectCollection,
          model: model
        });
        this.$el.children('ul')
                .append(displayView.$el);
        this.displayViews.push(displayView);
      },

      // add a selected option to the hidden select element
      addToSelectList: function(model) {
        var selectOptionView = new SelectOptionView({
          model: model
        });
        this.$el.children('select')
                .append(selectOptionView.$el);
        this.selectViews.push(selectOptionView);

      },

      // render the container view
      render: function() {
        var html = labelWidgetTmp(this.templateVars);
        this.$el.empty()
                .append(html);
        return this;

      }
    });

    return LabelWidgetView;
});


