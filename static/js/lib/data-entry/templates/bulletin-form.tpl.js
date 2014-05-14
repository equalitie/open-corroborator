define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <span class=\"id\">\n            ID <span id=\"view-bulletin-id\" class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </span>\n          ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div id=\"bulletin-status-comment-block\" class=\"field add\">\n            <p class=\"error-text\">\n              "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Comment_field_is_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </p>\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Comment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <textarea \n              id=\"comment\"\n              name=\"comment\"\n              class=\"required bulletin-field w-100p\"></textarea>\n          </div>\n          ";
  return buffer;
  }

  buffer += "  <div class=\"header\">\n    <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n  </div>\n  <div class=\"body\" style=\"bottom: 49px;\">\n    <div class=\"Bulletin is-edited is-expanded\">\n      <div class=\"first initial span-66p\">\n        <div class=\"header\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          <div class=\"field is-title hide-multiple\">\n            <p class=\"error-text\">\n              "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Title_field_is_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </p>\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n              <textarea \n                id=\"incident_title_en\"\n                type=\"text\"\n                name=\"title_en\"\n                class=\"required bulletin-field \n                w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n            </div>\n            <div lang=\"ar\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <textarea \n                id=\"incident_title_ar\"\n                name=\"title_ar\"\n                type=\"text\"\n                class=\"bulletin-field\n                w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class=\"last initial span-33p\">\n        <div class=\"group details\">\n          <div class=\"field clear-after\">\n\n            <!-- score slider -->\n            <div id=\"bulletin-score-block\" class=\"is-score right\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <div class=\"score\">\n\n                <span id=\"bulletin_confidence_score\" class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                <input type=\"hidden\" \n                       name=\"confidence_score\"\n                       value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                       class=\"bulletin-field\">\n\n                <div class=\"score-editor\">\n\n                  <div class=\"rail\">\n                    <div class=\"slider\">\n                    </a>\n                    </div>  \n                    <!-- <div class=\"cursor\">&nbsp;</div> -->\n                    <div class=\"axis\">\n                      <div class=\"start\">\n                        <span class=\"label\">0%</span>\n                      </div>\n                      <div class=\"middle\">\n                        <span class=\"label\">50%</span>\n                      </div>\n                      <div class=\"end\">\n                        <span class=\"label\">100%</span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <!-- end score slider -->\n\n          </div>\n        </div>\n      </div>\n      <div class=\"first span-66p\">\n        <div class=\"body\">\n\n          <!-- Sources field -->\n          <div id=\"bulletin-source-block\" class=\"field is-sources\">\n          </div>\n          <!-- Labels field -->\n          <div id=\"bulletin-label-block\" class=\"field is-tags\"> </div>\n\n          <div id=\"bulletin-media-block\" class=\"field is-media hide-multiple\">\n          </div>\n        \n          <!-- description -->\n          <div id=\"bulletin-description-block\" class=\"field is-description hide-multiple\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <div class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <textarea id=\"bulletin_description_en\"\n                          name=\"bulletin_description_en\"\n                          type=\"text\"\n                          class=\"bulletin-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <div lang=\"ar\">\n                <textarea id=\"bulletin_description_ar\"\n                          name=\"bulletin_description_ar\"\n                          type=\"text\"\n                          class=\"bulletin-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span>\n                <span lang=\"ar\">AR</span>\n              </span>\n            </div>\n          </div>\n          <!-- location block -->\n          <div id=\"bulletin-location-block\" class=\"field is-locations\">\n          </div>\n\n          <!-- map block -->\n          <div id=\"bulletin-map-block\" class=\"is-bulletin-map field\"></div>\n\n          <!-- Related Actors -->\n          <div id=\"bulletin-actor-list-block\" class=\"field is-actors\">\n          </div>\n\n          <!-- Related bulletins -->\n          <div id=\"bulletin-bulletin-block\" class=\"field is-bulletins\">\n          </div>\n\n\n          <!-- Update Comment content field -->\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n        </div>\n      </div>\n      <!-- end first col -->\n      <div class=\"last span-33p\">\n        <div class=\"body\">\n\n          <!-- Event block -->\n          <div id=\"bulletin-comment-block\" class=\"field is-comments hide-multiple clear\">\n          </div>\n\n          <!-- Event block -->\n          <div id=\"bulletin-event-block\" class=\"field is-events hide-multiple clear\">\n          </div>\n\n\n\n        </div>\n      </div>\n      <input type=\"button\" class=\"save-data-entry\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Save)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n\n  </div>\n";
  return buffer;
  })

});