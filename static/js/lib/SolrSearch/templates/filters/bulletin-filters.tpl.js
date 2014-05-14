define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"header bulletin-display\">\n  <div class=\"padding\">\n    <div class=\"group is-creator\">\n      <button class=\"do-create-bulletin create\">\n        <span aria-hidden=\"true\" data-icon=\"e\"></span>\n        <span class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.filters)),stack1 == null || stack1 === false ? stack1 : stack1.new_bulletin)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </button>\n    </div>\n  </div>\n</div>\n<div class=\"body bulletin-filter\" >\n  <div class=\"padding\">\n    <div class=\"group is-filters filters\">\n      <!-- enabled filters -->\n      <div class=\"selected-bulletin-filters filter is-labels\">\n      </div>\n      <!-- filter groups go in here -->\n      <div class=\"filter-groups\">\n        <div class=\"bulletin_searchable_locations_exact map-filter-container\"></div>\n        <div class=\"dd-filters\"></div>\n        <div class=\"standard-filters\"></div>\n        <div class=\"date-range\"></div>\n      </div>\n\n    </div>\n  </div>\n</div>\n";
  return buffer;
  })

});