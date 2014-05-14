define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Related_Actors)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\">\n  <button class=\"do-clear\">\n    <span>✓</span>\n  </button>\n  <button class=\"do-search-embedded actors\">\n    <span>"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Search)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </button>\n</div>\n<ul class=\"elements elements-bulletin\">\n\n</ul>\n<select multiple=\"true\" name=\"actors_role\" id=\"actors_role\" class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field hidden\">\n</select>\n<div class=\"clearer\"></div>\n\n<!--<div class=\"drop-target\">Drag &amp; drop actors here</div>-->\n\n";
  return buffer;
  })

});