define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"avatar\"><img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail_url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"actor thumbnail\"></div>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <div class=\"avatar\">&nbsp;</div>\n      ";
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
  
  var buffer = "", stack1;
  buffer += "\n          <p class=\"name\"> "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n          ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <p class=\"name\"> "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n          ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <p class=\"sex\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchSex || depth0.fetchSex),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), options) : helperMissing.call(depth0, "fetchSex", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), options)))
    + "</p>\n          ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return "\n              <p class=\"age\">,&nbsp;</p>\n            ";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          <p class=\"age\"> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchAge || depth0.fetchAge),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), options) : helperMissing.call(depth0, "fetchAge", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), options)))
    + "</p>\n            ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"aka\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.results)),stack1 == null || stack1 === false ? stack1 : stack1.aka)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " «"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "»</p>\n          ";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n              "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.results)),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                <span class=\"location\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchLocation || depth0.fetchLocation),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), options) : helperMissing.call(depth0, "fetchLocation", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), options)));
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " </span>\n              ";
  return buffer;
  }
function program21(depth0,data) {
  
  
  return ", ";
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <span class='works-as'>\n              "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.results)),stack1 == null || stack1 === false ? stack1 : stack1.works_as_a)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                <span class=\"occupation\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> \n              ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                <br/>\n                <span class=\"incidents-count\">\n                  ";
  options = {hash:{
    'tpl': (((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.results)),stack1 == null || stack1 === false ? stack1 : stack1.involved_in)),
    'numItems': (((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.pluralise || depth0.pluralise),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "pluralise", options)))
    + "\n                </span>\n              ";
  return buffer;
  }

  buffer += "<div class=\"Actor in-list search-results\">\n  <a href=\"#actor/"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"actor-content\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail_url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <div class=\"content\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_actor), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <div class=\"L1\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n\n        <div class=\"L2\">\n          <br/>\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n        <div class=\"actor-summary\">\n          <div class=\"L3\">\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n           </div>\n         </div>\n      </div> \n    </div>\n  </a>\n</div>\n";
  return buffer;
  })

});