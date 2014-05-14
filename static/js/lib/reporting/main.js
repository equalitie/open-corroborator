/*global require*/
// Author: Cormac McGuire
// ### Entry point for the reporting application
// 

define(
  [
    'backbone',
    'lib/reporting/router/router',
    'lib/SolrSearch/solr/reporting-manager',
    'lib/reporting/views/tab-view',
    'lib/reporting/data/user-data',
    'lib/reporting/data/graph-data',
    'lib/reporting/views/graph-type-select-view',
    'lib/reporting/views/graph-view',
    'lib/SolrSearch/views/filters/filter-manager',
    'lib/SolrSearch/solr/search-reloader',
    'lib/reporting/streams',
    'lib/elements/helpers/view-close',
    'jquery',
    'jquery_ui',
    'jquery_time'
  ],
  function(Backbone, Router, SolrManager, TabView, UserData, GraphData,
  GraphSelectorView, GraphViewManager, FilterManager, SearchReloader) {
    'use strict';
    var router = new Router(),
        tabView = new TabView({
          el: '#monitor-navigation',
          router: router
        }),
        filterManager = new FilterManager.FilterManagerView(),
        graphTypeSelectorView = new GraphSelectorView();

    GraphViewManager.init();
    UserData.init();
    GraphData.init();
    SearchReloader.init();
    Backbone.history.start();
    
  
  }
);
