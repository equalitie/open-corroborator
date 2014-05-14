<!-- Comment status field  dropdown should match others -->
<div id="{{entityType}}-status-block" class="add">
  <label>{{i18n.comment.Status}}</label><br/>
  <select name="status"
          id="{{entityType}}_status"
          class="comment-field">
    <option value="">{{i18n.comment.Select_Status}}</option>
    {{#each statuses}}
      <option
        {{#if_eq this.resource_uri compare=../model.status}}
        selected="true"
        {{/if_eq}}
        value="{{this.resource_uri}}"
      >{{this.comment_status}}</option>
    {{/each}}
  </select>
</div>

<div class="clearer"></div>
<!-- Comment content field -->
<div class="add">

  <div class="i18n with-en with-ar">
      <div lang="en">
      <label>{{i18n.comment.Comment}}</label>
        <textarea
          id="comments_en"
          name="comments_en"
          class="comment-field w-100p">{{model.comments_en}}</textarea>
      </div>
      <div lang="ar">
        <label>{{i18n.comment.Comment}}</label>
        <textarea
          id="comments_ar"
          name="comments_ar"
          class="comment-field w-100p">{{model.comments_ar}}</textarea>
      </div>
  <span class="toggle">
  <span lang="en">EN</span><span lang="ar">AR</span>
  </span>
  </div>



</div>


<input type="hidden" name="assigned_user" value="{{userResource}}"
       class="comment-field">
<button class="do-addComment">
  <span class="T">{{i18n.Save}}</span>
</button>
