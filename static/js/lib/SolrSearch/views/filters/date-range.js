/*global define*/
// Author: Cormac McGuire
// ### Description
// Provide a date range widget for use in filter views

define (
  [
    'jquery', 'bacon', 'backbone', 'underscore', 'moment',
    'lib/streams',
    'lib/SolrSearch/templates/filters/date-range.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function ($, Bacon, Backbone, _, moment, Streams, dateRangeTmp, i18n) {
    'use strict';
    var DateRangeView,
        searchBus = Streams.searchBus,
        // helper object to deteermine if our dates our valid and format them
        // correctly for both display and solr
        DateRange = function(startDate, endDate) {
          try {
            this.startDate = moment(startDate, 'YYYY-MM-DD');
            this.endDate = moment(endDate, 'YYYY-MM-DD');
          }
          catch (e) {
          }
          return this;
        };


    DateRange.prototype = {
      setEndDate : function(endDate) {
        this.endDate = moment(endDate, 'YYYY-MM-DD');
      },

      validate: function() {
        this.passed = true;
        try {
          this.checkDatesExist();
          this.checkDatesValid();
          this.checkDateOrder();
        }
        catch (e) {
          this.passed = false;
        }
        
        return this;
      },
      // write the range to solr date range format
      toString: function() {
        return this.passed ? 
          '[' + this.startDate.toISOString() + ' TO ' +
          this.endDate.toISOString() + ']' :
          false;
      },
      toDisplayString: function() {
        return this.passed ?
          this.startDate.format('D MMM, YYYY') + ' TO ' +
          this.endDate.format('D MMM, YYYY'):
          false;
      },

      checkDateOrder: function() {
        if( this.endDate.diff(this.startDate, 'days') < 0 ) {
          throw 'start date ahead of end date';
        }
      },    

      checkDatesExist: function() {
        if ( this.startDate === null || this.endDate === null) {
          throw 'invalid date entered';
        }
      },
      checkDatesValid: function() {
        if (!(this.startDate.isValid() && this.endDate.isValid())) {
          throw 'invalid date entered';
        }
      }
    };

    // ### DateRangeView
    // Display two input boxes with from and to labels that open
    // a datepicker when clicked on
    DateRangeView = Backbone.View.extend({
      startDate: undefined,
      endDate  : undefined,
      entityType: '',
      initialize: function(options) {
        if (options.entityType !== undefined) {
          this.entityType = options.entityType;
        }
        else {
          throw 'entityType required by Date range view';
        }
        this.title = options.title;
        this.filterKey = options.filterKey;
        this.render();
        this.createDatePickers();
      },
      createDatePickers: function() {
        var self = this;
        this.$el.children('.from-date').datepicker({
          defaultDate: '-1w',
          changeMonth: true,
          dateFormat: 'yy-mm-dd',
          maxDate: "+0D",
          yearRange: "c-60:c",
          changeYear: true,
          numberOfMonths: 1,
          onClose: this.onCloseFrom.bind(this)
        });
        this.$el.children('.to-date').datepicker({
          defaultDate: '+1w',
          changeMonth: true,
          maxDate: "+0D",
          yearRange: "c-60:c",
          changeYear: true,
          dateFormat: 'yy-mm-dd',
          numberOfMonths: 1,
          onClose: this.onCloseTo.bind(this)
        });

      },
      // callbacks for when the datepickers are closed
      // set the min date on the other picker and see if we can
      // send teh date out
      onCloseFrom: function(selectedDate) {
            this.$el.children('.to-date').datepicker('option', 'minDate', selectedDate);
            this.startDate = selectedDate;
            this.checkFilters();
      },
      onCloseTo: function(selectedDate) {
            this.$el.children('.from-date').datepicker('option', 'maxDate', selectedDate);
            this.endDate = selectedDate;
            this.checkFilters();
      },

      // do we have a valid date range
      checkFilters: function() {
        var dr = new DateRange(this.startDate, this.endDate);
        if (dr.validate().passed ) {
          // we have a valid date range
          searchBus.push({
            type: 'filter_event_' + this.entityType,
            content: {
              filter:this.createFilterModel(dr.toString(), dr.toDisplayString())
            }
          });
        }
      },

      // create a model to be passed to teh ajax solr library
      createFilterModel: function(filterString, filterDisplay) {
        var key = this.filterKey || this.entityType + '_created_exact';
        var model = new Backbone.Model({
          key              : key,
          type             : this.entityType,
          dateFilter       : true,
          filterName       : filterString,
          displayFilterName: filterDisplay
        });
        return model;
      },


      // render the datepicker template
      render: function() {
        var html = dateRangeTmp({
          i18n: i18n,
          title: this.title
        });
        this.$el.append(html).addClass('filter');
      }
    });
    return {
      DateRangeView: DateRangeView,
      DateRange: DateRange
    };
    
});



