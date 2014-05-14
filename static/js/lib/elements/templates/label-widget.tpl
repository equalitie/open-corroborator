<label>{{ display.field_label }}</label>
<ul class="{{display.field_name}} tags editor">

  <li class="{{ display.field_name }} is-new">
  <input type="text" placeholder="{{ field_label }}">
  <button class="drop-down-handle">
    <span aria-hidden="true" data-icon="d"></span>
    <span class="screen-reader-text">show {{display.field_label}} list</span>
  </button>
  </li>
</ul>
<select {{#if multiple}}multiple="true"{{/if}} name="{{display.field_name}}" class="hidden {{entityType}}-field">
</select>

