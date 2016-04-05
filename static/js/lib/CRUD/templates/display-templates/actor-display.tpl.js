define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"avatar\"><img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail_url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"actor thumbnail\"></div>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n    <div class=\"avatar\">&nbsp;</div>\n    ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <span class=\"status\">\n          <span class=\"text\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchStatus || depth0.fetchStatus),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_actor), options) : helperMissing.call(depth0, "fetchStatus", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_actor), options)))
    + "</span>\n        </span>\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        (<span class=\"sex\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchSex || depth0.fetchSex),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), options) : helperMissing.call(depth0, "fetchSex", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), options)))
    + "</span>)\n        ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n          ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchAge || depth0.fetchAge),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), options) : helperMissing.call(depth0, "fetchAge", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), options)))
    + "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return ", ";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchCivilian || depth0.fetchCivilian),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian), options) : helperMissing.call(depth0, "fetchCivilian", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian), options)))
    + "\n        ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <div class=\"assigned-to\">\n        <span class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchUser || depth0.fetchUser),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options) : helperMissing.call(depth0, "fetchUser", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options)))
    + "</span>\n      </div>\n      ";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <div class=\"assigned-to\">\n        <span class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchCondition || depth0.fetchCondition),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.condition), options) : helperMissing.call(depth0, "fetchCondition", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.condition), options)))
    + "</span>\n      </div>\n      \n    ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"description detail\">\n      <h3 class=\"title\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n      "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n    ";
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"description detail\">\n      <h3 class=\"title\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n      "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n    ";
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Lives_in)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </th>\n          <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchLocation || depth0.fetchLocation),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), options) : helperMissing.call(depth0, "fetchLocation", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), options)))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Born_in)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>\n            ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchLocation || depth0.fetchLocation),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.POB), options) : helperMissing.call(depth0, "fetchLocation", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.POB), options)))
    + "\n          </td>\n        </tr>\n        ";
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Date_Of_Birth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>\n            ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormat || depth0.dateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options)))
    + "\n          </td>\n        </tr>\n        ";
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.works_as_a_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>\n            "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n          </td>\n        </tr>\n        ";
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.works_as_a_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>\n            "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n          </td>\n        </tr>\n        ";
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>\n            "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n          </td>\n        </tr>\n        ";
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.position_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>\n            "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n          </td>\n        </tr>\n        ";
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nationality_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }

function program42(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nationality_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }

function program44(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Ethnicity_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }

function program46(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Ethnicity_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }

function program48(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Speaks)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n            <td>\n            <span class=\"i18n with-en with-ar\">\n              <span lang=\"en\"><span class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></span>\n              <!--\n              <span lang=\"ar\"><span class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></span>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span>\n                <span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n            </td>\n        </tr>\n        ";
  return buffer;
  }

function program50(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Religion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n            <td>\n            <span class=\"i18n with-en with-ar\">\n              <span lang=\"en\"><span class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></span>\n              <!--\n              <span lang=\"ar\"><span class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></span>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span>\n                <span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n            </td>\n        </tr>\n        ";
  return buffer;
  }

function program52(depth0,data) {
  
  
  return "\n      <div class=\"actors group\">\n      </div>\n    ";
  }

function program54(depth0,data) {
  
  
  return "\n    <div class=\"bulletins group\">\n    </div>\n    ";
  }

function program56(depth0,data) {
  
  
  return "\n    <div class=\"incidents group\">\n    </div>\n    ";
  }

function program58(depth0,data) {
  
  
  return "\n    <div id=\"revision-container\">\n    </div>\n    ";
  }

  buffer += "<div class=\"Actor in-view\">\n  <div class=\"header\">\n    <div class=\"id\">\n      ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.django_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail_url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <div class=\"infos\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_actor), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <h2 class=\"title\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </h2>\n      <div class=\"aka\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      <div class=\"type\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n    </div>\n    <div class=\"group details\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n  <div class=\"body\">\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.condition), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_ar), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <table class=\"details\">\n      <tbody>\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.POB), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en), {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_ar), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_ar), {hash:{},inverse:self.noop,fn:self.program(38, program38, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en), {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_ar), {hash:{},inverse:self.noop,fn:self.program(42, program42, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en), {hash:{},inverse:self.noop,fn:self.program(44, program44, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_ar), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en), {hash:{},inverse:self.noop,fn:self.program(48, program48, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en), {hash:{},inverse:self.noop,fn:self.program(50, program50, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </tbody>\n    </table>\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_role), {hash:{},inverse:self.noop,fn:self.program(52, program52, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.related_bulletins), {hash:{},inverse:self.noop,fn:self.program(54, program54, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.related_incidents), {hash:{},inverse:self.noop,fn:self.program(56, program56, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actor_comments), {hash:{},inverse:self.noop,fn:self.program(58, program58, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  })

});