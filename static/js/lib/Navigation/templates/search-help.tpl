<div title="Search help" class="help-text-container">
  <h5>Fuzzy search</h5>
  <p class='help-text'>
    The default behaviour for searching is the use of fuzzy search. In this instance
    the system attempts to match the term(s) against all terms with in a certain
    geometric distance.
  </p>
  <p class='help-text'>
  So for example a search for the following:
  <br/>
  "inciden", "incidnt" or "incide"
  <br/>
  will return results for the similar terms such as "incident" or "incidents"
  </p>

  <p class='help-text'>
  For terms that may be more than a certain distance from a word the symbol '*'
  can be appended after the individual words of a search term.
  <br/>
  For example:
  <br/>
  'incid' is too far from incident for fuzzy search to match reliably.
  <br/>
  But searching for 'incid*' will return the related results.
  </p>
  <h5> Boolean Search </h5>
  <p class='help-text'>
  Searches can be grouped based on AND OR boolean functions as follows:
  <br/>
  (x) &amp;&amp; (y)
  <br/>
  ((x) &amp;&amp; (y)) || (z)
  <br/>
  The rules of algebraic parentheses are respected.
  <br/>
  </p>
  <p class='help-text'>
    Search is conducted on all fields for each entity. The search works by collecting
    all fields into a single searchable text field. Exact searching can be performed
    via the filters.
  </p>
</div>
