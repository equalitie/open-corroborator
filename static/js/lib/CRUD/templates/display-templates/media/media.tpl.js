define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_thumb_file)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n         title=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.name_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n         class=\"media-image-thumbnail\"/>\n         <!--alt=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.name_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>-->\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_thumb_file)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n         class=\"media-video-thumbnail\"\n         style=\"padding: 0;margin: 0;\" "
    + "\n         />\n    <!-- <span aria-hidden=\"true\" data-icon=\"&#x56;\" class=\"media-video-thumbnail\"></span> -->\n    <span class=\"screen-reader-text\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.document)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_file)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" download=\"download."
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_file_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <span title=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.name_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" aria-hidden=\"true\" data-icon=\"F\" class=\"media-document-thumbnail\"></span>\n      <span class=\"screen-reader-text\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.document)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </a>\n  ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_file)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">\n      <span title=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.name_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" aria-hidden=\"true\" data-icon=\"F\" class=\"media-document-thumbnail\"></span>\n      <span class=\"screen-reader-text\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.media)),stack1 == null || stack1 === false ? stack1 : stack1.document)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </a>\n  ";
  return buffer;
  }

  buffer += "  ";
  options = {hash:{
    'compare': ("Picture")
  },inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.if_eq || depth0.if_eq),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options) : helperMissing.call(depth0, "if_eq", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  ";
  options = {hash:{
    'compare': ("Video")
  },inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.if_eq || depth0.if_eq),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options) : helperMissing.call(depth0, "if_eq", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  ";
  options = {hash:{
    'compare': ("Document")
  },inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers.if_eq || depth0.if_eq),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options) : helperMissing.call(depth0, "if_eq", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  ";
  options = {hash:{
    'compare': ("Pdf")
  },inverse:self.noop,fn:self.program(7, program7, data),data:data};
  stack2 = ((stack1 = helpers.if_eq || depth0.if_eq),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options) : helperMissing.call(depth0, "if_eq", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  <span class=\"type\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  <span class=\"date\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormat || depth0.dateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_created), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_created), options)))
    + "</span>\n";
  return buffer;
  })

});