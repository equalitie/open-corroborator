<div class="comment">
  <div class="text i18n">
    {{#if model.comments_en}}
      <p>{{model.comments_en}}</p>
    {{/if}}
    {{!--
    {{#if model.comments_ar}}
      <p>{{model.comments_ar}}</p>
    {{/if}}
    --}}
  </div>
    <div class="meta-history">
      <span class="date">{{dateFormat model.comment_created}}</span>
      <!--{{i18n.comment.by}} <span class="who">{{fetchUser model.assigned_user}}</span>-->
  </div>
</div>
