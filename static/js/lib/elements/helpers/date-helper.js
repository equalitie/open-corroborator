/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// handlebars helpers for template files
// This is used throughout the application to resolve resource uris
// to the labels defined for them in the collections from the Bootstrap

define (
  [
    'handlebars', 'moment', 'underscore', 'moment_langs'
  ],
  function (Handlebars, moment, _) {
    'use strict';

    Handlebars.registerHelper('if_eq', function(context, options) {
      if (context === options.hash.compare) {
        return options.fn(this);
      }
      return options.inverse(this);
    });

    var mapKeyToLabel = function(fieldKey, key) {
      try {
        return _(Bootstrap[key]).findWhere({key: fieldKey}).value;
      }
      catch(e) {
        return 'label missing for item: ' + fieldKey + ' with value: ' + key;
      }
    };

    var getFromUri = function(uri, key) {
      var searchField = {resource_uri: uri};
      if (_.findWhere(Bootstrap[key], searchField)) {
        return _.findWhere(Bootstrap[key], searchField).name;
      }
    };

    // key value functions
    // could be consolidated into one function
    Handlebars.registerHelper('fetchCivilian', function(context, options) {
        if (context) {
          return mapKeyToLabel(context, 'civilian');
        }
        return context;
    });
    Handlebars.registerHelper('fetchAge', function(context, options) {
        if (context) {
          return mapKeyToLabel(context, 'ages');
        }
        return context;
    });
    Handlebars.registerHelper('fetchSex', function(context, options) {
        if (context) {
          return mapKeyToLabel(context, 'sexes');
        }
        return context;
    });

    Handlebars.registerHelper('fetchRole', function(context, options) {
        try {
          var formattedContext = context;
          
          if (context) {
            var roles = Bootstrap.gl_ac_role_list.concat(Bootstrap.gl_ac_relation_list),
                roleSearchField = {key: context};
            formattedContext = _.findWhere(roles, roleSearchField).value;
          }
          return formattedContext;
        }
        catch(e) {
          return context;
        }
    });

    // resource_uri functions
    Handlebars.registerHelper('fetchCondition', function(context, options) {
        if (context) {
          return getFromUri(context, 'conditions');
        }
        return context;
    });

    Handlebars.registerHelper('fetchLabel', function(context, options) {
        if (context) {
          return getFromUri(context, 'labels');
        }
        return context;
    });

    Handlebars.registerHelper('fetchStatus', function(context, options) {
        if (context) {
          return getFromUri(context, 'all_statuses');
        }
        return context;
    });

    Handlebars.registerHelper('fetchUser', function(context, options) {
        if (context) {
          return getFromUri(context, 'user_list');
        }
        return context;
    });



    Handlebars.registerHelper('fetchLocation', function(context, options) {
        var formattedContext = context;
        if (context !== undefined) {
          return getFromUri(context, 'locations');
        }
        return '';
    });

    Handlebars.registerHelper('locationTpl', function(context, options) {
      var tpl = _.template(context.hash.tpl);
      return tpl({
        location: getFromUri(context.hash.location, 'locations')
      });
    });


    // translate i18n strings

    Handlebars.registerHelper('wordTpl', function(context, options) {
      var tpl = _.template(context.hash.tpl);
      return tpl({
        word: context.hash.word
      });
    });

    Handlebars.registerHelper('pluralise', function(context, options) {
      var tpl = (context.hash.tplVar) ?
        context.hash.tpl[context.hash.tplVar] :
        context.hash.tpl;
      if (context.hash.numItems === 0 && !context.hash.showEmpty) {
        return '';
      }
      var out = (context.hash.numItems === 1 )?
        _.template(tpl.single)({
          num: context.hash.numItems
        }):
        _.template(tpl.plural)({
          num: context.hash.numItems
        });
      return out;
    });

    //  Date helpers
    //  usage: {{dateFormat creation_date format="MMMM YYYY"}}
    Handlebars.registerHelper('dateFormat', function(context, block) {
      var formattedContext = context;
      moment.lang(Bootstrap.locale);
      if (moment && formattedContext !== undefined) {
        var f = block.hash.format || "MMM Do, YYYY";
        formattedContext =  moment(context).format(f);
      }
      return formattedContext;
    });

    Handlebars.registerHelper('dateFormatTZ', function(context, block) {
      var formattedContext = context;
      moment.lang(Bootstrap.locale);
      if (moment && formattedContext !== undefined) {
        var f = block.hash.format || "MMM Do, YYYY";
        formattedContext =  moment(context).utc().local().format(f);
      }
      return formattedContext;
    });

   Handlebars.registerHelper('dateTimeFormat', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext) {
        var f = block.hash.format || "YYYY-MM-DD HH:mm:ss";
        formattedContext =  moment.unix(context).format(f);
      }
      return formattedContext;
    });

    Handlebars.registerHelper('formatDuration', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext) {
        var f = block.hash.format || "YY-MM-DD HH:mm:ss";
        formattedContext =  moment.duration(context, 'seconds').humanize();
      }
      return formattedContext;
    });

    Handlebars.registerHelper('formDateFormat', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext) {
        var f = block.hash.format || "YYYY-MM-DD";
        formattedContext =  moment(context).format(f);
      }
      return formattedContext;
    });

    // List functions
    Handlebars.registerHelper('sourceList', function(context, block) {
      var ret = '',
          start = '<span class="source">',
          end = '</span>',
          i=0, j=context.length;

      for(i, j; i<j; i++) {
        ret =  ret + start + getFromUri(context[i], 'sources') + end;
        if (i<j-1) {
          ret =  ret + ', ';
        }
      }
      return new Handlebars.SafeString(ret);
    });



    //create a list of items from uris separated by commas
    Handlebars.registerHelper('commaSeparatedList', function(context, block) {
      var list = [];
      if (context.hash) {
        list = _.isArray(context.hash.list) ? context.hash.list : [context.hash.list];
        try {
        list = _(list).map(function(loc_uri) {
          return getFromUri(loc_uri, 'locations');
        });
        }
        catch(e) {
        }
      }
      else {
        list = context;
      }
      var ret = "", i=0, j=0;
      if (list !== undefined) {
        for(i=0, j=list.length; i<j; i++) {
          ret = ret + list[i];
          if (i<j-1) {
            ret = ret + ", ";
          }
        }
      }
      return ret;
    });

});
