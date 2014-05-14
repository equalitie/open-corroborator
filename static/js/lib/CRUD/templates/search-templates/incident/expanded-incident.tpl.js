define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <span class=\"id\">\n          ID <span id=\"view-actor-id\" class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.django_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </span>\n        ";
  return buffer;
  }

  buffer += "<div class=\"header\">\n  <button class=\"do-hide is-small\">\n    <span class=\"T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.close)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </button>\n</div>\n<div class=\"body\" style=\"bottom: 49px;\">\n  <div class=\"Incident is-edited is-expanded\">\n    <div class=\"first span-66p\">\n      <div class=\"header\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <div class=\"field is-title\">\n          <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n          <span class=\"i18n with-en with-ar\">\n            <div lang=\"en\">\n              <textarea \n                id=\"incident_title_en\"\n                type=\"text\"\n                name=\"title_en\"\n                class=\"incident-field\n                w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n            </div>\n            <div lang=\"ar\">\n              <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n              <textarea \n                id=\"incident_title_ar\"\n                name=\"title_ar\"\n                type=\"text\"\n                class=\"incident-field\n                w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n            </div>\n            <span class=\"toggle\">\n              <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n          </span>\n        </div>\n      </div>\n    </div>\n    <div class=\"last span-33p\">\n      <div class=\"group details\">\n        <div class=\"field clear-after\">\n\n          <!-- score slider -->\n          <div id=\"incident-score-block\" class=\"is-score right\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Reliability_Score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <span class=\"score\">\n\n              <span id=\"incident_confidence_score\" class=\"value\">\n                "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n              </span>\n              <input type=\"hidden\" \n                      class=\"incident-field\"\n                      name=\"confidence_score\"\n                      value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n              <div class=\"score-editor\">\n                <div class=\"rail\">\n                  <div class=\"slider\"></div>  \n                  <!-- <div class=\"cursor\">&nbsp;</div> -->\n                  <div class=\"axis\">\n                    <div class=\"start\">\n                      <span class=\"label\">0%</span>\n                    </div>\n                    <div class=\"middle\">\n                      <span class=\"label\">50%</span>\n                    </div>\n                    <div class=\"end\">\n                      <span class=\"label\">100%</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </span>\n          </div>\n              \n          <!-- Assigned to user -->\n          <div id=\"incident-assignment-block\" class=\"incidentAssigned left\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Assigned_to)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n\n            <input type=\"text\" class=\"with-clear is-assigned-to\"\n              value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_assigned)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <input type=\"hidden\" name=\"assigned_user\"\n              value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n\n          <button id=\"clear-user\" class=\"do-clear\">\n            <span>✓</span>\n          </button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"first span-66p\">\n\n      <!-- end header -->\n      <div class=\"body\">\n\n        <!-- Incident Crimes -->\n        <div id=\"incident-crime-block\" class=\"field is-crimes\">\n          <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Crime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n          <ul class=\"crimes editor\">\n\n            <li class=\"crime is-new\">\n              <input type=\"text\" value=\"Crime\" class=\"with-select crimes-ac\">\n            </li>\n          </ul>\n        </div>\n\n        <!-- Description -->\n        <div id=\"incident-description-block\" class=\"field is-description\">\n          <div class=\"i18n with-en with-ar\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <div lang=\"en\">\n              <textarea \n                id=\"incident_details_en\"\n                name=\"incident_details_en\"\n                class=\"incident-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n            </div>\n            <div lang=\"ar\">\n              <textarea \n                id=\"incident_details_ar\"\n                name=\"incident_details_ar\"\n                class=\"incident-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n            </div>\n            <span class=\"toggle\">\n              <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n          </div>\n        </div>\n\n        <!-- comments -->\n        <div id=\"incident-comment-block\" class=\"field is-comments\">\n        </div>\n\n          <!-- Actor selection -->\n        <div id=\"incident-actor-list-block\" class=\"field is-actors\">\n        </div>\n\n        <!-- Bulletin selection block -->\n        <div id=\"incident-bulletin-block\" class=\"field is-bulletins\">\n        </div>\n\n        <!-- Incident selection block -->\n        <div id=\"incident-incident-block\" class=\"field is-incidents\">\n        </div>\n\n      </div>\n    </div>\n    <!-- second column -->\n    <div class=\"last span-33p\">\n      <div class=\"body\">\n\n        <!-- events -->\n        <div id=\"incident-event-block\" class=\"field is-events clear\">\n        </div>\n\n        <!-- Locations -->\n        <div id=\"incident-location-block\" class=\"field is-locations\">\n        </div>\n        <!-- map block -->\n        <div id=\"incident-map-block\" class=\"field\"></div>\n\n\n        <!-- incident labels -->\n        <div id=\"incident-location-block\" class=\"field is-tags\">\n        </div>\n\n      </div>\n    </div>\n    <div class=\"clearer\"></div>\n  </div>\n</div>\n<div class=\"footer with-revision\">\n  <div class=\"actions clear-after when-not_revision\">\n    <div class=\"left\">\n      <div class=\"when-overlay-expanded\">\n        <button class=\"do-collapse-form\">\n          <span class=\"text t\">» "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Collapse)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </button>\n      </div>\n      <div class=\"when-overlay-not_expanded\">\n        <button class=\"do-expand-form\">\n          <span class=\"text t\">« "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Expand)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </button>\n      </div>\n    </div>\n    <div class=\"right\">\n      <button id=\"incident-action_save\" class=\"do-save do-toggleRevision default\">\n        <span class=\"text t\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Save)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </button>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  })

});