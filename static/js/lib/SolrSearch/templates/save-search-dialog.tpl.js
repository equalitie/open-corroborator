define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <p class=\"validateTips form-error\"></p>\n  <fieldset>\n    <label for=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.dialog)),stack1 == null || stack1 === false ? stack1 : stack1.Search_title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n    <input type=\"text\"\n           name=\"search-title\" \n           id=\"search-title\"\n           class=\"text ui-widget-content ui-corner-all\" />\n    <label for =\"search-global\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.dialog)),stack1 == null || stack1 === false ? stack1 : stack1.Share_search_with_other_users)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n    <input type=\"checkbox\"\n           name=\"search-global\" \n           id=\"search-global\"\n           class=\"\" />\n  </fieldset>\n";
  return buffer;
  })

});