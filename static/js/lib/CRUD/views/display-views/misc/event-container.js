/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the related events

define (
  [
    'backbone', 'lib/elements/views/CollectionViews',
    'lib/CRUD/data/EventCollection',
    'lib/CRUD/templates/display-templates/events/event.tpl',
    'lib/CRUD/templates/display-templates/events/event-container.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  /**
   *   
   */
  function (Backbone, CollectionViews, Event, eventTmp, eventContainerTmp, i18n) {
    'use strict';
    var EventListView, EventView,
        EventModel = Event.EventModel,
        ListView = CollectionViews.ListView,
        ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView;

    EventView = ModelView.extend({
      templateVars: {
        i18n: i18n
      },
      template: eventTmp
    });

    EventListView = ListLoadView.extend({
      templateVars: {
        i18n: i18n
      },
      modelType: EventModel,
      childView: EventView,
      childViews: [],
      fieldType: 'events',
      containerTmp: eventContainerTmp,

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }
    });

  return EventListView;    

});

