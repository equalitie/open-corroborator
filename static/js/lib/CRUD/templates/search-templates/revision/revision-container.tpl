<div class="version-dropdown"></div>
<div class="version-description">
  <label>{{i18n.revision.REVISIONS}}</label>

  <div class="drop-down-container">
    <p class="selected-revision-label">
      {{comments.[0].status_label}}</p>
    <button class="drop-down-handle">
      <span aria-hidden="true" data-icon="d"></span>
      <span class="screen-reader-text">{{i18n.revision.show_revision_list}}</span>
    </button>

    <ul class="all-revisions hidden">
      {{#each comments}}
      <li class="revision-label">{{status_label}}</li>
      {{/each}}
    </ul>
  </div>

  <textarea 
    class="version-description-text"
    disabled="true"
    cols="50"
    rows="10">{{comments.[0].comments_en}}
    {{comments.[0].comments_ar}}
    </textarea>
</div>
