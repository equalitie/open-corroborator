define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <div class=\"is-sources group\">\n        <h4>Sources</h4>\n        <div class=\"value\">\n          ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.sourceList || depth0.sourceList),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_sources), options) : helperMissing.call(depth0, "sourceList", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_sources), options)))
    + "\n        </div>\n      </div>\n      ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n      <div class=\"is-media group\">\n      </div>\n      ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"is-description group\">\n        <h4>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n        <div class=\"description\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n      <div class=\"is-actors group\">\n        <div class=\"clearer\"></div>\n      </div>\n      ";
  }

function program11(depth0,data) {
  
  
  return "\n      <div class=\"is-bulletins group\">\n      </div>\n      ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"is-score group\">\n          <h4>Confidence</h4>\n          <div class=\"score\">\n            <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </div>\n        </div>\n        ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <div class=\"is-status group\">\n          <h4>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletins)),stack1 == null || stack1 === false ? stack1 : stack1.update_status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n          <div class=\"status\">\n            <span class=\"value status\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchStatus || depth0.fetchStatus),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin), options) : helperMissing.call(depth0, "fetchStatus", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin), options)))
    + "</span>\n          </div>\n        </div>\n        ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <span class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchUser || depth0.fetchUser),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options) : helperMissing.call(depth0, "fetchUser", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options)))
    + "</span>\n            ";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletins)),stack1 == null || stack1 === false ? stack1 : stack1.unassigned)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            ";
  return buffer;
  }

function program21(depth0,data) {
  
  
  return "\n      <div class=\"is-events group\">\n      </div>\n      ";
  }

function program23(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"is-locations group\">\n        <h4>Locations</h4>\n        <div class=\"locations\">\n          ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_locations), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n      </div>\n      <div class=\"is-bulletin-map map\"></div>\n      ";
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"location\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div>\n          ";
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <h4>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Labels)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n        <ul class=\"tags group detail\">\n          ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.labels), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </ul>\n        ";
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          <li class=\"tag\">\n            <span class=\"text\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchLabel || depth0.fetchLabel),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "fetchLabel", depth0, options)))
    + "</span>\n          </li>\n          ";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " -->\n      <h4>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.comment)),stack1 == null || stack1 === false ? stack1 : stack1.comments)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n      <div class=\"is-comments group\">\n      </div>\n      ";
  return buffer;
  }

function program31(depth0,data) {
  
  
  return "\n        <div id=\"revision-container\" class=\"is-history group\">\n        </div>\n      ";
  }

  buffer += "<div class=\"Bulletin in-view is-expanded\">\n  <div class=\"header\">\n    <span class=\"id\">\n      ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.django_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </span>\n    <h2 class=\"title\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      "
    + "\n    </h2>\n  </div>\n  <div class=\"span-66p\">\n    <div class=\"body\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_sources), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.medias), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      "
    + "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_role), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ref_bulletins), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n  <!-- end left column -->\n\n  <!-- start right column -->\n  <div class=\"span-33p\">\n    <div class=\"body\">\n      <div class=\"group\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <div class=\"is-assigned-to group\">\n          <h4>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletins)),stack1 == null || stack1 === false ? stack1 : stack1.assigned_to)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n          <div class=\"assigned-to\">\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n          </div>\n        </div>\n        <div class=\"clearer\"></div>\n      </div>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.times), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.locations), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <div class=\"is-tags group\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.labels), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n      <!-- ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_imported_comments), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_comments), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n  <div class=\"clearer\"></div>\n</div>\n";
  return buffer;
  })

});