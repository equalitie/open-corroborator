define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div title=\"Search help\" class=\"help-text-container\">\n  <h5>Fuzzy search</h5>\n  <p class='help-text'>\n    The default behaviour for searching is the use of fuzzy search. In this instance\n    the system attempts to match the term(s) against all terms with in a certain\n    geometric distance.\n  </p>\n  <p class='help-text'>\n  So for example a search for the following:\n  <br/>\n  \"inciden\", \"incidnt\" or \"incide\"\n  <br/>\n  will return results for the similar terms such as \"incident\" or \"incidents\"\n  </p>\n\n  <p class='help-text'>\n  For terms that may be more than a certain distance from a word the symbol '*'\n  can be appended after the individual words of a search term.\n  <br/>\n  For example:\n  <br/>\n  'incid' is too far from incident for fuzzy search to match reliably.\n  <br/>\n  But searching for 'incid*' will return the related results.\n  </p>\n  <h5> Boolean Search </h5>\n  <p class='help-text'>\n  Searches can be grouped based on AND OR boolean functions as follows:\n  <br/>\n  (x) &amp;&amp; (y)\n  <br/>\n  ((x) &amp;&amp; (y)) || (z)\n  <br/>\n  The rules of algebraic parentheses are respected.\n  <br/>\n  </p>\n  <p class='help-text'>\n    Search is conducted on all fields for each entity. The search works by collecting\n    all fields into a single searchable text field. Exact searching can be performed\n    via the filters.\n  </p>\n</div>\n";
  })

});