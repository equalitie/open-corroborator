<div class="media-preview-container">
  {{#if file}}
    <label>File Type:</label> <span>{{model.media_file_type}}</span><br/>
    <label>Label:</label> <span>{{model.name_en}}</span><br/>
    <a href="{{model.media_file}}" class="button download" target="blank">Download</a>
  {{/if}}
  {{#if image}}
    <img class="dialog-centre" src="{{uri}}" alt="{{alt}}" />
  {{/if}}
</div>
