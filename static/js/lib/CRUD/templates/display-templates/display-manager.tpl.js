define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-wireframe=\"";
  if (stack1 = helpers.entity) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entity; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-view\" class=\"";
  if (stack1 = helpers.entity) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entity; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-view overlay WIREFRAME\">\n  <div class=\"header\">\n    <a href=\"#\" class=\"display do-hide is-small\">\n      <span aria-hidden=\"true\" data-icon=\"x\"></span>\n      <span class=\"screen-reader-text\">Hide</span>\n    </a>\n  </div>\n  <div class=\"body ";
  if (stack1 = helpers.entity) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entity; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-container\">\n  </div>\n  <div class=\"footer actions\">\n    <div class=\"when-overlay-expanded\">\n      <button class=\"do-collapse\">\n        <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Collapse)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " »</span>\n      </button>\n    </div>\n    <div class=\"when-overlay-not_expanded\">\n      <button class=\"do-expand\">\n        <span class=\"text T\">« "
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Expand)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </button>\n    </div>\n      <button class=\"do-select\">\n        <div class=\"selection\">\n          <span class=\"selected hidden\">\n            <span aria-hidden=\"true\" data-icon=\"&#x54;\"></span>\n            <span class=\"screen-reader-text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.selected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </span>\n          <span class=\"unselected\">\n            <span class=\"screen-reader-text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.unselected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </span>\n        </div>\n        <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Select)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </button>\n      <button class=\"do-edit edit default\">\n        <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.Edit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </button>\n  </div>\n</div>\n";
  return buffer;
  })

});