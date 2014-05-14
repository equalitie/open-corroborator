define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.groupTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n<ul class=\"select\" id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.groupKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n</ul>\n";
  return buffer;
  })

});