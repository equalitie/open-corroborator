define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.event)),stack1 == null || stack1 === false ? stack1 : stack1.Events)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n<div class=\"date-duration\">\n\n</div>\n<ul class=\"events \">\n  <li class=\"event event-form is-new\">\n  </li>\n</ul>\n<select name=\"times\" multiple=\"true\" class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field hidden\">\n</select>\n";
  return buffer;
  })

});