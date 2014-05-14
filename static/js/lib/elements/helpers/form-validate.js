/*global define*/
// Author: Cormac McGuire
// ### Description: Helper for form validateion and processing
// 

define(
  ['underscore', 'jquery'],
  function (_, $) {
  'use strict';
  var Formatter;
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
      var validatableElements = $('.required');
      var results = _.map(validatableElements, this.validationFuncion);
      return _.reduce(results, this.checkPassedAll, true) || this.setError(results);
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
      if (this.scrollSet === true) {
        this.scrollTo(_.first(failedElements));
      }
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
      this.scrollSet = true;
      return this;

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
  };
  return Formatter;
  
});

