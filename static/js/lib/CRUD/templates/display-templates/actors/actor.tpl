  <div class="Actor in-list">
    {{#if model.thumbnail_url}}
      <div class="avatar"><img src="{{model.thumbnail_url}}" alt="actor thumbnail"></div>
    {{else}}
      <div class="avatar">&nbsp;</div>
    {{/if}}
    <div class="content">
      <div class="L1">
        {{#if model.most_recent_status_actor}}
          <span class="status">
            <span class="text">{{fetchStatus model.most_recent_status_actor}}</span>
          </span>
        {{/if}}
        {{#if model.role}}
        <span class="status" style="margin-right:5px;">
          <span class="text">{{fetchRole model.role}}</span>
        </span>
        {{/if}}
        <a href="#actor/{{model.id}}{{#if expanded}}/{{expanded}} {{/if}}">
          <h3 class="">
            {{#if model.fullname_en}}
              <p>{{model.fullname_en}}</p>
            {{/if}}
            {{#if model.fullname_ar}}
              <p>{{model.fullname_ar}}</p>
            {{/if}}
          </h3>
        </a>
        <span class="sex">{{fetchSex model.sex}}</span>
        <span class="age">{{fetchAge model.age}}</span>
        <div class="L2">
          {{#if model.nickname_en}}
            <span class="aka">{{i18n.actor.aka}} «{{model.nickname_en}}»</span>
          {{/if}}
        </div>
      </div>
      <div class="when-not_expanded">
        <div class="L3">
          {{#if model.current_location}}
            <span class="location">{{locationTpl tpl=i18n.actor.lives_in location=model.current_location}}</span>
          {{/if}}
          {{#if model.occupation_ar}}
            <span class="occupation">{{wordTpl tpl=i18n.actor.works_as_a_ar word=model.occupation_en}}</span>
          {{/if}}
          {{#if model.occupation_en}}
            <span class="occupation">{{wordTpl tpl=i18n.actor.works_as_a_en word=model.occupation_en}}</span>
          {{/if}}
          {{#if model.count_incidents}}
          <br>{{{pluralise tpl=i18n.actor.involved_in_incident numItems=model.count_incidents}}}
          {{/if}}
        </div>
      </div>
    </div>
  </div>
