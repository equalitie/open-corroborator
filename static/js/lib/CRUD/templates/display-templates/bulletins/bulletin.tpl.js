define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"score\">\n            <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <span class=\"status\">\n          <span class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchStatus || depth0.fetchStatus),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin), options) : helperMissing.call(depth0, "fetchStatus", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin), options)))
    + "</span>\n        </span>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "/";
  if (stack1 = helpers.expanded) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.expanded; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n          ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n          ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletins)),stack1 == null || stack1 === false ? stack1 : stack1['in'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " \n          <span class=\"location\">\n            ";
  options = {hash:{
    'list': (((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.locations))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.commaSeparatedList || depth0.commaSeparatedList),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "commaSeparatedList", options)))
    + "\n          </span>\n        ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n      <div class=\"involved\">\n        ";
  options = {hash:{
    'tpl': (((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.actors_involved)),
    'numItems': (((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_actors))
  },data:data};
  stack2 = ((stack1 = helpers.pluralise || depth0.pluralise),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "pluralise", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n      ";
  return buffer;
  }

  buffer += "<li class=\"REPEAT\">\n  <div class=\"Bulletin in-list\">\n    <div class=\"L1\">\n      <div class=\"meta\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n      <a href=\"#bulletin/"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack2 = helpers['if'].call(depth0, depth0.expanded, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">\n        <div class=\"title i18n\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n      </a>\n    </div>\n    <div class=\"L3\">\n      <div class=\"date-location\">\n        <span class=\"date\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormatTZ || depth0.dateFormatTZ),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_created), options) : helperMissing.call(depth0, "dateFormatTZ", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_created), options)))
    + "</span>\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_locations), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_actors), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n</li>\n";
  return buffer;
  })

});