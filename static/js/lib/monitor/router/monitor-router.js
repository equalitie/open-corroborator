/*global require, Bootstrap*/
// Author: Cormac McGuire
// ### Description: Router for the monitor application
// 

define(
  [
    'backbone', 'jquery',
    'lib/monitor/views/monitor-view',
    'lib/monitor/views/importer-config-view',
    'lib/monitor/views/scraper-config-view'
  ],
  function (Backbone, $,
  MonitorView, ImporterConfigView, ScraperConfigView) {
    'use strict';

    var MonitorRouter,
        views = {
          importer: ImporterConfigView,
          monitor : MonitorView,
          scraper : ScraperConfigView
        };

    // ### MonitorRouter router for the monitor app
    // switches between views
    MonitorRouter = Backbone.Router.extend({
      routes: {
        '': 'showMonitor',
        'tab/monitor': 'showMonitor',
        'tab/importer-config': 'showImporterConfig',
        'tab/scraper-config': 'showScraperConfig'
      },
      showMonitor: function() {
        this.applyClass('.is-monitor');
        this.navigateToView(views.monitor);
      },
      showImporterConfig: function() {
        this.applyClass('.is-importer-config');
        this.navigateToView(views.importer);
      },
      showScraperConfig: function() {
        this.applyClass('.is-scraper-config');
        this.navigateToView(views.scraper);
      },
      navigateToView: function(newView) {
        this.destroyCurrentView()
            .showNewView(newView);
      },
      // toggle active classes on the tabs
      applyClass: function (selectedClassName) {
        $(selectedClassName).addClass('active')
                            .siblings()
                            .removeClass('active');
      },
      destroyCurrentView: function() {
        if (this.currentView) {
          this.currentView.destroy();
        }
        return this;
      },
      showNewView: function(SelectedTabView) {
        this.currentView = new SelectedTabView();
        $('#monitor-content').append(this.currentView.$el);
        this.currentView.trigger('rendered');
      }

    });
    return MonitorRouter;
  
});
