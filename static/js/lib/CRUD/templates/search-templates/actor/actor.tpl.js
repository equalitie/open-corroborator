define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <span class=\"id\">\n            ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </span>\n          ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div id=\"actor-assignment-block\" class=\"field actorAssigned\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Assigned_to)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n\n            <input type=\"text\" class=\"with-clear is-assigned-to\"\n              value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actor_assigned_user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <input\n              type=\"hidden\"\n              name=\"assigned_user\"\n              class=\"actor-field\"\n              value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n\n          </div>\n          ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Age)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                    ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchCivilian || depth0.fetchCivilian),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian), options) : helperMissing.call(depth0, "fetchCivilian", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian), options)))
    + "\n                  ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Civilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <option value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.createStatus),stack1 == null || stack1 === false ? stack1 : stack1.resource_uri)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.createStatus),stack1 == null || stack1 === false ? stack1 : stack1.comment_status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                ";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <option value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.statuses),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.resource_uri)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.statuses),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.comment_status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  ";
  stack1 = helpers.each.call(depth0, depth0.statuses, {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                  ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <option\n                      value=\""
    + escapeExpression(((stack1 = depth0.resource_uri),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    >"
    + escapeExpression(((stack1 = depth0.comment_status),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                  ";
  return buffer;
  }

  buffer += "  <div class=\"header\">\n    <a href=\"#\" class=\"form do-hide is-small\">\n      <span aria-hidden=\"true\" data-icon=\"&#x78\"></span>\n      <span class=\"screen-reader-text\">Hide</span>\n    </a>\n  </div>\n  <div class=\"body\" style=\"bottom: 49px;\">\n    <div class=\"first initial span-66p\">\n    <!-- switch class here is-expanded -> in-preview -->\n      <div class=\"Actor is-edited is-expanded\">\n        <div class=\"header\">\n          <!-- id field - hide for new actor -->\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          <!-- actor name -->\n          <div class=\"field clear-after hide-multiple\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <p class=\"error-text\">\n              "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Name_must_be_entered)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </p>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <input type=\"text\"\n                       name=\"fullname_en\"\n                       id=\"fullname_en\"\n                       value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                       class=\"required actor-field w-100p\">\n              </div>\n              <!--\n              <div lang=\"ar\">\n                <input type=\"text\" name=\"fullname_ar\" id=\"fullname_ar\"\n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n          </div>\n          <!-- description -->\n          <div id=\"actor-description-block\" class=\"field is-description hide-multiple\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <div class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <textarea id=\"actor_description_en\"\n                          name=\"description_en\"\n                          type=\"text\"\n                          class=\"actor-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <!--\n              <div lang=\"ar\">\n                <textarea id=\"actor_description_ar\"\n                          name=\"description_ar\"\n                          type=\"text\"\n                          class=\"actor-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span>\n                <span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </div>\n          </div>\n\n          <!-- actor nickname -->\n          <div class=\"field clear-after hide-multiple\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nickname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <input type=\"text\" name=\"nickname_en\" id=\"nickname_en\"\n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <!--\n              <div lang=\"ar\">\n                <input type=\"text\" name=\"nickname_ar\" id=\"nickname_ar\"\n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n          </div>\n\n          <!-- Place of birth -->\n          <div id=\"actor-condition-block\" class=\"field hide-multiple\">\n          </div>\n\n          <!-- Assigned to user -->\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.perms),stack1 == null || stack1 === false ? stack1 : stack1.can_assign_users), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n        </div>\n        <!-- end header -->\n\n        <!-- start body -->\n        <div class=\"body\">\n          <div class=\"group details\">\n            <div class=\"field span-33p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"sex\" class=\"button combo\">\n\n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n                </span>\n                <input name=\"sex\" type=\"hidden\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"class=\"actor-field\">\n\n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span data-val=\"Male\" class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Male)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span data-val=\"Female\" class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Female)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"field span-33p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.ChildAdult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"age\" class=\"button combo\">\n\n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n                </span>\n                <input name=\"age\" type=\"hidden\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field\">\n\n\n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span data-val=\"Child\" class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Child)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span data-val=\"Adult\" class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Adult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"field span-33p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.CivilianNoncivilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"civilian\" class=\"button combo\">\n\n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n                </span>\n                <input type=\"hidden\" name=\"civilian\" value=\"\" class=\"actor-field\">\n\n\n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span data-val=\"Civilian\" class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Civilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span data-val=\"Non-civilian\" class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Noncivilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span data-val=\"Police\" class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Police)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n\n          <!-- Date of birth -->\n          <div class=\"field clear-after is-birthdate field hide-multiple\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Date_Of_Birth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" name=\"DOB\" value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formDateFormat || depth0.formDateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options) : helperMissing.call(depth0, "formDateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options)))
    + "\"\n            class=\"w-50p actor-field\"/>\n          </div>\n\n          <!-- Place of birth -->\n          <div id=\"actor-pob-block\" class=\"field hide-multiple\">\n          </div>\n\n          <!-- map block -->\n          <div id=\"actor-pob-map-block\" class=\"field hide-multiple\"></div>\n\n          <!-- Current Location -->\n          <div id=\"actor-current-location-block\" class=\"field\"></div>\n\n          <!-- map block -->\n          <div id=\"actor-current-map-block\" class=\"field\"></div>\n\n          <!-- Occupation -->\n          <div class=\"field is-occupation\">\n            <span class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Occupation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"actor-field with-select w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"occupation_en\"\n                        id=\"actor_occupation_en\">\n                </div>\n               <!--\n                <div lang=\"ar\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Occupation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"actor-field with-select w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"occupation_ar\"\n                        id=\"actor_occupation_ar\">\n                </div>\n                <span class=\"toggle\">\n                    <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n                </span>\n                -->\n            </span>\n          </div>\n\n          <!-- Position -->\n          <div class=\"field is-position\">\n            <span class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                  <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Position_rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"with-select actor-field w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"position_en\"\n                        id=\"actor_position_en\" >\n\n                </div>\n                <!--\n                <div lang=\"ar\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Position_rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"with-select actor-field w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"position_ar\"\n                        id=\"actor_position_ar\" >\n                </div>\n                <span class=\"toggle\">\n                    <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n                </span>\n                -->\n            </span>\n          </div>\n\n          <!-- Ethnicity -->\n          <div class=\"field is-ethnicity\">\n            <span class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Ethnicity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"with-select actor-field w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"ethnicity_en\"\n                        id=\"actor_ethnicity_en\" >\n                </div>\n                <!--\n                <div lang=\"ar\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Ethnicity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"with-select actor-field w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"ethnicity_ar\"\n                        id=\"actor_ethnicity_ar\" >\n                </div>\n                <span class=\"toggle\">\n                    <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n                </span>\n                -->\n            </span>\n          </div>\n\n          <!-- Nationality -->\n          <div class=\"field is-nationality\">\n            <span class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nationality)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"with-select actor-field w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"nationality_en\"\n                        id=\"actor_nationality_en\">\n                </div>\n                <!--\n                <div lang=\"ar\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nationality)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                        class=\"with-select actor-field w-30p\"\n                        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                        name=\"nationality_ar\"\n                        id=\"actor_nationality_ar\">\n                </div>\n                <span class=\"toggle\">\n                    <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n                </span>\n                -->\n            </span>\n          </div>\n\n          <!-- Religion -->\n          <div class=\"field is-religion\">\n            <span class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Religion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                    class=\"with-select actor-field w-30p\"\n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    name=\"religion_en\"\n                    id=\"actor_religion_en\" >\n                </div>\n                <!--\n                <div lang=\"ar\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Religion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                    class=\"with-select actor-field w-30p\"\n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    name=\"religion_ar\"\n                    id=\"actor_religion_ar\" >\n                </div>\n                <span class=\"toggle\">\n                    <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n                </span>\n                -->\n            </span>\n          </div>\n\n          <!-- Spoken Dialects -->\n          <div class=\"field is-dialect\">\n            <span class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Spoken_dialects)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                    class=\"with-select actor-field w-30p\"\n                    name=\"spoken_dialect_en\"\n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    id=\"actor_spoken_dialect_en\" >\n                </div>\n                <!--\n                <div lang=\"ar\">\n                    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Spoken_dialects)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n                    <input type=\"text\"\n                    class=\"with-select actor-field w-30p\"\n                    name=\"spoken_dialect_ar\"\n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    id=\"actor_spoken_dialect_ar\" >\n                </div>\n                <span class=\"toggle\">\n                    <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n                </span>\n                -->\n            </span>\n          </div>\n\n          <!-- Actor Field -->\n          <div id=\"actor-actor-list-block\" class=\"field is-actors\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Actors)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label><br />\n            <div id=\"actor-actor-search-block\" class=\"search\">\n              <input type=\"text\" class=\"with-clear\">\n              <button class=\"do-clear\">\n                <span>✓</span>\n              </button>\n              <button class=\"do-search do-search-embedded actors\">\n                <span>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Search)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n              </button>\n            </div>\n            <ul class=\"elements elements-actor\">\n            </ul>\n          </div>\n\n          <!-- media search - search for actor images -->\n          <div id=\"actor-media-block\" class=\"field is-media hide-multiple\">\n          </div>\n\n          <div id=\"actor-version-block\" class=\"\">\n            <div id=\"actor-status-block\" class=\"field add\">\n              <p class=\"error-text\">\n                "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Select_a_status_for_this_actor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n              </p>\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <select name=\"status_uri\"\n                      id=\"status\"\n                      class=\"required actor-field\">\n                ";
  stack2 = helpers['if'].call(depth0, depth0.isNew, {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                ";
  stack2 = helpers.unless.call(depth0, depth0.isNew, {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              </select>\n              <input class=\"actor-field\" type=\"hidden\" name=\"status\" value=\"\">\n            </div>\n\n            <div class=\"clearer\"></div>\n            <!-- Comment content field -->\n            <div id=\"actor-status-comment\" class=\"add field\">\n\n              <p class=\"error-text\">\n                "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Comment_field_is_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n              </p>\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Comment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <textarea\n                id=\"comment\"\n                name=\"comment\"\n                class=\"required actor-field w-100p\"></textarea>\n\n            </div>\n          </div>\n          <!-- end version info -->\n\n        </div>\n      </div>\n    <div class=\"clearer\"></div>\n  </div>\n  <!-- show revision details -->\n  <div class=\"revision-container\"></div>\n</div>\n<div class=\"footer actions form\">\n  <div class=\"when-overlay-expanded\">\n    <button class=\"do-collapse-form\">\n      <span class=\"text t\">» "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Collapse)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </button>\n  </div>\n  <div class=\"when-overlay-not_expanded\">\n    <button class=\"do-expand-form\">\n      <span class=\"text t\">« "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Expand)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </button>\n  </div>\n  <button id=\"expanded-actor-save\" class=\"do-save\">\n    <span class=\"text t\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Save)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </button>\n</div>\n";
  return buffer;
  })

});