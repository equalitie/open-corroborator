/*global define*/
// Author: Cormac McGuire
// ### Show the graphs selected by the user
// 

define(
  [
    'underscore', 'backbone', 
    'lib/streams',
    'lib/reporting/data/graph-types',
    'lib/reporting/views/pie-view',
    'lib/reporting/views/bar-view',
    'lib/reporting/views/trend-view'
  ],
  function(_, Backbone, Streams, GraphTypes, PieChartView, BarGraphView, TrendGraphView) {
  'use strict';
  var GraphViewManager,
      GraphView,
      filterGraphDisplayRequest = function(value) {
        return value.type === 'request_graph_display';
      },
      graphMap = {
        'pie': PieChartView,
        'bar': BarGraphView,
        'trend': TrendGraphView
      },
      tapper = function(value) {
        //console.log(value);
      },
      selectGraphType = function(graphKey) {
        return GraphTypes.allGraphs.chain()
                            .filter(function(graphModel) {
                              return graphModel.get('key') === graphKey;
                            })
                            .map(function(graphModel) {
                              return graphMap[graphModel.get('type')];
                            })
                            .first()
                            .value();

      };


  GraphViewManager = Backbone.View.extend({
    el: '#reporting-content .col.first',
    graphTpl: function() {
      return _.template('<div class="graphs"><h2><%=title %></h2></div>');
    },
    initialize: function(options) {
      this.listenForGraphRequests();
    },
    listenForGraphRequests: function() {
      Streams.searchBus.filter(filterGraphDisplayRequest)
                       .onValue(this.displayGraph.bind(this));
    },
    displayGraph: function(value) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.$el.children('.graphs').remove();

      this.$el.append(this.graphTpl()({title: value.content.title}));
      this.$el.children('.graphs').append('<svg></svg>');
      var ChartType = selectGraphType(value.content.key);

      this.chart = new ChartType({
        data: value.content
      });
    }

  });



  var init = function() {
    var graphViewManager = new GraphViewManager();
  };


  
  return {
    init: init
  };


  
});
