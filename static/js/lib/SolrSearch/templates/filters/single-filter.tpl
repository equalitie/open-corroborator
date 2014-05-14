<span class="text T" data-key="{{model.key}}" data-filter="{{model.filterName}}">
  {{#if model.name}}
    {{model.name}} ({{model.numItems}})
  {{else}}
    {{model.displayFilterName}}({{model.numItems}})
  {{/if}}
</span>
