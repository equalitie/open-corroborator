define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <div class=\"span-70p\">\n\n    <div class=\"i18n with-en with-ar\">\n      <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.event)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n      <div lang=\"en\">\n        <textarea name=\"event_name_en\"\n          class=\"w-100p ";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field bulletin_event-description\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.event_name_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n      <!--\n      <div lang=\"ar\">\n        <textarea name=\"event_name_ar\"\n          class=\"w-100p ";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field bulletin_event-description\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.event_name_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n      <span class=\"toggle\">\n        <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n      </span>\n      -->\n    </div>\n\n\n  </div>\n  <div class=\"clearer\">&nbsp;</div>\n  <div class=\"span-70p\">\n\n  <div class=\"i18n with-en with-ar\">\n      <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.event)),stack1 == null || stack1 === false ? stack1 : stack1.Comment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n      <div lang=\"en\">\n        <textarea\n          id=\"comments_en\"\n          name=\"comments_en\"\n          class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comments_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n      <!--\n      <div lang=\"ar\">\n        <textarea\n          id=\"comments_ar\"\n          name=\"comments_ar\"\n          class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comments_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n      <span class=\"toggle\">\n      <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n      </span>\n      -->\n  </div>\n\n\n  </div>\n\n\n  <div class=\"clearer\">&nbsp;</div>\n  <div class=\"span-70p\">\n    <span class=\"score\">\n      <span class=\"bulletin_event-cscore value\"></span>\n      <input type=\"hidden\" name=\"confidence_score\"\n        class=\"";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field\"\n        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n      >\n    </span>\n    <!-- Reliability score slider -->\n    <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.event)),stack1 == null || stack1 === false ? stack1 : stack1.Reliability_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n    <div class=\"score-editor\">\n      <div class=\"rail\">\n        <div class=\"slider\">\n        </div>\n      <!-- <div class=\"cursor\">&nbsp;</div> -->\n        <div class=\"axis\">\n          <div class=\"start\">\n            <span class=\"label\">0%</span>\n          </div>\n          <div class=\"middle\">\n            <span class=\"label\">50%</span>\n          </div>\n          <div class=\"end\">\n            <span class=\"label\">100%</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"clearer\">&nbsp;</div>\n  <div class=\"event-time-range\">\n  </div>\n  <div class=\"span-30p\">\n    <label></label><br/>\n    <div class=\"pad\">\n      <button class=\"do-addEvent\">\n        <span class=\"T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.event)),stack1 == null || stack1 === false ? stack1 : stack1.Save_Event)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </button>\n    </div>\n  </div>\n  <div class=\"clearer\">&nbsp;</div>\n";
  return buffer;
  })

});