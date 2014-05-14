<div id="video-edit-preview"></div>
<label>{{label}}</label>
{{#unless noSearch}}
<div class="search">
  <input type="text" class="with-clear">
  <button class="do-clear">
    <span>✓</span>
  </button>
  <button class="do-search do-search-embedded medias">
    <span>{{i18n.Search}}</span>
  </button>
</div>
{{/unless}}

<ul class="media"></ul>

<button class="do-upload upload-media">
  <span>{{i18n.media.Upload_new_media}}</span>
</button>
<select {{#if multiple}} multiple="{{multiple}}"{{/if}} name="{{name}}" id="media-added-field"
  class="{{entityType}}-field hidden"></select>
