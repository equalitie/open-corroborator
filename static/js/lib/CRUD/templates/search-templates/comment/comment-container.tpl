<label>{{i18n.comment.Comments}}</label>
<ul class="comments">
  <li class="comment comment-form is-new">
  </li>
</ul>
<!-- 
set the class name to be entityType-field for a form by convention
for input fields on the entity form
-->
<select multiple="true" 
        name="{{entityType}}_imported_comments"
        class="{{entityType}}-field hidden">
</select>
