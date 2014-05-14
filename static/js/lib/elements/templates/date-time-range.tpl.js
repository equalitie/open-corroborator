define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "    <div class=\"span-30p event-time-range\">\n    <!-- Event Date From -->\n      <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.from)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br/>\n      <input name=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.options),stack1 == null || stack1 === false ? stack1 : stack1.from)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n        class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.options),stack1 == null || stack1 === false ? stack1 : stack1.from)),stack1 == null || stack1 === false ? stack1 : stack1.classes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field\"\n        type=\"text\"\n        value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.options),stack1 == null || stack1 === false ? stack1 : stack1.from)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n    <div class=\"span-30p\">\n      <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.to)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br/>\n      <input name=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.options),stack1 == null || stack1 === false ? stack1 : stack1.to)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n             class=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.options),stack1 == null || stack1 === false ? stack1 : stack1.to)),stack1 == null || stack1 === false ? stack1 : stack1.classes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field\"\n             type=\"text\"\n             value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.options),stack1 == null || stack1 === false ? stack1 : stack1.to)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n";
  return buffer;
  })

});