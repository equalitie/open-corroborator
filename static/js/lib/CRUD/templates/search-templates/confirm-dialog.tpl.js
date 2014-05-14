define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.dialog)),stack1 == null || stack1 === false ? stack1 : stack1.Close_edit_form)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <p><span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin: 0 7px 20px 0;\"></span>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.dialog)),stack1 == null || stack1 === false ? stack1 : stack1.Any_changes_you_have_made_on_the_form_will_be_lost_Are_you_sure)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n</div>\n";
  return buffer;
  })

});