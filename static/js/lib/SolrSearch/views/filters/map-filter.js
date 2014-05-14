/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a map view that sends off lat lng co-ordinates

define (
  [
    'backbone', 'jquery', 'underscore', 'leaflet',
    'lib/streams',
    'lib/Data/LocationCollection',
    'lib/elements/label-widget',
    'lib/CRUD/views/map-view',
    'lib/SolrSearch/templates/filters/map-container.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (Backbone, $, _, L, 
    Streams, Location, LabelWidget, CoordinateDisplayView, 
    mapContainerTmp, 
    i18n) {
    'use strict';

    var searchBus = Streams.searchBus,
        LocationCollection = new Location.LocationCollection(),
        filterAddLocationFilters, filterLocationFilters, filterRemoveFilters,
        MapFilterGroupView,
        MapPopupMixin,
        CoordinatePopupDisplayView = CoordinateDisplayView;

    var locationFilterKeys = [
      //'actor_searchable_pob_exact',
      'actor_searchable_current_exact',
      'bulletin_searchable_locations_exact',
      'incident_searchable_locations_exact'
    ];

    filterAddLocationFilters = function(value) {
      var locationFilterKeysLabelEvents = locationFilterKeys.map(function(value) {
        return value + '_label_add';
      });
      return _.contains(locationFilterKeysLabelEvents, value.type);
    };

    filterRemoveFilters = function(value) {
      return value.type === 'remove_filter';
    };
    filterLocationFilters = function(value) {
      return _.contains(locationFilterKeys, value.content.get('key'));
    };


    MapPopupMixin = {
      // callback fired when a location gets added
      placeMarker: function(model) {
        var marker, latlng, lat, lng, popupTextTmpEn, numResults,
            additionalText;
        lat = model.get('latitude'); 
        lng = model.get('longitude');
        if (lat && lng) {
          latlng = [lat, lng];
          marker = this.createMarker(latlng);
          //access directly to avoid change event
          model.attributes.marker = marker;
          if (model.get('numItems')) {
            numResults = _.template(i18n.filters.num_results);
            additionalText = numResults({numItems: model.get('numItems')});
          }
          this.addPopup(model, additionalText);
        }
      },

      addPopup: function (model, additionalText) {
        additionalText = additionalText || '';
        var popupTextTmpEn, popupTextTmpAr, marker;
        marker = model.get('marker');
        popupTextTmpEn = _.template(
          '<b><%=model.name%></b><br/>' + additionalText); 
        marker.bindPopup(popupTextTmpEn({model: model.toJSON()})).openPopup();
      }
    };

    _.extend(CoordinatePopupDisplayView.prototype, MapPopupMixin);
    

    // ### MapFilterGroupView
    // Display a drop down and map for each of the locations
    MapFilterGroupView = Backbone.View.extend({
      template: mapContainerTmp,
      childViews: [],
      subscribers: [],
      filterTitleTemplates: {},
      initialize: function(options) {
        this.listenTo(this, 'appended', this.render.bind(this));
        this.initSubscribers();
        this.entityType = options.entityType;
        this.collection = this.model.get('collection');
        this.filterTitleTemplates = options.filterTitleTemplates;
      },
      // listen for filter add / remove events and send them on to solr
      initSubscribers: function() {
        this.subscribers.push(
          searchBus.toEventStream()
                   .filter(filterAddLocationFilters)
                   .subscribe(this.filterRequested.bind(this)),
          searchBus.toEventStream()
                   .filter(filterRemoveFilters)
                   .filter(filterLocationFilters)
                   .subscribe(this.removeFilterRequested.bind(this)));
      },

      filterRequested: function(evt) {
        var model = evt.value().content;
        searchBus.push({
          type: 'filter_event_' + model.get('type'),
          content: {
            filter: model
          }
        });
      },
      removeFilterRequested: function(evt) {
        var model = evt.value().content;
        if (this.collection.groupKey === model.get('key')) {
          this.collection.trigger('deselect', evt.value().content);
        }
      },

      getLabelConfig: function() {
        return {
          containerid: '#' + this.model.get('groupKey') + '-location-dropdown',
          collection : this.collection,
          multiple: true,
          bus: searchBus,
          eventIdentifier: this.model.get('groupKey'),
          display: {
            field_name : this.model.get('groupKey'),
            field_label: i18n.filters[this.model.get('groupKey')]
          }
        };
      },
      getMapConfig: function() {
        return {
          containerid: '#' + this.model.get('groupKey') + '-location-map',
          locationSource: this.model.get('groupKey') + '_label',
          bus: searchBus
        };
      },
      onDestroy: function() {
        _(this.childViews).invoke('destroy');
        this.stopListening();
      },
      render: function() {
        this.renderContainer()
            .renderChildren();
      },
      enableMapField: function(field) {
        var mapView = new CoordinatePopupDisplayView({
          el: field.containerid,
          locationSource: field.locationSource,
          bus: field.bus
        });
        this.childViews.push(mapView);
        return this;
      },
      enableLabelField: function(field) {
        //debugger;
        var labelWidget = new LabelWidget({
          entityType     : this.entityType,
          collection     : field.collection,
          el             : field.containerid,
          display        : field.display,
          content        : field.content,
          multiple       : field.multiple,
          bus            : field.bus,
          eventIdentifier: field.eventIdentifier,
          displaySelected: false
        });
        this.childViews.push(labelWidget);
        return this;
      },
      // hack to make stupid map view work
      sendResizeEvent: function() {
        _.each(this.childViews, function(view) {
          view.trigger('resize');
        });
      },
      renderContainer: function() {
        if (this.collection.length > 0) {
          var html = this.template({
            i18n: i18n,
            model: this.model.toJSON()
          });
          this.$el.append(html);
        }
        return this;
      },
      renderChildren: function() {
        if (this.collection.length > 0) {
          this.enableLabelField(this.getLabelConfig())
              .enableMapField(this.getMapConfig())
              .sendResizeEvent();
        }
        return this;
      }
    });


    return MapFilterGroupView;
});
