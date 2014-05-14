/*global requirejs, Bootstrap */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'i18n'           : 'bower_components/requirejs-i18n/i18n',
      'lib'            : 'lib',
      'leaflet'        : 'bower_components/leaflet/dist/leaflet',
      'jquery'         : 'bower_components/jquery/jquery',
      'jquery_ui'      : 'bower_components/jquery.ui/dist/jquery-ui',
      'jquery_time'    : 'bower_components/jquery-timepicker-addon/jquery-ui-timepicker-addon',
      'backbone'       : 'bower_components/backbone/backbone',
      'bacon'          : 'bower_components/bacon/dist/Bacon',
      'moment'         : 'bower_components/moment/moment',
      'underscore'     : 'bower_components/underscore/underscore',
      'handlebars'     : 'bower_components/handlebars/handlebars',
      'd3'             : 'bower_components/d3/d3',
      'nv'           : 'bower_components/nvd3/nv.d3',
      // ajax solr stuff
      'core'           : 'bower_components/ajax-solr/core',
      'managers'       : 'bower_components/ajax-solr/managers',
      'widgets'        : 'bower_components/ajax-solr/widgets'
    },
    shim: {
      d3: {
        exports: 'd3'
      },
      nv: {
        deps: ['d3'],
        exports: 'nv'
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
      jquery_ui: {
        deps: ['jquery']
      },
      jquery_time: {
        deps: ['jquery', 'jquery_ui']
      }

    },
    config: {
      i18n: {
        locale: Bootstrap.locale || 'en'
      }
    }
  });
  requirejs(['lib/reporting/main']);
  

}(requirejs));
