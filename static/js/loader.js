/*global requirejs, Bootstrap */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'i18n'           : 'bower_components/requirejs-i18n/i18n',
      'lib'            : 'lib',
      'main'           : 'main',
      'jquery'         : 'bower_components/jquery/jquery',
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
      //'spin'           : 'bower_components/spin.js/spin',
      'flowplayer'     : 'bower_components/flowplayer/dist/flowplayer',
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
    config: {
      i18n: {
        locale: /* removed for grunt build: Bootstrap.locale || */ 'en'
      }
    }
  });
  requirejs(['main']);
  

}(requirejs));
