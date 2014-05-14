/*global Bootstrap, window*/
// Author: Cormac McGuire
// ### Description: define the models to be used in the monitor views
// 
define(
  [
    'backbone', 'underscore', 'moment',
    'lib/elements/helpers/cookie'
  ],
  function (Backbone, _, moment, cookie) {
  'use strict';

  var MonitorStatsModel, MonitorErrorModel, MonitorErrorCollection,
      ScraperConfigModel, ImporterConfigModel;
  var statsModel, scraperModel, importerModel;

  //## MonitorStatsModel
  // hold the stats for the job being monitored
  MonitorStatsModel = Backbone.Model.extend({
    idAttribute: 'job_id',
    initialize: function() {
      this.pollForUpdates();
    },
    url: function() {
      var urlTemplate = _.template(
        '/api/v1/monitorUpdate/<%=id%>/?format=json&' + 
        'username=<%=username%>&api_key=<%=apiKey%>');
      return urlTemplate({
        id: this.id,
        username: Bootstrap.username,
        apiKey: Bootstrap.apiKey
      });
    },
    pollForUpdates: function() {
      window.setInterval(this.fetch.bind(this), 1000);
    }
  });
  statsModel = new MonitorStatsModel(Bootstrap.importer_stats);



  //## MonitorErrorModel
  // hold generated errors
  MonitorErrorModel = Backbone.Model.extend({});

  MonitorErrorCollection = Backbone.Collection.extend({
    model: MonitorErrorModel
  });

  //## ScraperConfigModel
  // hold current scraper config
  ScraperConfigModel = Backbone.Model.extend({
    url: function() {
      return '/corroborator/monitoring/update/scraper/';
    },
    saveConf: function(formContent) {
      var scrapers = this.get('scrapers');
      _(scrapers).each(function(item) {
        item.enabled = formContent[item.site] === "true" ? true: false;
      });
      this.set('scrapers', scrapers);
      this.set('actors_dir', formContent.actors_dir);
      this.set('bulletins_dir', formContent.bulletins_dir);
      this.set('next_job_time', 
        moment(formContent.next_job_time, 'YYYY-MM-DD HH:mm:ss').unix());
      this.save(this.attributes, {
        headers: {
          'X-CSRFToken': cookie
        },
        success: function(model) {
          model.trigger('success');
        },
        error: function(model, error) {
          model.trigger('fail', error.responseText);
        }

      });
    }
  });
  scraperModel = new ScraperConfigModel(Bootstrap.scraper_conf);

  //## ScraperConfigModel
  // hold current importer config
  ImporterConfigModel = Backbone.Model.extend({
    url: function() {
      return '/corroborator/monitoring/update/importer_conf/';
    },
    saveConf: function(formContent) {
      var media_params;
      media_params = this.get('media_params');
      media_params.media_dir = formContent.media_dir;
      this.set('actors_dir', formContent.actors_dir);
      this.set('bullletins_dir', formContent.bullletins_dir);
      this.set('mysql_dir', formContent.mysql_dir);
      this.set('media_params', media_params);
      this.set('next_job_time', 
        moment(formContent.next_job_time, 'YYYY-MM-DD HH:mm:ss').unix());
      this.save(this.attributes, {
        headers: {
          'X-CSRFToken': cookie
        },
        success: function(model, result) {
          model.trigger('success');
        },
        error: function(model, error) {
          model.trigger('fail', error.responseText);
        }
      });
    }
  });
  importerModel = new ImporterConfigModel(Bootstrap.importer_conf);

  
  return {
    scraperModel: scraperModel,
    importerModel: importerModel,
    statsModel: statsModel
  };
});
