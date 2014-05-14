define(
  [
    // vendor
    'underscore', 'jquery', 'backbone',
    'lib/streams',
    // templates
    'lib/SolrSearch/templates/filters/filter-group.tpl',
    'lib/SolrSearch/templates/filters/dropdown-filter-group.tpl',
    'lib/SolrSearch/templates/filters/single-filter.tpl',
    'lib/SolrSearch/templates/filters/selected-filters.tpl',
    'lib/SolrSearch/templates/filters/selected-filter.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (_, $, Backbone, Streams, filterGroupTmp, dropdownFilterGroupTmp,
    singleFilterTmp, selectedFiltersTmp, selectedFilterTmp, i18n
  ) {
    'use strict';
    var FilterGroupView,
        DropDownFilterGroupView,
        SelectedFilterView,
        SelectedFiltersView,
        FilterView,
        searchBus = Streams.searchBus,
        filterResetRequest,
        createFilterLoadContentFunction,
        createFilterLoadFunction;

    createFilterLoadContentFunction = function(filterName, key) {
      return function (value) {
        return value.content.get('filterName') === filterName && 
               value.content.get('key')        === key;
      };
    };

    createFilterLoadFunction = function(entityType) {
      return function (value) {
        return value.type === 'filter_event_unload_' + entityType;
      };
    };

    // ### DropDownFilterGroupView
    // Render a group of filters using an autocomplete drop down style element
    // used when there are more than 10 filters for a certain group
    DropDownFilterGroupView = Backbone.View.extend({
      className: 'filter-drop-down',
      template : dropdownFilterGroupTmp,
      initialize: function () {
        this.collection = this.model.get('collection');
        this.createAddRemoveListener();
        this.listenTo(this, 'appended', this.setUpAutoComplete.bind(this));
        this.listenTo(this, 'appended', this.setUpTooltip.bind(this));
        this.listenTo(this, 'appended', this.listenForAddRemove.bind(this));
        this.render();
      },

      setUpTooltip: function() {
        this.$el.children('input').tooltip({
          position: {
            my: 'left',
            at: 'right'

          }
        });
      },

      // create a method on the view that will enable listening for 
      // filters coming and going from the collection
      createAddRemoveListener: function() {
        this.listenForAddRemove = _.once(
          function () {
            this.listenTo(
              this.collection, 'add', this.setUpAutoComplete.bind(this));
            this.listenTo(
              this.collection, 'remove', this.setUpAutoComplete.bind(this));
          }.bind(this)
        );
      },

      // destroy this view and it's subviews
      onDestroy: function() {
        this.stopListening();
      },

      // render the input box and label
      render: function() {
        this.$el.html(this.template({
          i18n: i18n,
          model: this.model.toJSON()
        }));
      },

      // enable the jquery ui autocomplete input
      setUpAutoComplete: function () {
        var inputEl = this.$el.children('input');
        var availableFilters = this.collection.map(function(model, index) {
          return {
            label: model.get('displayFilterName'),
            value: model.get('displayFilterName'),
            index: index
          };
        });
        $('.filter-' + this.model.get('groupKey')).autocomplete({
          source: availableFilters,
          select: this.filterRequested.bind(this, inputEl),
          delay: 500
        });
      },

      // a filter has been selected from the autocomplete box
      filterRequested: function(inputEl, evt, ui) {
        var model = this.collection.at(ui.item.index);
        searchBus.push({
          type: 'filter_event_' + model.get('type'),
          content: {
            filter: model
          }
        });
        // remove the filter from the current collection
        this.collection.remove(model);
        // empty the box
        $(inputEl).val('');
        // return false to stop it filling the box with the result
        return false;
      }
    });

    // ### FilterGroupView
    // Render a group of filters
    FilterGroupView = Backbone.View.extend({
      className: 'filter',
      childViews: [],
      // actor bulletin incident?
      type: '',

      // constructor
      initialize: function() {
        this.collection = this.model.get('collection');
        this.listenTo(this.collection, 'add', this.renderFilters.bind(this));
        this.listenTo(this.collection, 'remove', this.renderFilters.bind(this));
        this.render();
      },

      // destroy this view and it's subviews
      onDestroy: function() {
        this.destroyChildren();
        this.stopListening();
      },

      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // render the filter group
      render: function() {
        if (this.collection.length > 0) {
          var html = filterGroupTmp({
            i18n: i18n,
            model: this.model.toJSON()
          });
          this.$el.empty()
                  .append(html);
          this.renderFilters();
        }
      },

      // iterate over the filters with a render function
      renderFilters: function() {
        this.destroyChildren();
        this.childViews = this.collection.map(this.renderFilter, this);
      },

      // render a single filter
      renderFilter: function(model) {
        var filterView = new FilterView({
          model: model,
          collection: this.collection
        });
        this.$el.children('ul')
                .append(filterView.$el);
        return filterView;
      }
    });

    // ### FilterView
    // render a single filter as part of a FilterGroupView
    FilterView = Backbone.View.extend({
      tagName: 'li',
      className: 'option',
      events: {
        'click .text': 'filterRequested'
      },
      initialize: function() {
        this.render();
        this.typeFilterFunction =
          createFilterLoadFunction(this.model.get('type'));

        //if (this.model.get('key') === 'actor_searchable_pob_exact') debugger;
        this.contentFilter = createFilterLoadContentFunction(
          this.model.get('filterName'),
          this.model.get('key')
        );
        this.listenForExternalRequests();
      },


      listenForExternalRequests: function() {
        this.subscriber = 
          searchBus.toEventStream()
                   .filter(this.typeFilterFunction)
                   .filter(this.contentFilter)
                   .subscribe(this.externalFilterRequested.bind(this));
      },

      externalFilterRequested: function() {
        this.destroy();
      },

      onDestroy: function() {
        this.subscriber();
      },

      // the user has clicked on the filter  
      // send the filter name and key to the event stream
      filterRequested: function(e) {
        searchBus.push({
          type: 'filter_event_' + this.model.get('type'),
          content: {
            filter: this.model
          }
        });
        this.collection.remove(this.model);
        this.destroy();
      },

      // render the filter
      render: function() {
        var html = singleFilterTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
      }
    });

    // ### SelectedFiltersView
    // Show a list of all selected filters
    // Allows users to remove these filters
    SelectedFiltersView = Backbone.View.extend({
      selectedFilterViews: [],
      // constructor
      // render the container, show the filters  
      // register listeners for add and remove events  
      initialize: function(options) {
        this.type = options.type;
        this.listenTo(this.collection, 'add', this.render.bind(this));
        this.listenTo(this.collection, 'reset', this.render.bind(this));
        this.listenTo(this.collection, 'add', this.showFilters.bind(this));
        this.listenTo(this.collection, 'remove',
          this.shouldBeHidden.bind(this));
        this.listenTo(this.collection, 'remove',
          this.removeFilterView.bind(this));
        this.render();
        this.shouldBeHidden();
      },
      
      // unhide the view
      showFilters: function() {
        this.$el.children()
                .children()
                .children()
                .children()
                .removeClass('hidden');
      },
      removeFilterView: function(model) {
        model.trigger('remove_selected');
      },

      // check if the view should be hidden and hide if yes
      shouldBeHidden: function() {
        if (this.collection.size() === 0) {
        this.$el.children()
                .addClass('hidden');
        }
      },

      // destroy the view
      onDestroy: function() {
        this.stopListening();
      },

      // render the selected filters container
      render: function() {
        var html = selectedFiltersTmp({
          i18n: i18n,
          model: {
            type: this.type
          }
        });
        this.$el.empty()
                .append(html);
        this.renderFilters();
      },

      // iterate over the collection of filters
      renderFilters: function() {
        this.collection.each(this.renderFilter, this);
      },

      // render a single filter
      renderFilter: function(model, index, collection) {
        var selectedFilterView = new SelectedFilterView({
          model: model,
          collection: this.collection
        });
        this.selectedFilterViews.push(selectedFilterView);
        $('#' + this.type + '-selected-tags').append(selectedFilterView.$el);
      }
    });

    // ### SelectedFilterView
    // Used to display a filter that has been selected by a user  
    // Shown in the Current Filters section
    SelectedFilterView = Backbone.View.extend({
      tagName: 'li',
      className: 'tag',
      events: {
        'click .do-clear': 'removeFilter'
      },
      // constructor
      initialize: function() {
        this.render();
        this.model.on('remove_selected', this.destroy, this);
      },

      removeFilter: function() {
        searchBus.push({
          type: 'remove_filter',
          content: this.model
        });
        this.destroy();
      },

      // destroy the view
      destroy: function() {
        this.model.off('remove_selected');
        this.$el.remove();
        this.undelegateEvents();
        this.collection.remove(this.model);
      },

      // render a single filter
      render: function() {
        var html = selectedFilterTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
      }
    });
    

    return {
      FilterView: FilterView,
      FilterGroupView: FilterGroupView,
      DropDownFilterGroupView: DropDownFilterGroupView,
      SelectedFiltersView: SelectedFiltersView
    };
  }
);
