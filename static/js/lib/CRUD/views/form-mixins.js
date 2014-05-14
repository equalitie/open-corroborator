/*global define*/
// Author: Cormac McGuire
// ## Description
// Define mixins that are used across all our form views

define (
  [
    'jquery', 'underscore',
    'lib/streams',
    'lib/elements/combo',
    'lib/elements/label-widget',
    'lib/elements/date-time-range',
    'lib/CRUD/views/map-view',
    'lib/CRUD/templates/search-templates/confirm-dialog.tpl',
    'jquery_slider',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, _, Streams, Combo, LabelWidget, DateTimeRangeView,
    CoordinateDisplayView, confirmDialogTmp) {
    'use strict';
    var ComboWidget  = Combo.ComboWidget,
        crudBus = Streams.crudBus,

    // ### ConfirmMixin
    // Show a dialog box asking the user to confirm their action
    ConfirmMixin = {
        // display a dialog box
        // dialog confirming that you want to exit the add/update
        disableConfirm: function() {
        },
        requestCloseForm: function(evt) {
          var dialogHTML = $(confirmDialogTmp());
          dialogHTML.dialog({
            resizable: false,
            height: 160,
            modal: true,
            buttons: {
              'Close Form': function() {
                crudBus.push({
                  content: {},
                  type: 'close_form'
                });
                $(this).dialog('close');
              },
              'Cancel': function() {
                $(this).dialog('close');
              }
            }
          });

        }
      },

      // ### Formatter
      // pull the data from form elements and convert them into
      // a digestible format
      Formatter = {
        relatedFields: [
          'sources'
        ],
        makeIntStringsIntegers: function(value) {
          var intValue = parseInt(value, 10);
          return intValue.toString() === value ? intValue : value;
        },

        createDefaultKeyList: function() {
          var reduceToKeyList = function(formEl) {
            return $(formEl).attr('name');
          };
          return _.map($('.' + this.entityType + '-field'), reduceToKeyList);
        },

        mergeObjectArrays: function(keyArray, newDataArray) {
          var dataKeys = _.keys(newDataArray);
          keyArray = _.reduce(keyArray, function(memo, key){
            memo[key] = newDataArray[key];
            return memo;
          }, {});
          return keyArray;

        },
        
        validateForm: function() {
          var $validatableElements =
                $('.required.' + this.entityType + '-field'),
              results = _.map($validatableElements, this.validationFuncion),
              passed  = _.reduce(results, this.checkPassedAll, true);
          return passed || this.setError(results);
        },

        filterTestCreator: function(expected) {
          return function(value) {
            value = _.chain(value).values().last().value();
            return value === expected;
          };
        },

        setError: function(results) {
          var filterFailed, filterPassed, failedElements, passedElements;
          filterFailed   = this.filterTestCreator(false);
          filterPassed   = this.filterTestCreator(true);
          failedElements = _.filter(results, filterFailed);
          passedElements = _.filter(results, filterPassed);
          _.each(passedElements, this.removeErrorClass);
          _.each(failedElements, this.addErrorClass);
          this.scrollTo(_.first(failedElements));
        },

        // this must be done after render to get accurate scroll to positions
        setUpScrollToPositions: function() {
          this.requiredElementPostions = _.map($('.required'), function(element) {
            var el = [];
            el.push($(element).attr('id'));
            el.push($(element).offset().top - 160);
            return el;
          });
          this.requiredElementPostions = _.object(this.requiredElementPostions);

        },

        // scroll to element tht failed validation
        scrollTo: function(failedResult) {
          var elId = _.chain(failedResult).keys().last().value();
          var scrollToPos = this.requiredElementPostions[elId];
          this.$el.children('.body').animate({
            scrollTop: scrollToPos
          }, 500);
        },

        // send the form data on the crudBus, it will be picked up in data and 
        // persisted
        saveRequested: function() {
          var formContent = this.formContent();
          formContent = this.validateDateFields(formContent);
          this.model.set(formContent);
          if (this.validateForm() === true){
            this.saveModel();
          }
        },
        saveModel: function() {
          if (this.multiple === true) {
            this.saveMultiple();
          }
          else {
            this.delegateSave();
          }
        },

        saveMultiple: function() {
          this.model.set('relatedActors', this.actorSearchView.collection);
          this.model.saveMultiple();
        },

        removeErrorClass: function(passedElement) {
          var passedElementId = _.chain(passedElement).keys().last().value();
          $('#' + passedElementId).closest('.field').removeClass('error');
        },

        addErrorClass: function(failedElement) {
          var failedElementId = _.chain(failedElement).keys().last().value();
          $('#' + failedElementId).closest('.field').addClass('error');
        },

        checkPassedAll: function(memo, result) {
          result = _.chain(result).values().last().value();
          return result && memo;
        },

        validationFuncion: function(el) {
          var result = {};
          result[el.id] = $(el).val().length > 0 ? true : false;
          return result;
        },

        // pull the data from the form
        formContent: function() {
          var defaultKeyList = this.createDefaultKeyList();
          var formArray = $('.' + this.entityType + '-field').serializeArray();
                   
          var data = this.formArrayToData(formArray);
          data = this.mergeObjectArrays(defaultKeyList, data); 
          return data;
        },

        // reduce an array of objects
        // in the format {"name":"foo","value":"1"}
        // to an object, preserving objects associated with duplicated keys
        reduceToObject: function(memo, formEl) {
          var value,
              firstEl,
              parsedValue = this.makeIntStringsIntegers(formEl.value);
          if (memo[formEl.name] !== undefined) {
            value = [];
            firstEl = memo[formEl.name];
            value = [firstEl, parsedValue];
            value = _.flatten(value);
          }
          else {
            value = parsedValue;
          }
          memo[formEl.name] = value;
          return memo;
        },

        formArrayToData: function(namedArray) {
          return _.reduce(namedArray, this.reduceToObject, {}, this);
        }
      },

      // give rich functionality to date and combo fields
      WidgetMixin = {
        // enable the widgets associated with this form view
        enableWidgets: function() {
          this.enableAutoCompleteFields();
          this.enableSliderFields();
          this.enableLabelFields();
          this.enableDateFields();
          this.enableDateTimeFields();
          this.enableDateTimeRangeFields();
          this.enableComboBoxes();
          this.enableMapFields();
          return this;
        },
        populateWidgets: function() {
          this.populateLabelFields();
          this.populateSliderFields();
        },

        disableWidgets: function() {
          this.disableDateFields();
          this.disableDateTimeFields();
          this.disableSliderFields();
          this.disableAutoCompleteFields();
        },


        // populate the label fields
        populateLabelFields: function() {
          _.each(this.labelFields, function(field, index) {
            var values = this.model.get(index);
            if (typeof(values) === 'string') {
              values = [values];
            }
            field.content.values = values;
          }, this);
        },

        // populate the label fields
        populateSliderFields: function() {
          _.each(this.sliderFields, function(field, index) {
            var value = this.model.get(index);
            field.value = (value !== undefined) ? value : '';
          }, this);
        },

        // enable a jquery ui date field for date of birth
        disableDateTimeFields: function() {
          _.each(this.dateTimeFields, this.disableDateTimeField, this);
        },
        disableDateTimeField: function(dateTimeField) {
          $(dateTimeField.el).datetimepicker('disable');
          $(dateTimeField.el).remove();
        },

        // enable a jquery ui date field for date of birth
        enableDateTimeFields: function() {
          _.each(this.dateTimeFields, this.enableDateTimeField, this);
        },
        enableDateTimeField: function(dateTimeField) {
          $(dateTimeField.el).datetimepicker({
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm:ss'
          });
        },

        // enable a jquery ui date field for date of birth
        enableDateTimeRangeFields: function() {
          _.each(this.dateTimeRangeFields, this.enableDateTimeRangeField, this);
          
        },
        enableDateTimeRangeField: function(dateTimeField) {
          var dateTimeRange = new DateTimeRangeView({
            entityType: this.entityType,
            el        : dateTimeField.el,
            from      : dateTimeField.from,
            to        : dateTimeField.to
          });
          this.childViews.push(dateTimeRange);
        },

        // enable a jquery ui date field for date of birth
        disableDateFields: function() {
          _.each(this.dateTimeRangeFields, this.enableDateTimeRangeField, this);
        },

        disableDateField: function(dateFieldName) {
          $('input[name=' + dateFieldName + ']').remove();
        },
        // enable a jquery ui date field for date of birth
        enableDateFields: function() {
          _.each(this.dateFields, this.enableDateField, this);
        },

        enableDateField: function(dateFieldName) {
          $('input[name=' + dateFieldName + ']').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            maxDate: "+0D",
            yearRange: "c-60:c"
          });
        },

        // enable the combo box functionality
        enableComboBoxes: function() {
          _.each(this.comboIds, this.enableComboBox, this);
        },

        enableComboBox: function(comboDetails) {
          var comboWidget = new ComboWidget(comboDetails);
          this.childViews.push(comboWidget);
        },

        disableAutoCompleteFields: function() {
          _.each(this.autoCompleteFields, this.enableAutoCompleteField, this);
        },
        disableAutoCompleteField: function(field) {
          $(field.className).remove();
        },
        // enable auto complete fields  
        // the actual data gets stored  to a hidden input field
        enableAutoCompleteFields: function() {
          _.each(this.autoCompleteFields, this.enableAutoCompleteField, this);
        },
        enableAutoCompleteField: function(field) {
          $(field.className).autocomplete({
            minLength: 0,
            source: field.content,
            select: function(event, ui) {
              $(field.className).val(ui.item.label);
              $('input[name='+ field.name + ']').val(ui.item.id);
            }
          });
          
        },

        enableMapFields: function() {
          _.each(this.mapFields, this.enableMapField, this);
        },

        enableMapField: function(field) {
          var mapView = new CoordinateDisplayView({
            el: field.containerid,
            locationSource: field.locationSource,
            bus: field.bus
          });
          this.childViews.push(mapView);
        },

        enableLabelFields: function() {
          _.each(this.labelFields, this.enableLabelField, this);
        },
        enableLabelField: function(field) {
          var collection = new field.collection();
          var labelWidget = new LabelWidget({
            entityType     : this.entityType,
            collection     : collection,
            el             : field.containerid,
            display        : field.display,
            content        : field.content,
            multiple       : field.multiple,
            bus            : field.bus,
            eventIdentifier: field.eventIdentifier
          });
          this.childViews.push(labelWidget);
        },

        disableSliderFields: function() {
          _.each(this.sliderFields, this.enableSliderField);
        },

        disableSliderField: function(field) {
          $(field.sliderDiv).remove();
        },
        // enable sliders, store the value in the designated field
        enableSliderFields: function() {
          _.each(this.sliderFields, this.enableSliderField);
        },

        enableSliderField: function(field) {
          // handle slider values
          var setInputVal = function(value) {
                $(field.display).text(value);
              },
              setDisplayVal = function(value) {
                $('input[name=' + field.formField + ']').val(value);
              },
              updateValue = function(e) {
                var value = $(field.sliderDiv).slider('value');
                setInputVal(value);
                setDisplayVal(value);
              };

          
          // create the slider
          $(field.sliderDiv).slider({
            min: field.startPoint,
            max: field.endPoint,
            step: 1,
            value: field.value,
            slide: updateValue
          });
          // set initial values
          setInputVal(field.value);
          setDisplayVal(field.value);
        }
      };

    return {
      ConfirmMixin: ConfirmMixin,
      WidgetMixin : WidgetMixin,
      Formatter   : Formatter
    };
});

