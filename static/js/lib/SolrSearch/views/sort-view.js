/*global define*/
// Author: Cormac McGuire
// ### Description
// Show the sort headers and send sort request events

define (
  [
    'underscore', 'backbone', 'jquery',
    'lib/streams',
    'lib/SolrSearch/templates/sort/sort.tpl',
    'lib/SolrSearch/templates/sort/sort-actors.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (_, Backbone, $, Streams, sortTmp, sortActorTmp, i18n) {
    'use strict';
    var createTypeFilter, filterSort, createNavProperty, searchBus, navBus,
    extractResults, getSortType, combineBoth, filterExecuteAction;
    
    // STREAM PROCESSING
    searchBus = Streams.searchBus;
    navBus = Streams.navBus;
    createTypeFilter = Streams.filterLib.createTypeFilter;
    filterSort = createTypeFilter('filter_view');
    createNavProperty = function() {
      var mapNav = function(value) {
        return { navValue: value.content.entity };
      };
      return navBus.toEventStream()
                   .map(mapNav);
    };
    extractResults = function(value) {
      return value.content;
    };

    getSortType = function(value) {
      return {
        option: value.sort,
        direction: value.direction
      };
    };
    // used to combine nav and action combo events  
    // this should be edited to use the type/content format
    combineBoth = function(previous, newValue) {
      if (newValue.hasOwnProperty('navValue')) {
        previous.navValue = newValue.navValue;
        previous.action = false;
      }
      if (newValue.hasOwnProperty('option')) {
        previous.option = newValue.option;
        previous.action = true;
        previous.direction = newValue.direction;
      }
      return previous;
    };
    filterExecuteAction = function(value) {
      return value.action === true;
    };

    // VIEW

    var SortView = Backbone.View.extend({
      el: 'tr.filters',
      eventIdentifier: 'filter_view',
      templateMap: function (navValue) {
        var templateMapping = {
          actor     : sortActorTmp,
          incident  : sortTmp,
          bulletin  : sortTmp
        };
        return navValue !== undefined ? templateMapping[navValue] : templateMapping.bulletin;
      },
      events: {
        'click a': 'preventNav',
        'click .date': 'sortDate',
        'click .location': 'sortLocation',
        'click .age': 'sortAge',
        'click .title': 'sortTitle',
        'click .sort-status': 'sortStatus',
        'click .sort-score': 'sortScore'
      },

      currentSort: '',
      direction: 'descending',

      initialize: function() {
        this.watchSortEvents();
        this.watchNavEvents();
        this.render();
      },
      preventNav: function(evt) {
        evt.preventDefault();
      },

      // handle sort events from headers
      sortDate: function(evt) {
        this.sendSortEvent('date', evt.currentTarget);
      },
      sortLocation: function(evt) {
        this.sendSortEvent('location', evt.currentTarget);
      },
      sortAge: function(evt) {
        this.sendSortEvent('age', evt.currentTarget);
      },
      sortTitle: function(evt) {
        this.sendSortEvent('title', evt.currentTarget);
      },
      sortStatus: function(evt) {
        this.sendSortEvent('status', evt.currentTarget);
      },
      sortScore: function(evt) {
        this.sendSortEvent('score', evt.currentTarget);
      },



      getDirection: function(requestedSort, currentDirection) {
        var newDirection, directions;
        directions = ['ascending', 'descending'];
        
        if (requestedSort === this.currentSort) {
          newDirection = _.chain(directions)
                  .without(currentDirection)
                  .last()
                  .value();
        }
        else {
          newDirection = 'descending';
        }
        return newDirection;

      },

      sendSortEvent: function(sortEventName, el) {
        this.direction = this.getDirection(sortEventName, this.direction);
        this.handleFilter(el);
        this.currentSort = sortEventName;
        Streams.searchBus.push({
          type: this.eventIdentifier,
          content: {
            sort: this.currentSort,
            direction: this.direction
          }
        });
      },

      // watch for nav to actor - swap out sort headers when change to and from
      watchNavEvents: function() {
        var self = this;
        var filterMap = {
          actor: 'age',
          bulletin: 'location',
          incident: 'location'
        };
        createNavProperty()
          .onValue(function(value) {
            if (self.navValue !== value.navValue) {
              self.navValue = value.navValue;
              self.render();
            }
          });
      },

      watchSortEvents: function() {
        var self = this;

        var selectStream = Streams.searchBus.toEventStream()
                           .filter(filterSort)
                           .map(extractResults)
                           .map(getSortType);

        var both = selectStream.merge(createNavProperty());
        var watcher = both.scan({
                            type: self.eventIdentifier + '_combined'
                          }, combineBoth);
        watcher.filter(filterExecuteAction)
               .onValue(function(value) {
                  Streams.searchBus.push(value);
                });

      },

      // add / remove classes to the html elements based on item selected
      // and the direction of the sort
      handleFilter: function(el) {
        $(el).parent()
             .siblings()
             .children()
             .removeClass('current')
             .removeClass('is-descending')
             .removeClass('is-ascending');

        $(el).parent()
             .children()
             .removeClass('current')
             .removeClass('is-descending')
             .removeClass('is-ascending');

        $(el).addClass('current').addClass('is-' + this.direction);
      },
      render: function() {
        this.template = this.templateMap(this.navValue);
        var html = this.template({
          navValue: this.navValue,
          i18n: i18n
        });
        this.$el.empty()
                .append(html);
      }
    });

    return SortView;
});
