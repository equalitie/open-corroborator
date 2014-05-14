/*global define*/
// Author: Cormac McGuire
// ### Description
// This contains mixins for the filter view objects  
// The mixins are logic that is shared across all the views

define (
  [
    'underscore', 'backbone',
    'lib/SolrSearch/views/filters/filter-elements',
    'lib/SolrSearch/views/filters/map-filter'
  ],
  function (_, Backbone, FilterElements, MapFilterGroupView) {
    'use strict';

    // ### FilterViewMixin
    var FilterGroupView = FilterElements.FilterGroupView,
        DropDownFilterGroupView = FilterElements.DropDownFilterGroupView,
        FilterViewMixin = {
          
        
          // unset event handlers and destroy DOM elements
          destroy: function() {
            this.destroyFilterGroupViews();
            this.selectedFiltersView.destroy();
            this.selectedFiltersView = undefined;
            this.undelegateEvents();
            this.stopListening();
            this.$el.empty();
            this.$el.unbind();
          },
          
          // destroy the subviews
          destroyFilterGroupViews: function() {
            _.invoke(this.filterGroupViews, 'destroy');
            this.filterGroupViews = [];
          },

          // render the filters if they already exist
          renderExistingCollection: function() {
            if (this.collection.size() > 0) {
              this.renderFilterGroups();
            }
          },

          // separate filters into auto complete, location and standard filters
          markMapFilters: function(model) {
            if (_.indexOf(this.mapFilters, model.get('groupKey')) !== -1) {
              model.set('filterType', 'mapFilterGroup');
            }
            return model;
          },
          markAutoFilters: function(model) {
            if (model.get('collection').length > 10 &&
                model.get('filterType') !== 'mapFilterGroup') {
              model.set('filterType', 'dropDownFilterGroup');
            }
            return model;
          },
          markStandardFilters: function(model) {
            model.set('filterType', 'standardFilterGroup');
            return model;
          },

          // render the filter groups
          renderFilterGroups: function() {
            this.destroyFilterGroupViews();
            this.filterGroupViews =
              this.collection.chain()
                             .map(this.markStandardFilters, this)
                             .map(this.markMapFilters, this)
                             .map(this.markAutoFilters, this)
                             .map(this.renderGroup, this)
                             .value();
          },

          // render a filter group, a drop down selector if the group is
          // greater than 10 elements long
          renderGroup: function(model) {
            var filterViewMap = {
              standardFilterGroup: {
                view: FilterGroupView,
                className: '.standard-filters',
                options: {
                  model: model
                }
              },
              dropDownFilterGroup: {
                view: DropDownFilterGroupView,
                className: '.dd-filters',
                options: {
                  model: model
                }
              },
              mapFilterGroup     : {
                view: MapFilterGroupView,
                className: '.' + model.get('groupKey'),
                options: {
                  model: model
                }
              }
            };

            //if (model.get('groupKey') === 'POB_exact') debugger;
            var filterOptions = filterViewMap[model.get('filterType')];
            filterOptions.options.entityType = this.entityType;
            var filterGroupView = new filterOptions.view(filterOptions.options);
            this.$el.children()
                    .children()
                    .children()
                    .children()
                    .children(filterOptions.className)
                    .prepend(filterGroupView.$el);
            filterGroupView.trigger('appended');
            return filterGroupView;
          }
        };
    return {
      FilterViewMixin: FilterViewMixin
    };
});

