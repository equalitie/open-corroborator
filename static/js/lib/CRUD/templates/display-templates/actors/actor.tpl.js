define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"avatar\"><img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail_url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"actor thumbnail\"></div>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n      <div class=\"avatar\">&nbsp;</div>\n    ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          <span class=\"status\">\n            <span class=\"text\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchStatus || depth0.fetchStatus),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_actor), options) : helperMissing.call(depth0, "fetchStatus", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_actor), options)))
    + "</span>\n          </span>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <span class=\"status\" style=\"margin-right:5px;\">\n          <span class=\"text\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchRole || depth0.fetchRole),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.role), options) : helperMissing.call(depth0, "fetchRole", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.role), options)))
    + "</span>\n        </span>\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "/";
  if (stack1 = helpers.expanded) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.expanded; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n            ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n            ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"aka\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.aka)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " «"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "»</span>\n          ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <span class=\"location\">";
  options = {hash:{
    'tpl': (((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),
    'location': (((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.locationTpl || depth0.locationTpl),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "locationTpl", options)))
    + "</span>\n          ";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"occupation\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.works_as_a_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"occupation\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.works_as_a_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          ";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n          <br>";
  options = {hash:{
    'tpl': (((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.involved_in_incident)),
    'numItems': (((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents))
  },data:data};
  stack2 = ((stack1 = helpers.pluralise || depth0.pluralise),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "pluralise", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  return buffer;
  }

  buffer += "  <div class=\"Actor in-list\">\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail_url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <div class=\"content\">\n      <div class=\"L1\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_actor), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.role), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <a href=\"#actor/"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack2 = helpers['if'].call(depth0, depth0.expanded, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">\n          <h3 class=\"\">\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </h3>\n        </a>\n        <span class=\"sex\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchSex || depth0.fetchSex),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), options) : helperMissing.call(depth0, "fetchSex", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), options)))
    + "</span>\n        <span class=\"age\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchAge || depth0.fetchAge),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), options) : helperMissing.call(depth0, "fetchAge", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), options)))
    + "</span>\n        <div class=\"L2\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n      </div>\n      <div class=\"when-not_expanded\">\n        <div class=\"L3\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_ar), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n      </div>\n    </div>\n  </div>\n";
  return buffer;
  })

});