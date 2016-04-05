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
  
  var buffer = "", stack1;
  buffer += "\n                    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                  ";
  return buffer;
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

  buffer += "  <div class=\"header\">\n    <button class=\"do-hide is-small\">\n      <span class=\"t\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Hide)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </button>\n  </div>\n  <div class=\"body\" style=\"bottom: 49px;\">\n    <div class=\"first span-66p\">\n      <!-- switch class here is-expanded -> in-preview -->\n      <div class=\"Actor is-edited is-expanded\">\n        <div class=\"header\">\n          <!-- id field - hide for new actor -->\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          <!-- actor name -->\n          <div class=\"field clear-after\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <input type=\"text\" name=\"fullname_en\" id=\"fullname_en\" \n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <!--\n              <div lang=\"ar\">\n                <input type=\"text\" name=\"fullname_ar\" id=\"fullname_ar\"\n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n          </div>\n\n          <!-- actor nickname -->\n          <div class=\"field clear-after\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nickname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <input type=\"text\" name=\"nickname_en\" id=\"nickname_en\" \n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <!--\n              <div lang=\"ar\">\n                <input type=\"text\" name=\"nickname_ar\" id=\"nickname_ar\" \n                  value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field w-100p\">\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n              -->\n            </span>\n          </div>\n\n        </div>\n        <!-- end header -->\n\n        <!-- start body -->\n        <div class=\"body\">\n          <div class=\"group details\">\n            <div class=\"field span-33p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Sex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"sex_en\" class=\"button combo\">\n        \n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </span>\n                <input name=\"sex_en\" type=\"hidden\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"class=\"actor-field\">\n        \n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Male)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Female)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"field span-33p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.ChildAdult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"age_en\" class=\"button combo\">\n        \n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </span>\n                <input name=\"age_en\" type=\"hidden\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"actor-field\">\n        \n\n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Child)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Adult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class=\"field span-33p\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.CivilianNoncivilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div id=\"civilian_en\" class=\"button combo\">\n        \n                <span class=\"T selected-option\">\n                  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian_en), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </span>\n                <input type=\"hidden\" name=\"civilian_en\" value=\"\" class=\"actor-field\">\n        \n\n                <ul class=\"options\">\n                  <li class=\"option selected\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Civilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                  <li class=\"option\">\n                    <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Noncivilian)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n\n          <!-- Date of birth -->\n          <div class=\"field clear-after is-birthdate field \">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Date_of_birth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" name=\"DOB\" value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formDateFormat || depth0.formDateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options) : helperMissing.call(depth0, "formDateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.DOB), options)))
    + "\"\n            class=\"w-50p actor-field\"/>\n          </div>\n\n          <!-- Place of birth -->\n          <div id=\"actor-pob-block\" class=\"field\">\n          </div>\n\n          <!-- map block -->\n          <div id=\"actor-pob-map-block\" class=\"field\"></div>\n\n          <!-- Current Location -->\n          <div id=\"actor-current-location-block\" class=\"field\"></div>\n\n          <!-- map block -->\n          <div id=\"actor-current-map-block\" class=\"field\"></div>\n\n          <!-- Occupation -->\n          <div class=\"field is-occupation\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Occupation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" class=\"actor-field with-select w-30p\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.occupation_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n              name=\"occupation_en\" id=\"actor_occupation_en\">\n          </div>\n\n          <!-- Position -->\n          <div class=\"field is-position\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Position_rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" class=\"with-select actor-field w-30p\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n              name=\"position_en\" id=\"actor_position_en\" >\n          </div>\n\n          <!-- Ethnicity -->\n          <div class=\"field is-ethnicity\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Ethnicity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" class=\"with-select actor-field w-30p\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n              name=\"ethnicity_en\" id=\"actor_ethnicity_en\" >\n          </div>\n\n          <!-- Nationality -->\n          <div class=\"field is-nationality\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Nationality)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" class=\"with-select actor-field w-30p\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n              name=\"nationality_en\" id=\"actor_nationality_en\">\n          </div>\n\n          <!-- Religion -->\n          <div class=\"field is-religion\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Religion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" class=\"with-select actor-field w-30p\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n              name=\"religion_en\" id=\"actor_religion_en\" >\n          </div>\n\n          <!-- Spoken Dialects -->\n          <div class=\"field is-dialect\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Spoken_dialects)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <input type=\"text\" class=\"with-select actor-field w-30p\" name=\"spoken_dialect_en\"\n              value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"actor_spoken_dialect_en\" >\n          </div>\n\n          <!-- Actor Field -->\n          <div id=\"actor-actor-list-block\" class=\"field is-actors\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Actors)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <div id=\"actor-actor-search-block\" class=\"search\">\n              <input type=\"text\" class=\"with-clear\">\n              <button class=\"do-clear\">\n                <span>✓</span>\n              </button>\n              <button class=\"do-search do-search-embedded actors\">\n                <span>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.actor)),stack1 == null || stack1 === false ? stack1 : stack1.Search)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n              </button>\n            </div>\n            <ul class=\"elements elements-actor\">\n            </ul>\n          </div>\n\n          <!-- media search - search for actor images -->\n          <div id=\"actor-media-block\" class=\"field is-media\">\n          </div>\n\n        </div>\n      </div>\n      <div class=\"clearer\"></div>\n    </div>\n  </div>\n  <div class=\"footer actions\">\n    <div class=\"left\">\n      <div class=\"when-overlay-expanded\">\n        <button class=\"do-collapse-form\">\n          <span class=\"text t\">» "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Collapse)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </button>\n      </div>\n      <div class=\"when-overlay-not_expanded\">\n        <button class=\"do-expand-form\">\n          <span class=\"text t\">« "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Expand)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </button>\n      </div>\n    </div>\n    <div class=\"right\">\n      <button id=\"expanded-actor-save\" class=\"do-save\">\n        <span class=\"text t\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Save)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </button>\n    </div>\n  </div>\n";
  return buffer;
  })

});