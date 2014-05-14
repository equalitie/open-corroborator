<div title="{{model.name_en}}">
  {{#if_eq model.media_type compare='Picture' }}
    <img src="{{model.media_thumb_file}}"
         class="media-image-thumbnail"
         />
  {{/if_eq}}
  {{#if_eq model.media_type compare='Video' }}
    <!--<img src="{{model.media_thumb_file}}"  -->
         <!--class="media-video-thumbnail"-->
         <!--/>-->
    <span aria-hidden="true" data-icon="&#x56;" class="media-video-thumbnail"></span>
    <span class="screen-reader-text">{{i18n.media.video}}</span>
  {{/if_eq}}
  {{#if_eq model.media_type compare='Document' }}
    <a href="{{model.media_file}}" download="download.{{model.media_file_type}}">
      <span aria-hidden="true" data-icon="F" class="media-document-thumbnail"></span>
      <span class="screen-reader-text">{{i18n.media.document}}</span>
    </a>
  {{/if_eq}}
  {{#if_eq model.media_type compare='Pdf' }}
    <a href="{{model.media_file}}" target="_blank">
      <span aria-hidden="true" data-icon="F" class="media-document-thumbnail"></span>
      <span class="screen-reader-text">{{i18n.media.document}}</span>
    </a>
  {{/if_eq}}
  <span class="type">{{model.media_type}}</span>
  <span class="date">{{dateFormat model.media_created}}</span>
  {{#if model.result}}
    <button class="do-relate right is-small">
      <span class="text">{{i18n.media.Relate}}</span>
    </button>
  {{/if}}
  {{#if model.selected}}
    <button class="do-remove is-small">
      <span class="text">{{i18n.media.Remove}}</span>
    </button>
  {{/if}}
</div>
