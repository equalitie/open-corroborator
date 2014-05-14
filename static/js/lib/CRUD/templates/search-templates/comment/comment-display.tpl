  <div class="actions">
    <button class="do-remove-comment is-small">
      <span aria-hidden="true" data-icon="X"></span>
      <span class="screen-reader-text">{{i18n.event.Remove}}</span>
    </button>
    <button class="do-edit-comment is-small">
      <span aria-hidden="true" data-icon="e"></span>
      <span class="screen-reader-text">{{i18n.Edit}}</span>
    </button>
  </div>
  <div class="content">
  <div class="text T">{{model.comments_en}}</div>
  <div class="text T">{{model.comments_ar}}</div>
    <div class="meta">
      <span class="created"> {{dateFormat model.comment_created}}</span>
      {{i18n.comment.by}} <span class="who">{{model.assigned_user}}</span>
    <!--<span class="bulletin_comment_status"> - {{model.status}}</span>-->
    </div>
  </div>
  <div class="clearer"> &nbsp;</div>
