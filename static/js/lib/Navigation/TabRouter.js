/*global define, Bootstrap */
// Author: Cormac McGuire  
// ### TabRouter
// 
// Backbone Router  
// handles clicks on the three tabs and sends messages into the navStream
// defined in streams.js based on this  
//
// TODO: handle bogey urls

define(
  [
    'jquery', 'backbone', 'underscore',
    'lib/streams',
    'lib/Data/collections',
    'lib/Navigation/helpers/home-search-builder'
  ],
  function($, Backbone, _, Streams, Collections, HomeSearchBuilder) {
    'use strict';
    var tabRouter,
        navBus = Streams.navBus,
        searchBus = Streams.searchBus,
        tabView,
        getSearchModel = HomeSearchBuilder.getSearchModel,

        filterTabNav = function(value) {
          return value.type === 'navigate';
        },
        filterEntityNav = function(value) {
          return value.type === 'entity-display';
        },

        // convert tab link argument to element
        convertToElement = function(value) {
          return  'li.is-' + value.content.entity + 's';
        };

    // ## TabRouter
    //
    // handle tab clicks
    // push an event to the navBus when the user clicks on a tab or a result  
    //
    // For the initial navigate if a user is on an individual result
    // we also want to open the filters and results at this point
    var TabRouter = Backbone.Router.extend({
      routes: {
        ''                             : 'showHomeSearch',
        'tab/:section'                 : 'openSection',
        'bulletin/:bulletinId'         : 'openBulletin',
        'bulletin/'                    : 'openBulletinSection',
        'incident/'                    : 'openIncidentSection',
        'actor/'                       : 'openActorSection',
        'bulletin/:bulletinId/'        : 'openBulletin',
        'bulletin/:bulletinId/expanded': 'openBulletinExpanded',
        'incident/:incidentId'         : 'openIncident',
        'incident/:incidentId/'        : 'openIncident',
        'incident/:incidentId/expanded': 'openIncidentEpanded',
        'actor/:actorId'               : 'openActor',
        'actor/:actorId/'              : 'openActor',
        'actor/:actorId/expanded'      : 'openActorExpanded'
      },
      initialize: function() {
        this.watchForResultNav();
      },
      watchForResultNav: function() {
        var unsub = 
          navBus.toEventStream()
                .filter(filterEntityNav)
                .subscribe(this.navigateToSection.bind(this));
        this.unsubNavSubscriber = _.once(unsub);
      },

      navigateToSection: function(evt) {
        this.openSection(evt.value().entity);
      },

      showHomeSearch: function() {
        this.openSection();
        searchBus.push({
          type: 'predefined_search',
          content: getSearchModel()
        });
      },
      openSection: function(section) {
        this.unsubNavSubscriber();
        section = section === undefined ? 'incident': section;
        navBus.push({
          type: 'navigate',
          content: {
            entity: section
          }
        });
      },
      openActorSection: function() {
        this.openSection('actor');
      },
      openBulletinSection: function() {
        this.openSection('bulletin');
      },
      openIncidentSection: function() {
        this.openSection('incident');
      },

      isValid: function(id) {
        id = parseInt(id, 10);
        return (_.isNaN(id) === false);
      },

      openBulletin: function(bulletinId) {
        if (this.isValid(bulletinId))
          this.openEntity('bulletin', bulletinId);
      },
      openBulletinExpanded: function(bulletinId) {
        if (this.isValid(bulletinId))
          this.openEntity('bulletin', bulletinId, true);
      },
      openIncident: function(incidentId) {
        if (this.isValid(incidentId))
          this.openEntity('incident', incidentId);
      },
      openIncidentEpanded: function(incidentId) {
        if (this.isValid(incidentId))
          this.openEntity('incident', incidentId, true);
      },
      openActor: function(actorId) {
        if (this.isValid(actorId))
          this.openEntity('actor', actorId);
      },
      openActorExpanded: function(actorId) {
        this.openEntity('actor', actorId, true);
      },
      openEntity: function(type, id, expanded) {
        expanded = expanded || false;
        navBus.push({
          type: 'entity-display',
          content: {
            entity: type,
            expanded: expanded,
            id    : id
          }
        });
      }

    });

    // ## TabView
    //
    // This represents the three tabs  
    // It simply sets the current class on the last clicked  
    // tab, in response to a navigation change in the router above  
    // display the total results for each bulletin/actor/incident
    var TabView = Backbone.View.extend({
      el: '.tabs ul',
      initialize: function() {
        Streams.navBus.toEventStream()
                      .toProperty()
                      .filter(filterTabNav)
                      .map(convertToElement)
                      .onValue(this.updateTabClass);
        this.watchCollectionCounts();
        this.initCollectionCounts();
      },
      initCollectionCounts: function() {
        this.setCollectionCount('bulletin', Collections.BulletinCollection.numFound);
        this.setCollectionCount('actor', Collections.ActorCollection.numFound);
        this.setCollectionCount('incident', Collections.IncidentCollection.numFound);
      },
      setCollectionCount: function(entity, count) {
        $('.' + entity + '-count').empty().append(count);
      },
      // bind to the three main collections and update the counts when they
      // change
      watchCollectionCounts: function() {
        Collections.BulletinCollection.on('add destroy reset', function() {
          this.setCollectionCount('bulletin', Collections.BulletinCollection.numFound);
        }, this);
        Collections.ActorCollection.on('add destroy change reset', function() {
          this.setCollectionCount('actor', Collections.ActorCollection.numFound);
        }, this);
        Collections.IncidentCollection.on('add destroy reset', function() {
          this.setCollectionCount('incident', Collections.IncidentCollection.numFound);
        }, this);
      },

      // update the class on the current tab
      updateTabClass: function(el) {
        $(el).siblings().removeClass('current');
        $(el).addClass('current');
      }

    });

    var startHistory = _.once(function() {
      Backbone.history.start({
        root: 'tabs/incident'
      });
    });

    // init function  
    // create our objects
    var init = function(navBus) {
      tabView = new TabView();
      tabRouter = new TabRouter({navBus: navBus});
      startHistory();
      return tabRouter;
    };

    var getTabRouter = function() {
      return tabRouter;
    };

    return {
      init: init,
      getTabRouter: getTabRouter
    };
  }
);
