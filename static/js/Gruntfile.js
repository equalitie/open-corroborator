var _ = require('lodash');

var appTemplates = require('./grunt/search-app-templates.js'),
    monitorTemplates = require('./grunt/monitor-templates.js'),
    reportingTemplates = require('./grunt/reporting-templates.js'),
    dataEntryTemplates = require('./grunt/data-entry-templates.js'),
    templates = _.extend(appTemplates(), monitorTemplates(), dataEntryTemplates(), reportingTemplates());

module.exports = function(grunt) {

  // Initializes the Grunt tasks with the following settings
  grunt.initConfig({
    // compile our templates to js modules
    handlebars: {
      compile: {
        options: {
          namespace: false,
          amd: true
        },
        files: templates
      }
    },
    // A list of files, which will be syntax-checked by JSHint
    jshint: { 
      files: [
        'lib/*.js',
        'lib/Data/*.js',
        'lib/elements/tests/*.js',
        'lib/elements/*.js',
        'lib/Navigation/*.js',
        'lib/Navigation/tests/TabRouter-test.js',
        'lib/CRUD/views/*.js',
        'lib/CRUD/tests/*.js',
        'lib/SolrSearch/*.js',
        'lib/SolrSearch/data/*.js',
        'lib/SolrSearch/solr/*.js',
        'lib/SolrSearch/tests/*.js',
        'lib/SolrSearch/views/*.js',
        'lib/SolrSearch/views/filters/*.js',
        'lib/SolrSearch/widgets/manager.js',
        'lib/monitor/views/*.js',
        'lib/monitor/data/*.js',
        'lib/monitor/router/*.js',
        'lib/monitor/router/*.js',
        'lib/reporting/**/*.js',
        'lib/reporting/*.js',
        '!lib/reporting/nls/**/*.js',
        '!lib/reporting/templates/*.js'
      ],
      options: {
        jshintrc: './.jshintrc'
      }
    },
    karma: { // test standard script
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      ci: {
        configFile: 'karma.conf.js',
        singleRun: true,
        runnerPort: 9999,
        browsers: ['PhantomJS'],
        reporters: 'junit'
      }
    },
    retire: {
      js: [
        'components/*',
        'components/**/*'
      ],
      options: {
        verbose: false
      }
    },
    // concatenate and minify using the require r.js script
    requirejs: {
      compile: {
        options: {
          baseUrl       : '.',
          name          : 'main',
          mainConfigFile: 'loader.js',
          out           : 'dist/build-ar.js',
        }
      }
    },

    plato: {
      dev: {
        options: {
          exclude: /\.tpl\.js/
        },
        files: {
          'reports': [
            'lib/*.js',
            'lib/**/*.js',
            'lib/**/**/*.js',
            'lib/**/**/**/*.js',
            'lib/**/**/**/**/*.js'
          ]
        }
      },
      olddev: {
        options: {
          exclude: /\.tpl\.js/
        },
        files: {
         'oldreports': [
          'trash/ajax-manager.js',
          'trash/corroborator-hash-link-reader.js',
          'trash/corroborator-util.js',
          'trash/widgets/*.js'
         ]
        }
      }
    },

    docco: {
      docs: {
        src: [
          'lib/*.js',
          'lib/Data/*.js',
          'lib/elements/tests/*.js',
          'lib/elements/*.js',
          'lib/Navigation/*.js',
          'lib/Navigation/tests/TabRouter-test.js',
          'lib/SolrSearch/*.js',
          'lib/SolrSearch/tests/*.js',
          'lib/SolrSearch/views/*.js',
          'lib/SolrSearch/widgets/manager.js'
        ],
        dest: 'docs/annotated-source'
      }
    },

    // Tasks being executed with 'grunt watch'
    watch: { 
      files: [
        '<%= jshint.files %>',
        'lib/elements/templates/*.tpl',
        'lib/SolrSearch/templates/**/*.tpl',
        'lib/CRUD/templates/search-templates/*.tpl',
        'lib/CRUD/templates/search-templates/*/*.tpl',
        'lib/CRUD/templates/display-templates/*.tpl',
        'lib/CRUD/templates/display-templates/*/*.tpl',
        'lib/monitor/templates/*.tpl',
        'lib/data-entry/templates/*.tpl',
        'lib/reporting/*.js',
        'lib/reporting/**/*.tpl',
        'lib/reporting/**/*.js'
      ],
      tasks: ['handlebars']
      //tasks: ['handlebars', 'karma:unit', 'jshint']
      //tasks: ['handlebars', 'jshint', 'karma', 'requirejs', 'docco']]
    }
  });

  // Load the plugins that provide the tasks we specified in package.json.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-docco2');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-retire');


  // This is the default task being executed if Grunt
  // is called without any further parameter.
  grunt.registerTask(
    'default', 
    [
      'jshint',
      'karma:ci',
      'requirejs'
    ]
  );
  grunt.registerTask(
    'build',
    [
      'jshint',
      'karma:ci',
      'requirejs'
    ]
  );
  grunt.registerTask(
    'test',
    [
      'jshint',
      'karma:ci'
    ]
  );


};
