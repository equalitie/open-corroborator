  <div class="Actor in-list search-results">
    <div class="is-selector {{pos}}">
      <input type="checkbox" {{model.checked}}>
    </div>
      <a href="#actor/{{model.id}}">
      <div class="actor-content">
        {{#if model.thumbnail_url}}
          <div class="avatar"><img src="{{model.thumbnail_url}}" alt="actor thumbnail"></div>
        {{else}}
          <div class="avatar">&nbsp;</div>
        {{/if}}
        <div class="content">
          {{#if model.most_recent_status_actor}}
            <span class="status">
              <span class="text">{{fetchStatus model.most_recent_status_actor}}</span>
            </span>
          {{/if}}
          <div class="L1">
            {{#if model.fullname_en}}
            <p class="name"> {{model.fullname_en}}</p>
            {{/if}}
            {{#if model.fullname_ar}}
            <p class="name"> {{model.fullname_ar}}</p>
            {{/if}}

            {{#if model.sex}}
              <p class="sex">{{fetchSex model.sex}}</p>
            {{/if}}
            {{#if model.sex}}
              {{#if model.age}}
                <p class="age">,&nbsp;</p>
              {{/if}}
            {{/if}}
            {{#if model.age}}
            <p class="age"> {{fetchAge model.age}}</p>
            {{/if}}
          </div>

          <div class="L2">
            <br/>
            {{#if model.nickname_en}}
              <p class="aka">{{i18n.results.aka}} «{{model.nickname_en}}»</p>
            {{/if}}
          </div>
          <div class="actor-summary">
            <div class="L3">
              {{#if model.current_location}}
                {{i18n.results.lives_in}}
                <span class="location">{{fetchLocation model.current_location}}{{#if model.occupation_en}}, {{/if}} </span>
              {{/if}}
              {{#if model.occupation_en}}
              <span class='works-as'>
              {{i18n.results.works_as_a}}
                <span class="occupation">{{model.occupation_en}}</span> 
              </span>
              {{/if}}

              {{#if model.count_incidents}}
              <br><span class="incidents-count">
              {{pluralise tpl=i18n.results.involved_in numItems=model.count_incidents}}</span>
              {{/if}}
            </div>
          </div>
       </div> 
     </div>
   </a>
  </div>
