/*global define*/
// Author: Cormac McGuire
// ### Backbone view that shows a bar chart
// 

define(
  [
    'underscore', 'backbone', 'd3', 'nv'
  ],
  function(_, Backbone, d3, nv) {
  'use strict';
    return Backbone.View.extend({
      el: '.graphs svg',
      initialize: function(options) {
        this.$el.parent().addClass('bar');
        this.data = options.data;
        this.render();
      },
      onDestroy: function() {
        this.$el.parent().removeClass('bar');
      },

      shortenLabel: function(labelString) {
        return labelString.length < 15 ?
          labelString :
          labelString.slice(0, 15) + '…';
      },
      createChart: function() {
        this.chart = nv.models.discreteBarChart()
            .x(function(d) { return this.shortenLabel(d.label); }.bind(this))
            .y(function(d) { return d.value; })
            .staggerLabels(true)
            .margin({top: 10, right: 50, bottom: 100, left: 90})
            .tooltips(true);

        this.chart.yAxis
            .axisLabel(this.data.yAxisLabel)
            .tickFormat(d3.format(',.0f'));

        this.chart.xAxis
            .axisLabel(this.data.xAxisLabel);
        return this;
      },
      bindChartToEl: function() {
        d3.select(this.el)
          .datum([this.data])
          .transition().duration(500)
          .call(this.chart);
        return this;
      },
      render: function() {
        this.createChart()
            .bindChartToEl();
        nv.utils.windowResize(this.chart.update);
      }
    });
  }
);
