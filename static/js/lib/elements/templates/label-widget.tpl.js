define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "multiple=\"true\"";
  }

  buffer += "<label>"
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n<ul class=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " tags editor\">\n\n  <li class=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " is-new\">\n  <input type=\"text\" placeholder=\"";
  if (stack2 = helpers.field_label) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.field_label; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n  <button class=\"drop-down-handle\">\n    <span aria-hidden=\"true\" data-icon=\"d\"></span>\n    <span class=\"screen-reader-text\">show "
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " list</span>\n  </button>\n  </li>\n</ul>\n<select ";
  stack2 = helpers['if'].call(depth0, depth0.multiple, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"hidden ";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field\">\n</select>\n\n";
  return buffer;
  })

});