/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a map view that sends off lat lng co-ordinates

define (
  [
    'backbone', 'jquery', 'underscore', 'leaflet',
    'lib/streams',
    'lib/Data/LocationCollection',
    'lib/CRUD/templates/map-container.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, $, _, L, Streams, Location, mapContainerTmp, i18n) {
    'use strict';

    var CoordinateDisplayView,
        searchBus = Streams.searchBus,
        api_key = 'e76611fbacfb4bb2a8709c6e51201048',
        start_lat = 34.83392,
        start_long = 35.4541,
        LocationCollection = Location.LocationCollection,
        filterLocationAdded, filterLocationRemoved;

    // ### CoordinateDisplayView
    // Display a map that allows the user to pick a locations
    CoordinateDisplayView = Backbone.View.extend({
      className: 'is-map',
      tagName: 'div',
      subscribers: [],
      initialize: function(options) {
        this.listenTo(this, 'resize', this.updateMapSize.bind(this));
        this.locationSource = options.locationSource;
        this.collection = options.collection;
        this.bus = options.bus;
        this.content = options.content;
        this.createCollection()
            .addCollectionListeners()
            .createFilters()
            .registerSubscribers()
            .render()
            .displayMap();
        // allow for creation of onInitialize function that will be called at the end of initialize
       // no-op if it doesn't exist
        var constructorExt = this.onInitialize !== undefined ?
          this.onInitialize : function() {};
        constructorExt();
      },

      updateMapSize: function() {
        this.map.invalidateSize(false);
      },

      // create a collection that will store the currently rendered markers
      createCollection: function() {
        this.collection = new LocationCollection(this.content);
        return this;
      },
      // and attach event listeners to it to render and unrender them as they
      // get added and removed
      addCollectionListeners: function() {
        this.listenTo(this.collection, 'change', this.placeMarker.bind(this));
        this.listenTo(this.collection, 'add', this.placeMarker.bind(this));
        this.listenTo(this.collection, 'remove', this.removeMarker.bind(this));
        return this;
      },


      // create the filter functions that will be used to add pins to 
      // the map
      createFilters: function() {
        if (this.locationSource) {
          filterLocationAdded = function(value) {
            return value.type === this.locationSource + '_add';
          }.bind(this);
          filterLocationRemoved = function(value) {
            return value.type === this.locationSource + '_remove';
          }.bind(this);
        }
        return this;
      },
      // register our listeners to the event bus
      registerSubscribers: function() {
        if (this.bus) {
          var addSub, removeSub;
          addSub = this.bus.toEventStream()
                           .filter(filterLocationAdded)
                           .subscribe(this.addLocation.bind(this));

          removeSub = this.bus.toEventStream()
                              .filter(filterLocationRemoved)
                              .subscribe(this.removeLocation.bind(this));
          this.subscribers.push(addSub, removeSub);
        }
        return this;
      },

      // remove subscribers and any extraneous map shizzle
      onDestroy: function() {
        //console.log('onDestroy', this.subscribers.length);

        this.stopListening();
        //TODO figure out why map views get added to forms twice
        //_.each(this.subscribers,function(unsub) {unsub();});
        this.subscribers = [];
        delete(this.subscribers);
      },

      // add a new location to the collection
      addLocation: function(evt) {
        this.collection.add(evt.value().content);
      },

      // add a new location to the collection
      removeLocation: function(evt) {
        this.collection.remove(evt.value().content);
      },

      // display a map centred on syria  
      // create a map attribute on the view object
      displayMap: function() {
        var mapElement, map, zoom_level, tileLayerUrl;
        // set the map options
        mapElement  = this.$el.children('.map').children().get(0);
        zoom_level  = 5;
        tileLayerUrl = 'http://{s}.tile.cloudmade.com/' + api_key + '/997/256/{z}/{x}/{y}.png';

        // create the map
        map = L.map(mapElement, {
          scrollWheelZoom: false
        })
        .setView([start_lat, start_long], zoom_level);
                  
        // add the tile layer that will hold our markers
        L.tileLayer(tileLayerUrl, {
            maxZoom: 18
        }).addTo(map);

        this.map = map;
      },

      // callback fired when a location gets added
      placeMarker: function(model) {
        var marker, latlng, lat, lng;
        lat = model.get('latitude'); 
        lng = model.get('longitude');
        if (lat && lng) {
          latlng = [lat, lng];
          marker = this.createMarker(latlng);
          model.attributes.marker = marker;//access directly to avoid change event
        }
      },

      // create a marker and add it to the map
      createMarker: function (latlng) {
        var marker = L.marker(latlng, {
          draggable: false,
          riseOnHover: true
        })
        .addTo(this.map);
        return marker;
      },

      // callback fired when location gets removed from the collection
      removeMarker: function(model) {
        var marker = model.get('marker');
        this.destroyMarker(marker);
      },

      // remove the marker from the map
      destroyMarker: function(marker) {
        this.map.removeLayer(marker);
      },

      // render the map container
      render: function() {
        var html = mapContainerTmp({
         i18n: i18n 
        });
        this.$el.append(html)
                .addClass(this.className);
        return this;
      }
    });

    return CoordinateDisplayView;
});
