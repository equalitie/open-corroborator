  <div class="actions">
    <button class="do-edit-comment is-small">
      <span class="text T">{{i18n.Edit}}</span>
    </button>
    <button class="do-remove is-small">
      <span class="text T">{{i18n.comment.Remove}}</span>
    </button>
  </div>
  <div class="content">
  <div class="text T">{{model.comments_en}}</div>
    <div class="meta">
      <span class="created"> {{dateFormat model.comment_created}}</span>
      {{i18n.comment.by}} <span class="who">{{model.assigned_user}}</span>
    <span class="bulletin_comment_status"> - {{model.status}}</span>
    </div>
  </div>
  <div class="clearer"> &nbsp;</div>
