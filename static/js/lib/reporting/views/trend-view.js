/*global define*/
// Author: Cormac McGuire
// ### Backbone view that shows a trend chart
// 

define(
  [
    'backbone', 'd3', 'nv', 'moment'
  ],
  function(Backbone, d3, nv, moment) {
  'use strict';
    return Backbone.View.extend({
      el: '.graphs svg',
      initialize: function(options) {
        this.data = options.data;
        this.render();
      },
      createChart: function() {
        this.chart = nv.models.lineWithFocusChart()
            .options({
              showXAxis: true,
              showYAxis: true,
              transitionDuration: 250
            })
            .margin({top: 100, right: 50, bottom: 50, left: 90});

        this.chart.xAxis
        .axisLabel(this.data.xAxisLabel)
        .tickFormat(function(d) {
          return d3.time.format('%x')(new Date(d));
        });

        this.chart.x2Axis
        .axisLabel(this.data.xAxisLabel)
        .tickFormat(function(d) {
          return d3.time.format('%x')(new Date(d));
        });

        this.chart.yAxis
        .axisLabel(this.data.yAxisLabel)
        .tickFormat(d3.format(',r'));
        return this;
      },

      bindChartToEl: function() {
        d3.select(this.el)
        .datum(this.data.values)
        .transition().duration(500)
        .call(this.chart);
        return this;
      },

      increaseSpacing: function() {
        d3.selectAll(".nv-context").attr('margin-top', '60px');
      },


      render: function() {
        this.createChart()
            .bindChartToEl();
        nv.addGraph(this.chart);
        this.increaseSpacing();
      }
    });
  }
);
