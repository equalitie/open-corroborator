  {{#if_eq model.media_type compare='Picture' }}
    <img src="{{model.media_thumb_file}}"
         title="{{model.name_en}}"
         class="media-image-thumbnail"/>
         <!--alt="{{model.name_en}}"/>-->
  {{/if_eq}}
  {{#if_eq model.media_type compare='Video' }}
    <img src="{{model.media_thumb_file}}"
         class="media-video-thumbnail"
         style="padding: 0;margin: 0;" {{!-- move into sass/css --}}
         />
    <!-- <span aria-hidden="true" data-icon="&#x56;" class="media-video-thumbnail"></span> -->
    <span class="screen-reader-text">{{i18n.media.document}}</span>
  {{/if_eq}}
  {{#if_eq model.media_type compare='Document' }}
    <a href="{{model.media_file}}" download="download.{{model.media_file_type}}">
      <span title="{{model.name_en}}" aria-hidden="true" data-icon="F" class="media-document-thumbnail"></span>
      <span class="screen-reader-text">{{i18n.media.document}}</span>
    </a>
  {{/if_eq}}
  {{#if_eq model.media_type compare='Pdf' }}
    <a href="{{model.media_file}}" target="_blank">
      <span title="{{model.name_en}}" aria-hidden="true" data-icon="F" class="media-document-thumbnail"></span>
      <span class="screen-reader-text">{{i18n.media.document}}</span>
    </a>
  {{/if_eq}}
  <span class="type">{{model.media_type}}</span>
  <span class="date">{{dateFormat model.media_created}}</span>
