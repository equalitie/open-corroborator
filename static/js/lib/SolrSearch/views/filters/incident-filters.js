define(
  [
    // vendor
    'underscore', 'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    //data
    'lib/SolrSearch/data/filter-collections',
    // filter elements
    'lib/SolrSearch/views/filters/filter-elements',
    'lib/SolrSearch/views/filters/filter-mixins',
    'lib/SolrSearch/views/filters/date-range',
    // templates
    'lib/SolrSearch/templates/filters/incident-filters.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (_, $, Backbone, Handlebars, Streams, FilterCollection,
    FilterElements, Mixins, DateRange, incidentFiltersTmp, i18n) {
    var IncidentFilterView,
        DateRangeView = DateRange.DateRangeView,
        FilterViewMixin = Mixins.FilterViewMixin,
        IncidentFilterCollection = FilterCollection.IncidentFilterCollection,
        SelectedIncidentFilterCollection = 
          FilterCollection.SelectedIncidentFilterCollection,
        SelectedFiltersView = FilterElements.SelectedFiltersView;

    // ## Incident filter view
    // display a list of filters for incidents
    IncidentFilterView = Backbone.View.extend({
      entityType: 'incident',
      el: '.right-filters',
      filterGroupViews: [],
      events: {
        'click button.do-create-incident': 'createIncidentPressed'
      },
      mapFilters: [
        'incident_searchable_locations_exact'
      ],

      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.render();
        this.collection = IncidentFilterCollection;
        this.renderExistingCollection();
        this.listenTo(this.collection, 'reset', this.renderFilterGroups.bind(this));
        this.createSelectedFiltersGroup();
        this.createDateRangeWidget();
      },

      createDateRangeWidget: function() {
        this.dateRangeView = new DateRangeView({
          el: '.date-range',
          entityType: 'incident',
          title: i18n.filters.incident_created_between
        });
      },

      // event handler for new incidents button press
      createIncidentPressed: function(e) {
        var createIncidentEvent = {
          content: {},
          type: 'create_incident'
        };
        Streams.searchBus.push(createIncidentEvent);
      },

      // render the container
      render: function() {
        var html = incidentFiltersTmp({
          i18n: i18n
        });
        this.$el.children().remove();
        this.$el.append(html);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-incident-filters',
          collection: SelectedIncidentFilterCollection,
          type: 'incident'
        });
      },
      createMapViewFilter: function() {
        this.mapView = new CoordinatePickerView();
        this.$el.children()
                .children()
                .children()
                .children('.filter-groups')
                .append(this.mapView.$el);
        this.mapView.displayMap();
      }

    });
    _.extend(IncidentFilterView.prototype, FilterViewMixin);

    return {
      IncidentFilterView: IncidentFilterView
    };
});
