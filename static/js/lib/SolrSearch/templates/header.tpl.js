define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"padding\">\n  <div class=\"Selection\">\n    <div class=\"description\">\n      <span class=\"text T\"></span>\n      <span id=\"number-selected\"></span>\n    </div>\n    <div class=\"actions\">\n    </div>\n  </div>\n</div>\n\n<table class=\"sort-headers\">\n  <thead>\n    <tr class=\"filters\">\n      <th class=\"is-selector\">&nbsp;</th>\n      <th class=\"is-preview\">&nbsp;</th>\n      <th class=\"is-description sort-header\">\n      </th>\n      <th class=\"is-status sort-header\">\n      </th>\n      <th class=\"is-score sort-header\">\n      </th>\n    </tr>\n  </thead>\n</table>\n";
  })

});