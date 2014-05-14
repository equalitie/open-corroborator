/*global requirejs, Bootstrap */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'i18n'           : 'bower_components/requirejs-i18n/i18n',
      'lib'            : 'lib',
      'jquery'         : 'bower_components/jquery/jquery',
      'jquery_ui'      : 'bower_components/jquery.ui/dist/jquery-ui',
      'jquery_time'    : 'bower_components/jquery-timepicker-addon/jquery-ui-timepicker-addon',
      'jquery_form'    : 'bower_components/jquery-form/jquery.form',
      'jquery_slider'  : 'bower_components/jquery-timepicker-addon/jquery-ui-sliderAccess',
      'leaflet'        : 'bower_components/leaflet/dist/leaflet',
      'backbone'       : 'bower_components/backbone/backbone',
      'bacon'          : 'bower_components/bacon/dist/Bacon',
      'moment'         : 'bower_components/moment/moment',
      'moment_langs'   : 'bower_components/moment/min/langs',
      'underscore'     : 'bower_components/underscore/underscore',
      'handlebars'     : 'bower_components/handlebars/handlebars',
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      handlebars: {
        exports: 'Handlebars'
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
      }

    },
    config: {
      i18n: {
        locale: Bootstrap.locale || 'en'
      }
    }
  });
  requirejs(['lib/data-entry/main']);
  

}(requirejs));
