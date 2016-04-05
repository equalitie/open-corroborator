define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "-->\n        <!--<option value=\"";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>-->\n        <!--";
  return buffer;
  }

  buffer += "<div class=\"Application\" lang=\"en\">\n  <div class=\"message-text\">\n    <p class=\"server fail message\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.Upload_Failed_Problem_contacting_server)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    <p class=\"file fail message\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.No_file_attached)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    <p class=\"success message\"> "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.Media_uploaded_successfully)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </p>\n  </div>\n  <div class=\"media-progressbar\"></div>\n  <form \n    method=\"post\"\n    class=\"media-form\">\n    <!--enctype=\"multipart/form-data\"-->\n    <div class=\"field\">\n      <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.file_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n      <div class=\"i18n with-en with-ar\">\n        <div lang=\"en\">\n          <input type=\"text\" name=\"name_en\"\n            value=\"\" class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field w-100p\" />\n        </div>\n        <!--\n        <div lang=\"ar\">\n          <input type=\"text\" name=\"name_ar\" id=\"fullname_ar\"\n          value=\"\" class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field w-100p\" />\n        </div>\n        <span class=\"toggle\">\n          <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n        </span>\n        -->\n      </div>\n    </div>\n    <!--<div class=\"field\">-->\n      <!--<label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.file_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>-->\n      <!--<select name=\"media_type\" id=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-media_type\"-->\n        <!--class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field\">-->\n        <!--";
  stack2 = helpers.each.call(depth0, depth0.mediaTypes, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "-->\n      <!--</select>-->\n    <!--</div>-->\n    <div class=\"field\">\n      <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.file_upload)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n      <input id=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-file-upload\"\n        name=\"media_file\" type=\"file\" \n        class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field\" />\n      <input type=\"submit\" value=\"Attach File Details\"  class=\"hidden\" />\n    </div>\n  </form>\n</div>\n";
  return buffer;
  })

});