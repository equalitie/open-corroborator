define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"body embedded\" >\n  <div class=\"EmbeddedSearch\">\n    <ul class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " elements\">\n    </ul>\n  </div>\n</div>\n<div class=\"footer actions\">\n  <div class=\"left\">\n    <!--<button class=\"do-hideResults\">-->\n      <!--<span class=\"text T\">New <span class=\"search-entity\">actor</span></span>-->\n    <!--</button>-->\n  </div>\n\n  <div class=\"right\">\n    <button class=\"do-hideResults\">\n      <span class=\"text T\">» "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Close)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </button>\n  </div>\n</div>\n";
  return buffer;
  })

});