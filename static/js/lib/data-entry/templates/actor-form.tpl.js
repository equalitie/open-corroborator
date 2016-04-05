define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <span class=\"id\">\n            ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </span>\n          ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n                    Sex\n                  ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Age)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Civilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div id=\"actor-status-comment-block\" class=\"field add\">\n            <p class=\"error-text\">\n              "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Comment_field_is_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </p>\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Comment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <textarea \n              id=\"comment\"\n              name=\"comment\"\n              class=\"required actor-field w-100p\"></textarea>\n          </div>\n          ";
  return buffer;
  }

  buffer += "  <div class=\"header\">\n    <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n  </div>\n  <div class=\"body\" style=\"bottom: 49px;\">\n    <div class=\"Actor is-edited is-expanded\">\n    <div class=\"first initial span-66p\">\n    <!-- switch class here is-expanded -> in-preview -->\n      <div class=\"Actor is-edited is-expanded\">\n        <div class=\"header\">\n          <!-- id field - hide for new actor -->\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          <!-- actor name -->\n          <div class=\"field clear-after hide-multiple\">\n            <label>Name</label>\n            <p class=\"error-text\">\n              "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Name_must_be_entered)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </p>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <input type=\"text\"\n                       name=\"fullname_en\"\n                       id=\"fullname_en\"\n                       value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                       class=\"required actor-field w-100p\">\n              </div>\n              <!--\n              <div lang=\"ar\">\n                <input type=\"text\" name=\"fullname_ar\" id=\"fullname_ar\"\n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n          </div>\n\n          <!-- actor nickname -->\n          <div class=\"field clear-after hide-multiple\">\n            <label>Nickname</label>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <input type=\"text\" name=\"nickname_en\" id=\"nickname_en\"\n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <!--\n              <div lang=\"ar\">\n                <input type=\"text\" name=\"nickname_ar\" id=\"nickname_ar\"\n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n          </div>\n\n        </div>\n        <!-- end header -->\n\n        <!-- start body -->\n        <div class=\"body\">\n          <div class=\"group details\">\n            <div class=\"field span-28p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"sex_en\" class=\"button combo\">\n        \n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n                </span>\n                <input name=\"sex_en\" type=\"hidden\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"class=\"actor-field\">\n        \n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Male)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Female)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"field span-28p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.ChildAdult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"age_en\" class=\"button combo\">\n        \n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n                </span>\n                <input name=\"age_en\" type=\"hidden\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field\">\n        \n\n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Child)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Adult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"field span-28p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.CivilianNoncivilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"civilian_en\" class=\"button combo\">\n        \n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian_en), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                <span aria-hidden=\"true\" data-icon=\"&#x64;\"></span>\n                </span>\n                <input type=\"hidden\" name=\"civilian_en\" value=\"\" class=\"actor-field\">\n        \n\n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Civilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Noncivilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n\n          <!-- Date of birth -->\n          <div class=\"field clear-after is-birthdate field hide-multiple\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Date_Of_Birth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" name=\"DOB\" value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formDateFormat || depth0.formDateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options) : helperMissing.call(depth0, "formDateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options)))
    + "\"\n            class=\"w-50p actor-field\"/>\n          </div>\n\n          <!-- Place of birth -->\n          <div id=\"actor-pob-block\" class=\"field hide-multiple\">\n          </div>\n\n          <!-- map block -->\n          <div id=\"actor-pob-map-block\" class=\"field hide-multiple\"></div>\n\n          <!-- Current Location -->\n          <div id=\"actor-current-location-block\" class=\"field\"></div>\n\n          <!-- map block -->\n          <div id=\"actor-current-map-block\" class=\"field\"></div>\n\n          <!-- media search - search for actor images -->\n          <div id=\"actor-media-block\" class=\"field is-media hide-multiple\">\n          </div>\n\n          <!-- Update Comment content field -->\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n        </div>\n      </div>\n    <div class=\"clearer\"></div>\n  </div>\n  <div class=\"last span-33p\">\n    <div class=\"body\">\n      <!-- Occupation -->\n      <div class=\"field is-occupation\">\n        <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Occupation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        <span class=\"i18n with-en with-ar\">\n            <div lang=\"en\">\n                <input type=\"text\" \n                    class=\"actor-field with-select\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n                    name=\"occupation_en\" \n                    id=\"actor_occupation_en\">\n            </div>\n            <!--\n            <div lang=\"ar\">\n                <input type=\"text\" \n                    class=\"actor-field with-select\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n                    name=\"occupation_ar\" \n                    id=\"actor_occupation_ar\">\n            </div>\n            <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n            -->\n        </span>  \n      </div>\n\n      <!-- Position -->\n      <div class=\"field is-position\">\n        <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Position_rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        <span class=\"i18n with-en with-ar\">\n            <div lang=\"en\">\n                <input type=\"text\" \n                    class=\"with-select actor-field\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n                    name=\"position_en\" \n                    id=\"actor_position_en\" >\n\n            </div>\n            <!--\n            <div lang=\"ar\">\n                <input type=\"text\" \n                    class=\"with-select actor-field\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n                    name=\"position_ar\" \n                    id=\"actor_position_ar\" >\n            </div>\n            <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n            -->\n        </span>      \n      </div>\n\n      <!-- Ethnicity -->\n      <div class=\"field is-ethnicity\">\n        <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Ethnicity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        <span class=\"i18n with-en with-ar\">\n            <div lang=\"en\">\n                <input type=\"text\" \n                    class=\"with-select actor-field\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    name=\"ethnicity_en\" \n                    id=\"actor_ethnicity_en\" >\n            </div>\n            <!--\n            <div lang=\"ar\">\n                <input type=\"text\" \n                    class=\"with-select actor-field\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    name=\"ethnicity_ar\" \n                    id=\"actor_ethnicity_ar\" >\n            </div>\n            <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n            -->\n        </span>\n      </div>\n\n      <!-- Nationality -->\n      <div class=\"field is-nationality\">\n        <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nationality)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        <span class=\"i18n with-en with-ar\">\n            <div lang=\"en\">\n                <input type=\"text\" \n                    class=\"with-select actor-field\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    name=\"nationality_en\" \n                    id=\"actor_nationality_en\">\n            </div>\n            <!--\n            <div lang=\"ar\">\n                <input type=\"text\" \n                    class=\"with-select actor-field\" \n                    value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                    name=\"nationality_ar\" \n                    id=\"actor_nationality_ar\">\n            </div>\n            <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n            -->\n        </span>    \n      </div>\n\n      <!-- Religion -->\n      <div class=\"field is-religion\">\n        <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Religion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        <span class=\"i18n with-en with-ar\">\n            <div lang=\"en\">\n                <input type=\"text\" \n                class=\"with-select actor-field\" \n                value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                name=\"religion_en\" \n                id=\"actor_religion_en\" >\n            </div>\n            <!--\n            <div lang=\"ar\">\n                <input type=\"text\" \n                class=\"with-select actor-field\" \n                value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                name=\"religion_ar\" \n                id=\"actor_religion_ar\" >\n            </div>\n            <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n            -->\n        </span>          \n      </div>\n\n      <!-- Spoken Dialects -->\n      <div class=\"field is-dialect\">\n        <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Spoken_dialects)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        <span class=\"i18n with-en with-ar\">\n            <div lang=\"en\">\n                <input type=\"text\" \n                class=\"with-select actor-field \" \n                name=\"spoken_dialect_en\"\n                value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n                id=\"actor_spoken_dialect_en\" >\n            </div>\n            <!--\n            <div lang=\"ar\">\n                <input type=\"text\" \n                class=\"with-select actor-field\" \n                name=\"spoken_dialect_ar\"\n                value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n                id=\"actor_spoken_dialect_ar\" >\n            </div>\n            <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n            -->\n        </span>          \n      </div>\n    </div>\n    </div>\n      <input type=\"button\" class=\"save-data-entry\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Save)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  </div>\n</div>\n";
  return buffer;
  })

});