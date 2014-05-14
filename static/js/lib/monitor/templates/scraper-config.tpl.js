define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <tr class=\"field\">\n    <td>";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n    <td>\n      <input \n        ";
  stack1 = helpers['if'].call(depth0, depth0.enabled, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        type=\"checkbox\"\n        id=\"";
  if (stack1 = helpers.site) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.site; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n        name=\"";
  if (stack1 = helpers.site) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.site; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n        value=\"true\"\n        class=\"scraper-field\"\n        >\n    </td>\n  </tr>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "checked";
  }

  buffer += "<table>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.actor_csv_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.actor_dir_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input\n        type=\"text\"\n        name=\"actors_dir\"\n        id=\"actors_dir\"\n        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n        class=\"required scraper-field\"></td>\n    </tr>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_csv_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_dir_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input\n      type=\"text\"\n      name=\"bulletins_dir\"\n      id=\"bulletins_dir\"\n      value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletins_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n      class=\"required scraper-field\"></td>\n    </tr>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.set_job_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.job_time_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input\n      type=\"text\"\n      name=\"next_job_time\"\n      id=\"next_job_time\"\n      value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateTimeFormat || depth0.dateTimeFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.next_job_time), options) : helperMissing.call(depth0, "dateTimeFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.next_job_time), options)))
    + "\"\n      class=\"required scraper-field\"></td>\n    </tr>\n  <tr>\n    <td><b>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.scraper)),stack1 == null || stack1 === false ? stack1 : stack1.enable_scrapers)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></td>\n  </tr>\n  ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.scrapers), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  <tr>\n    <td></td>\n    <td>\n      <input\n      type=\"submit\"\n      value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.save_config)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </td>\n  </tr>\n</table>\n\n";
  return buffer;
  })

});