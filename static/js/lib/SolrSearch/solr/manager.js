define(
  [
    'lib/SolrSearch/solr/facet-fields',
    'lib/SolrSearch/solr/TextSearch',
    'lib/SolrSearch/solr/filter-widget',
    'lib/SolrSearch/solr/embedded-search-widget',
    'lib/streams',
    'managers/Manager.jquery',
    'core/ParameterStore'
  ],
  function(FacetFields, TextSearch, FilterWidget,
    EmbeddedSearchWidget, Streams) {
    var solrUrl = {
          solrUrl: Bootstrap.solr_url
        },
        crudBus = Streams.crudBus,
        searchBus = Streams.searchBus,
        MainManager,
        FilterManager,
        ActorManager,
        BulletinManager,
        IncidentManager,
        createEmbeddedSearchManager,
        createFilterManager,
        createMainManager,

        // facet fields
        fields = FacetFields,

        // search parameters
        params = {
          facet: true,
          'facet.sort':'count',
          'facet.field': fields,
          'rows': 1000,
          'facet.limit': 50,
          'facet.mincount': 1,
          'json.nl': 'map'
        },

        // define our search paramaters
        addValuesToManager = function(manager) {
          manager.store.addByValue('q', 'django_ct:*');
          _.each(params, function(item, index, list) {
            manager.store.addByValue(index, item);
          });
        },

        // add the embedded search widget to a passed in manager
        addEmbeddedSearchToManager = function(manager) {
          manager.addWidget(new TextSearch({
            id: 'EmbeddedSearch',
            bus: crudBus,
            shouldSendFilters: false,
            fields: ['type','sources']
          }));
        },

        // add the filtered search widget to a passed in manager
        addFilterSearchToManager = function(manager) {
          manager.addWidget(new FilterWidget.FilterWidget({
            id: 'FilterSearch',
            fields: ['type','sources']
          }));
        },

        // add the main text search widget to a passed in manager
        addTextSearchToManager = function(manager) {
          manager.addWidget(new TextSearch({
            id: 'MainSearch',
            bus: searchBus,
            shouldSendFilters: true,
            fields: ['type','sources']
          }));
        };

    createEmbeddedSearchManager = function() {
      var embeddedSearchManager = new AjaxSolr.Manager(solrUrl);
      addEmbeddedSearchToManager(embeddedSearchManager);
      embeddedSearchManager.init();
      addValuesToManager(embeddedSearchManager);
      return embeddedSearchManager;
    };


    // create a manager object to manage the main search across all entities
    createMainManager = function() {
      var mainManager = new AjaxSolr.Manager(solrUrl);
      addTextSearchToManager(mainManager);
      mainManager.init();
      addValuesToManager(mainManager);
      return mainManager;
    };

    // create the filtered search for one entity
    // this will need to listen for filters sent to the main search also
    // because we want to perform sub filtering here
    createFilterManager = function(entity) {
      var filterManager = new AjaxSolr.Manager(solrUrl);
      filterManager.entity = entity;
      addFilterSearchToManager(filterManager);
      filterManager.init();
      addValuesToManager(filterManager);
      return filterManager;
    };

    // create the manager objects
    MainManager           = createMainManager();
    EmbeddedSearchManager = createEmbeddedSearchManager();
    ActorManager          = createFilterManager('actor');
    BulletinManager       = createFilterManager('bulletin');
    IncidentManager       = createFilterManager('incident');

    // module export
    return {
      MainManager          : MainManager,
      EmbeddedSearchManager: EmbeddedSearchManager,
      ActorManager         : ActorManager,
      BulletinManager      : BulletinManager,
      IncidentManager      : IncidentManager
    };
});
