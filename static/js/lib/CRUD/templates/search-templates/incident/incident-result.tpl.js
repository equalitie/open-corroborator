define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"when-expanded\">\n    <div class=\"actions\">\n      <div class=\"left\">\n        <button class=\"do-relate\">\n          <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Relate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </button>\n      </div>\n      <div class=\"clearer\">&nbsp;</div>\n    </div>\n  </div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"when-related\">\n    <div class=\"actions\">\n      <div class=\"right\">\n        <button class=\"do-remove\">\n          <span class=\"text T\"> "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.incident)),stack1 == null || stack1 === false ? stack1 : stack1.Remove)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </button>\n      </div>\n      <div class=\"clearer\"> &nbsp;</div>\n    </div>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"Incident in-list embedded\">\n  <div class=\"L1\">\n    <div class=\"meta\">\n      <div class=\"score\">\n        <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n      <div class=\"status\">\n        <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n    </div>\n    <div class=\"title i18n\">\n      <span lang=\"en\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      <!--\n      <span lang=\"ar\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      <span class=\"toggle\">\n        <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n      </span>\n      -->\n    </div>\n  </div>\n  <div class=\"L3\">\n    <div class=\"date-location\">\n      <span class=\"date\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormatTZ || depth0.dateFormatTZ),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options) : helperMissing.call(depth0, "dateFormatTZ", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options)))
    + "</span> in <span class=\"location\">Damas, Syriah</span>\n    </div>\n  </div>\n  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.result), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n";
  return buffer;
  })

});