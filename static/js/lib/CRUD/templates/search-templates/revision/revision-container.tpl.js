define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"revision-label\">";
  if (stack1 = helpers.status_label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status_label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n      ";
  return buffer;
  }

  buffer += "<div class=\"version-dropdown\"></div>\n<div class=\"version-description\">\n  <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.revision)),stack1 == null || stack1 === false ? stack1 : stack1.REVISIONS)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n\n  <div class=\"drop-down-container\">\n    <p class=\"selected-revision-label\">\n      "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.comments),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.status_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    <button class=\"drop-down-handle\">\n      <span aria-hidden=\"true\" data-icon=\"d\"></span>\n      <span class=\"screen-reader-text\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.revision)),stack1 == null || stack1 === false ? stack1 : stack1.show_revision_list)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </button>\n\n    <ul class=\"all-revisions hidden\">\n      ";
  stack2 = helpers.each.call(depth0, depth0.comments, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </ul>\n  </div>\n\n  <textarea \n    class=\"version-description-text\"\n    disabled=\"true\"\n    cols=\"50\"\n    rows=\"10\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.comments),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.comments_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.comments),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.comments_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </textarea>\n</div>\n";
  return buffer;
  })

});