/*global require*/
// Author: Cormac McGuire
// ### Description: Show the Monitor
// 
define(
  [
    'i18n!lib/monitor/nls/dict',
    'backbone',
    'lib/monitor/data/monitor-models',
    'lib/monitor/templates/monitor.tpl'
  ],
  function (i18n, Backbone, Models, monitorTmp) {
  'use strict';

  var statsModel = Models.statsModel;

  // ###MonitorView
  // show and edit the importer config
  return Backbone.View.extend({
    className: 'monitor-container',
    template: monitorTmp,
    initialize: function (options) {
      this.model = statsModel;
      this.model.set(
        'num_errors', this.model.get('errors').length, {silent: true});
      this.renderAll();
      this.listenTo(this.model, 'change', this.renderAll.bind(this));
    },

    renderAll: function() {
      this.render()
          .showProgressBar();
    },

    onDestroy: function() {
    },
    render: function() {
      var html = this.template({
        i18n: i18n,
        model: this.model.toJSON()
      });
      this.$el.html(html);
      this.$progressBar = this.$el.children('.progress-container');
      return this;
    },
    showProgressBar: function() {
      this.$progressBar.progressbar({
        value: this.model.get('dumb_percent')
      });
    }

  });

  
});
