/*global requirejs, window */
(function(requirejs) {
  'use strict';
  var tests = [], file;
  for (file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (/Spec\.js$/.test(file)) {
        tests.push(file);
      }
    }
  }

  requirejs.config({
    baseUrl: '/base',
    'paths': {
      'lib'            : 'lib',
      'test'           : 'test',
      //'main'           : 'main',
      'i18n'           : 'bower_components/requirejs-i18n/i18n',
      'jquery'         : 'bower_components/jquery/jquery',
      'jasmine_jquery' : 'bower_components/jasmine-jquery/lib/jasmine-jquery',
      'jquery_ui'      : 'bower_components/jquery.ui/dist/jquery-ui',
      'jquery_form'    : 'bower_components/jquery-form/jquery.form',
      'jquery_time'    : 'bower_components/jquery-timepicker-addon/jquery-ui-timepicker-addon',
      'jquery_slider'  : 'bower_components/jquery-timepicker-addon/jquery-ui-sliderAccess',
      'leaflet'        : 'bower_components/leaflet/dist/leaflet',
      'backbone'       : 'bower_components/backbone/backbone',
      'moment'         : 'bower_components/moment/moment',
      'moment_langs'   : 'bower_components/moment/min/langs',
      'underscore'     : 'bower_components/underscore/underscore',
      'handlebars'     : 'bower_components/handlebars/handlebars',
      'bacon'          : 'bower_components/bacon/dist/Bacon',
      'bacon_ui'       : 'bower_components/bacon-ui/Bacon.UI',
      'spin'           : 'bower_components/spin.js/spin',
      'flowplayer'     : 'bower_components/flowplayer/dist/flowplayer',
      'sinon'          : 'bower_components/sinonjs-built/pkg/sinon-1.7.3',
      // ajax solr stuff
      'core'           : 'bower_components/ajax-solr/core',
      'managers'       : 'bower_components/ajax-solr/managers',
      'widgets'        : 'bower_components/ajax-solr/widgets',
    },
    shim: {
      moment_langs: {
        deps: ['moment']
      },
      underscore: {
        exports: '_'
      },
      sinon: {
        exports: 'sinon'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      handlebars: {
        exports: 'Handlebars'
      },
      bacon: {
        deps: ['jquery']
      },
      bacon_ui: {
        deps: ['bacon', 'jquery']
      },
      core: {
        deps: ['jquery'],
      },
      widgets: {
        deps: ['jquery'],
      },
      jquery_ui: {
        deps: ['jquery']
      },
      jquery_form: {
        deps: ['jquery']
      },
      jquery_time: {
        deps: ['jquery', 'jquery_ui']
      },
      jquery_slider: {
        deps: ['jquery', 'jquery_ui', 'jquery_time']
      },
      flowplayer: {
        deps: ['jquery']
      }

    },
    deps: tests,
    callback: window.__karma__.start
  });

  

}(requirejs));
