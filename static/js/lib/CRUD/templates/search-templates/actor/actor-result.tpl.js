define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

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
  
  var buffer = "", stack1;
  buffer += "\n        <p class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <p class=\"aka\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.aka)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " «"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "»</p>\n          ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"actor-summary hidden\">\n        <div class=\"L3\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n          <br>involved in <span class=\"incidents-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " incidents</span>\n        </div>\n      </div>\n      ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class='lives-in'>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " \n              <span class=\"location\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </p>\n          ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n          <p class='works-as'>\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.works_as_a)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " \n            <span class=\"occupation\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> \n          </p>\n          ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "\n          , \n          ";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"actor-long-summary\">\n        <table class=\"details\">\n          <tbody>\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.pob), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </tbody>\n        </table>\n        <div class=\"stats\">\n          <div class=\"is-mentions\">\n            <h4 class=\"title\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Mentioned_in)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n            <div class=\"stat\">\n              <div class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_bulletins)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n              <div class=\"label\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Bulletins)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </div>\n            <div class=\"stat\">\n              <div class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n              <div class=\"label\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Incidents)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"actions search-result\">\n        <div class=\"button combo is-default\">\n          <span class=\"T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Add_as)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n          <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n          </span>\n          <ul class=\"options\">\n            ";
  stack2 = helpers.each.call(depth0, depth0.roles, {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </ul>\n        </div>\n      </div>\n      ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Lives_in)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n            ";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Born_in)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.pob)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n            ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n              <tr>\n                <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nationality)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                <td>";
  if (stack2 = helpers.nationality_en) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.nationality_en; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n              </tr>\n            ";
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Ethnicity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n            ";
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Speaks)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n            ";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Religion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n            ";
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li>\n              <span data-role=\""
    + escapeExpression(((stack1 = depth0.key),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"text T\">"
    + escapeExpression(((stack1 = depth0.value),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </li>\n            ";
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <li>\n                    <span data-role=\""
    + escapeExpression(((stack1 = depth0.key),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"text T\">"
    + escapeExpression(((stack1 = depth0.value),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  ";
  return buffer;
  }

  buffer += "<div class=\"Actor in-list embedded\">\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail_url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <div class=\"content\">\n      <div class=\"L1\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <p class=\"sex\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        <p class=\"age\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n      </div>\n      <div class=\"L2\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.selected), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.result), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <div class=\"when-related\">\n        <div class=\"actions\">\n          <div class=\"left\">\n            <div class=\"button combo is-default\">\n              <span class=\"T\">\n                "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Related_as)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = ((stack1 = depth0.roleModel),stack1 == null || stack1 === false ? stack1 : stack1.role_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " \n                <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n                <ul class=\"options\">\n                  ";
  stack2 = helpers.each.call(depth0, depth0.roles, {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </ul>\n              </span>\n            </div>\n          </div>\n          <div class=\"right\">\n            <button class=\"do-removeActor\">\n              <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Remove)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </button>\n          </div>\n          <div class=\"clearer\">&nbsp;</div>\n        </div>\n      </div>\n   </div> \n</div>\n";
  return buffer;
  })

});