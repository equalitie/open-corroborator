define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <div class=\"error-total\">\n      "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.num_errors)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.monitor)),stack1 == null || stack1 === false ? stack1 : stack1.errors)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n    ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.errors), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"error-title\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.monitor)),stack1 == null || stack1 === false ? stack1 : stack1.error)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"error-message\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div>\n    ";
  return buffer;
  }

  buffer += "<table>\n  <tr>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.monitor)),stack1 == null || stack1 === false ? stack1 : stack1.current_job_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n  </tr>\n  <tr>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.monitor)),stack1 == null || stack1 === false ? stack1 : stack1.start_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateTimeFormat || depth0.dateTimeFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.timestart), options) : helperMissing.call(depth0, "dateTimeFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.timestart), options)))
    + "</td>\n  </tr>\n  <tr>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.monitor)),stack1 == null || stack1 === false ? stack1 : stack1.number_files)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n  </tr>\n  <tr>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.monitor)),stack1 == null || stack1 === false ? stack1 : stack1.number_files_processed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.done)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n  </tr>\n  <tr>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.monitor)),stack1 == null || stack1 === false ? stack1 : stack1.time_taken)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatDuration || depth0.formatDuration),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.timetaken), options) : helperMissing.call(depth0, "formatDuration", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.timetaken), options)))
    + "</td>\n  </tr>\n</table>\n\n\n<div class=\"error-reporter\">\n  ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.num_errors), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n\n<div class=\"progress-container\">\n</div>\n";
  return buffer;
  })

});