define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n      <option\n        ";
  options = {hash:{
    'compare': (((stack1 = depth1.model),stack1 == null || stack1 === false ? stack1 : stack1.status))
  },inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.if_eq || depth1.if_eq),stack1 ? stack1.call(depth0, depth0.resource_uri, options) : helperMissing.call(depth0, "if_eq", depth0.resource_uri, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        value=\""
    + escapeExpression(((stack1 = depth0.resource_uri),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n      >"
    + escapeExpression(((stack1 = depth0.comment_status),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n        selected=\"true\"\n        ";
  }

  buffer += "<!-- Comment status field  dropdown should match others -->\n<div id=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-status-block\" class=\"add\">\n  <label>Status</label><br/>\n  <select name=\"status\" \n          id=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "_status\" \n          class=\"comment-field\">\n    <option value=\"\">Select Status</option>\n    ";
  stack1 = helpers.each.call(depth0, depth0.statuses, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</div>\n\n<div class=\"clearer\"></div>\n<!-- Comment content field -->\n<div class=\"add\">\n\n  <div class=\"i18n with-en with-ar\">\n      <div lang=\"en\">\n      <label>Comment</label>\n        <textarea \n          id=\"comments_en\"\n          name=\"comments_en\"\n          class=\"comment-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comments_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n      <div lang=\"ar\">\n        <textarea \n          id=\"comments_ar\"\n          name=\"comments_ar\"\n          class=\"comment-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comments_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n  <span class=\"toggle\">\n  <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n  </span>\n  </div>\n\n\n\n</div>\n\n\n<input type=\"hidden\" name=\"assigned_user\" value=\"";
  if (stack2 = helpers.userResource) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.userResource; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" \n       class=\"comment-field\">\n<button class=\"do-addComment\">\n  <span class=\"T\">Save comment</span>\n</button>\n";
  return buffer;
  })

});