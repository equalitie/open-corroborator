/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a single event
//

define (
  [
    'backbone', 'underscore', 'jquery',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/data/EventCollection',
    'lib/CRUD/templates/display-templates/events/event-container.tpl',
    'lib/CRUD/templates/display-templates/events/event.tpl',
    'i18n!lib/CRUD/nls/dict'

  ],
  function (Backbone, _, $, CollectionViews, Event, eventContainerTmp, eventTmp, i18n) {
    'use strict';

    var EventListView,
        EventView,
        EventModel = Event.EventModel,
        ListView = CollectionViews.ListView,
        ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView;


    EventView = ModelView.extend({
      templateVars: {
        i18n: i18n
      },
      template: eventTmp,
      className: 'event-display'
    });

    // ### EventContainerView
    // 
    EventListView = ListLoadView.extend({
      templateVars: {
        i18n: i18n
      },
      modelType: EventModel,
      childView: EventView,
      childViews: [],
      fieldType: 'events',
      className: 'event-display-list',
      containerTmp: eventContainerTmp,

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }

    });


    
    return EventListView;
});



