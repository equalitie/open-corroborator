/*global require, window*/
// Author: Cormac McGuire
// ### Description: Show the importer config
// 
define(
  [
    'i18n!lib/monitor/nls/dict',
    'backbone', 'jquery', 'underscore',
    'lib/monitor/data/monitor-models',
    'lib/elements/helpers/form-validate',
    'lib/monitor/templates/importer-config.tpl'
  ],
  function (i18n, Backbone, $, _, Models, Forms, importerTmp) {
  'use strict';

  var ImporterConfigView,
      importerModel = Models.importerModel,
      FormatterMixin = Forms;

  // ###ImporterConfigView
  // show and edit the importer config
  ImporterConfigView = Backbone.View.extend({
    entityType: 'importer',
    className: 'importer-container',
    template: importerTmp,
    events: {
      'click input[type=submit]': 'submitRequested'
    },
    initialize: function (options) {
      this.model = importerModel;
      this.render();
      this.listenTo(this, 'rendered', this.enableDateWidget);
    },
    enableDateWidget: function() {
      $('#next_job_time').datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss'
      });
    },
    onDestroy: function() {
      this.stopListening();
    },
    removeXhrListeners: function() {
      this.stopListening(this.model, 'success');
      this.stopListening(this.model, 'fail');
    },

    submitRequested: function(evt) {
      evt.preventDefault();
      var $submit = this.getSubmitButton(),
          passed = this.validateForm();
      
      if (passed) {
        $submit.val(i18n.importer.saving)
               .attr('enabled', 'false');
        this.listenTo(this.model, 'success', this.saveSucceeded.bind(this));
        this.listenTo(this.model, 'fail', this.saveFailed.bind(this));
        this.model.saveConf(this.formContent());
      }
    },
    getSubmitButton: function() {
      this.$submit = this.$submit ||
        this.$el.children()
                .children()
                .children()
                .children()
                .children()
                .children('input[type=submit]');
      return this.$submit;
    },
    saveFailed: function(error) {
      error = JSON.parse(error);
      var $submit = this.getSubmitButton();
      $submit.attr('enabled', 'true')
             .val(i18n.importer.save_config);
      window.alert(i18n.importer.save_failed + ': ' + error.error);
      this.removeXhrListeners();
    },
    saveSucceeded: function() {
      var $submit = this.getSubmitButton();
      $submit.attr('enabled', 'true')
             .val(i18n.importer.save_config);
      window.alert(i18n.importer.config_saved);
      this.removeXhrListeners();
    },
    render: function() {
      var html = this.template({
        i18n: i18n,
        model: this.model.toJSON()
      });
      this.$el.html(html);
      return this;
    }
  });
  _.extend(ImporterConfigView.prototype, FormatterMixin);

  return ImporterConfigView;

  
});
