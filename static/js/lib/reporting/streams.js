/*global window, document, define */
// Author: Cormac McGuire  
// combine graph and filter events, to trigger solr searches that load the graphs
//

define(
  ['underscore', 'backbone', 'lib/streams'],
  function(_, Backbone, Streams) {
    'use strict';
    var selectedBulletinFilters = new Backbone.Collection(),
        selectedActorFilters = new Backbone.Collection(),
        selectedIncidentFilters = new Backbone.Collection(),
        // store the current selected graph type
        selectedGraph,

        // map entity types to filter collections
        graphMap = {
          bulletin: selectedBulletinFilters,
          incident: selectedIncidentFilters,
          actor: selectedActorFilters,
          user: {}
        },

        // create a filter function
        createFilter = function (filter) {
          return function(value) {
            return value.type === filter;
          };
        },
        // create a filter function to add filter events per entity
        createTypeFilter = function(entity) {
          return createFilter('filter_event_add_' + entity);
        },
        // graph type selected, combine the graph type data with stored filters
        combineGraphData = function(value) {
          // store the selected graph, so that filters can trigger a new graph
          selectedGraph = value.content;
          var entity = value.content.get('entity');
          return {
            filters: graphMap[value.content.get('entity')],
            key: value.content.get('key'),
            label: value.content.get('label'),
            type: value.content.get('type'),
            user_id: value.content.get('user_id')
          };

        },
        // filter selected, combine filter data with selected graph type data
        combineFilterData = function (value) {
          var filters = (new Backbone.Collection(value.content)) ||  undefined;
          try {
            return {
              filters: filters,
              key: selectedGraph.get('key'),
              label: selectedGraph.get('label'),
              type: selectedGraph.get('type')
            };
          }
          catch (e) {
            return {
              error: 'no graph selected',
              filters: value.content
            };
          }
          
        },

        // send the event that will be picked up to generate the request for
        // required graph data
        sendGraphEvent = _.debounce(function(value) {
          Streams.searchBus.push({
            type: 'request_graph_data',
            content: value
          });
        }, 200),
        // store the filters for the specified entity, if defined
        storeFiltersAndSendGraphEvent = function(value, entity) {
          graphMap[entity].reset(value.filters.toJSON());
          if (value.error === undefined) {
            sendGraphEvent(value);
          }
        },

        // returns a function that creates a watcher for the specified entity
        createFilterWatcher = function(entity) {
          return function() {
            Streams.searchBus.filter(createTypeFilter(entity))
                             .debounce(750)
                             .map(combineFilterData)
                             .onValue(function(value) {
                               storeFiltersAndSendGraphEvent(value, entity);
                             });
          };
        },

        // create stream watchers for filter clicks on bulletins incidents
        // and actors, each selection will store the filters and trigger a 
        // graph creation event
        createEntityFilterWatchers = function () {
          var entities = ['bulletin', 'incident', 'actor'];
          _(entities).each(function(entity) {
            var filterWatcher = createFilterWatcher(entity);
            filterWatcher();
          });
          
        },
        // watch for graph type selection events, trigger a graph creation
        // event
        graphTypeWatcher = function() {
          Streams.searchBus.filter(createFilter('graph'))
                           .map(combineGraphData)
                           .onValue(function(value) {
                             sendGraphEvent(value);
                           });
        };


    // combine events from filters and graph type selections, to prepare for
    // sending to the solr query builder
    var graphStreamCombiner = function() {
      createEntityFilterWatchers();
      graphTypeWatcher();
    };
    graphStreamCombiner();
  }
);
