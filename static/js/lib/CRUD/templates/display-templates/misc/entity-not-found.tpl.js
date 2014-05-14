define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"not-found\">\n  <h3>";
  options = {hash:{
    'tpl': (((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Entity_not_found)),
    'word': (depth0.entity)
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.wordTpl || depth0.wordTpl),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "wordTpl", options)))
    + "</h3>\n</div>\n";
  return buffer;
  })

});