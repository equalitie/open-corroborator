define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"group is-creator\">\n  <button class=\"do-create-actor create\">\n    <span aria-hidden=\"true\" data-icon=\"e\"></span>\n    <span class=\"text T\">New Actor</span>\n  </button>\n</div>\n<div class=\"list\"></div>\n";
  })

});