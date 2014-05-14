define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing;


  options = {hash:{
    'tpl': (((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.header)),
    'tplVar': (depth0.entity),
    'numItems': (depth0.numItems),
    'showEmpty': (true)
  },data:data};
  stack2 = ((stack1 = helpers.pluralise || depth0.pluralise),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "pluralise", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  })

});