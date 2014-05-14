define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<form>\n  <table>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.media_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.media_directory_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input \n        type=\"text\"\n        name=\"media_dir\"\n        id=\"media_dir\"\n        value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_params)),stack1 == null || stack1 === false ? stack1 : stack1.media_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n        class=\"required importer-field\"></td>\n    </tr>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.actor_csv_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.actor_dir_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input\n        type=\"text\"\n        name=\"actors_dir\"\n        id=\"actors_dir\"\n        value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n        class=\"required importer-field\"></td>\n    </tr>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_csv_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_dir_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input\n      type=\"text\"\n      name=\"bulletins_dir\"\n      id=\"bulletins_dir\"\n      value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletins_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n      class=\"required importer-field\"></td>\n    </tr>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.mysql_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.mysql_dir_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input\n      type=\"text\"\n      name=\"mysql_dir\"\n      id=\"mysql_dir\"\n      value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.mysql_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n      class=\"required importer-field\"></td>\n    </tr>\n    <tr class=\"field\">\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.set_job_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>\n      <p class=\"error-text\">\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.job_time_required)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      </p>\n      <input\n      type=\"text\"\n      name=\"next_job_time\"\n      id=\"next_job_time\"\n      value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateTimeFormat || depth0.dateTimeFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.next_job_time), options) : helperMissing.call(depth0, "dateTimeFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.next_job_time), options)))
    + "\"\n      class=\"required importer-field\"></td>\n    </tr>\n    <tr>\n      <td></td>\n      <td>\n        <input\n        type=\"submit\"\n        value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.save_config)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      </td>\n    </tr>\n  </table>\n</form>\n";
  return buffer;
  })

});