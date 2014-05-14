/*global Bootstrap, define, parseInt*/
// Author: Cormac McGuire
// ### Listen for user graph events send requests to django to generate the user graphs
// 

define(
  [
    'jquery', 'underscore', 'moment',
    'lib/streams',
    'lib/Data/LocationCollection',
    'lib/reporting/data/graph-types'
  ],
  function($, _, moment, Streams, LocationCollection, GraphTypes) {
    'use strict';
    var userGraphs = GraphTypes.userGraphs,
        allGraphs = GraphTypes.allGraphs,
        locationCollection = new LocationCollection.LocationCollection(),
        selectGraphTypeFromKey = GraphTypes.selectGraphTypeFromKey,
        graphFilter = function(value) {
          return value.type === 'parse_graph_data';
        },

        timeSeriesMapper = function(key) {
          return allGraphs.findWhere({key: key}).get('label');
        },

        getFromUri = function(key) {
            return function(filterKey, uri) {
              var searchField = {resource_uri: uri};
              return _.findWhere(Bootstrap[key], searchField).name;
            };
        },

        mapKeyToLabel = function(key, label) {
          var graphModel = allGraphs.findWhere({key: key}),
              labelFunctionMap = {
                actor_searchable_current_exact: getFromUri('locations'),
                bulletin_searchable_locations_exact: getFromUri('locations'),
                incident_searchable_locations_exact: getFromUri('locations'),
                bulletin_created_date: timeSeriesMapper,
                actor_created: timeSeriesMapper,
                incident_created_date: timeSeriesMapper,
                most_recent_status_actor_exact: getFromUri('all_statuses'),
                most_recent_status_incident_exact: getFromUri('all_statuses'),
                most_recent_status_bulletin_exact: getFromUri('all_statuses'),
                bulletin_labels_exact: getFromUri('labels'),
                incident_labels_exact: getFromUri('labels'),
                incident_crimes_exact: getFromUri('crimes'),
                bulletin_sources_exact: getFromUri('sources')

              };

          if ( _(labelFunctionMap).chain().keys().contains(key).value() ) {
            graphModel.set('label', labelFunctionMap[key](key, label));
          }
          else {
            graphModel.set('label', label);
          }
          return graphModel;
        },


        pieBarMapping = function(rawSolrData, key) {
          var graphModel = allGraphs.findWhere({key: key}),
              parsedData = {
                values: (function() {
                  return _(rawSolrData).reduce(function(prevVal, item, label){
                    graphModel = mapKeyToLabel(key, label);
                    return prevVal.concat({
                      label: graphModel.get('label'),
                      yAxisLabel: graphModel.get('yAxisLabel'),
                      value: item
                    });
                    // could be made only execute for numerical labels
                  }, []).sort(function(a, b) {
                    return parseInt(a.label, 10) - parseInt(b.label, 10);
                  });
                }())
              };
              parsedData.title = graphModel.get('title');
              return parsedData;
        },

        // return an object with format like:
        // lib/reporting/test/test-data: trendData
        // this is kind of gross and only maps for one trend line
        trendMapping = function(rawSolrData, key) { 
          if (_(rawSolrData).isObject()) {
            rawSolrData = [rawSolrData];
          }
          var graphModel = mapKeyToLabel(key),
              singleEntityValues = function(valueList) {
                 return {
                   key: graphModel.get('label'),
                   values: _(valueList).reduce(function(values, item, label) {
                     label = parseInt(moment(label).unix(), 10) * 1000;
                     return values.concat(
                       [{x:label, y:item}]
                     );
                   }, []).sort(function(a, b) {
                     return a.x - b.x;
                   })
                 };
              };
           
          return {
            title: graphModel.get('title'),
            values: rawSolrData.map(singleEntityValues),
            yAxisLabel: graphModel.get('yAxisLabel'),
            xAxisLabel: graphModel.get('xAxisLabel')
          };
          
        },


        graphTypeMap = {
          'bar': pieBarMapping,
          'pie': pieBarMapping,
          'trend': trendMapping
        },

        mapToParsedJsonData = function(value) {
          var type = selectGraphTypeFromKey(value.key),
              parsedData = graphTypeMap[type](value.content, value.key);
          parsedData.key = value.key;
          return parsedData;
        },
        sendGraphingRequest = function(value) {
          Streams.searchBus.push({
            type: 'request_graph_display',
            content: value
          });
        },
        startGraphListener = function() {
          Streams.searchBus.filter(graphFilter)
                           .map(mapToParsedJsonData)
                           .onValue(sendGraphingRequest);
        },
        init = function() {
          startGraphListener();
        };
  
    return {
      init: init,
      pieBarMapping: pieBarMapping,
      trendMapping: trendMapping,
      mapToParsedJsonData: mapToParsedJsonData
    };

  }
);
