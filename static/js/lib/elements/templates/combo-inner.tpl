<input type="hidden" value="{{search_request}}" />
<span class="text T">
  <span class="select-search">
  {{#if name}}
    {{name}}
  {{/if}}
  {{#unless name}}
    {{#if name_en}}
      {{name_en}}
    {{/if}}
    {{#unless name_en}}
      {{!--
      {{#if name_ar}}
        {{name_ar}}
      {{/if}}
      --}}
    {{/unless}}
  {{/unless}}
  </span>
  {{#if_eq search_request compare='predefined_search' }}
    <span aria-hidden="true" data-icon="x" class="delete-saved-search"></span>
    <span class="screen-reader-text">Delete Saved search</span>
  {{/if_eq}}
</span>

