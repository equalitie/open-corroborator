<div class="Actor in-view">
  <div class="header">
    <div class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </div>
    {{#if model.thumbnail_url}}
    <div class="avatar"><img src="{{model.thumbnail_url}}" alt="actor thumbnail"></div>
    {{else}}
    <div class="avatar">&nbsp;</div>
    {{/if}}
    <div class="infos">
      {{#if model.most_recent_status_actor}}
        <span class="status">
          <span class="text">{{fetchStatus model.most_recent_status_actor}}</span>
        </span>
      {{/if}}
      <h2 class="title">
        {{#if model.fullname_en}}
          <p>{{model.fullname_en}}</p>
        {{/if}}
        {{!--
        {{#if model.fullname_ar}}
          <p>{{model.fullname_ar}}</p>
        {{/if}} 
        --}}
        {{#if model.sex}}
        (<span class="sex">{{fetchSex model.sex}}</span>)
        {{/if}}
      </h2>
      <div class="aka">{{model.nickname_en}}</div>
      <div class="type">
        {{#if model.age}}
          {{fetchAge model.age}}
          {{#if model.civilian}}, {{/if}}
        {{/if}}
        {{#if model.civilian}}
          {{fetchCivilian model.civilian}}
        {{/if}}
      </div>
    </div>
    <div class="group details">
      {{#if model.assigned_user}}
      <div class="assigned-to">
        <span class="value">{{fetchUser model.assigned_user}}</span>
      </div>
      {{/if}}
    </div>
  </div>
  <div class="body">
    {{#if model.condition }}
      <div class="assigned-to">
        <span class="value">{{fetchCondition model.condition}}</span>
      </div>
      
    {{/if}}
    {{#if model.description_en }}
    <div class="description detail">
      <h3 class="title">{{i18n.bulletin.Description}}</h3>
      {{model.description_en}}
    </div>
    {{/if}}
    {{#if model.description_ar }}
    <div class="description detail">
      <h3 class="title">{{i18n.bulletin.Description}}</h3>
      {{model.description_ar}}
    </div>
    {{/if}}
    <table class="details">
      <tbody>
        {{#if model.current_location}}
        <tr>
          <th>{{i18n.actor.Lives_in}} </th>
          <td>{{fetchLocation model.current_location}}</td>
        </tr>
        {{/if}}
        {{#if model.POB}}
        <tr>
          <th>{{i18n.actor.Born_in}}</th>
          <td>
            {{fetchLocation model.POB}}
          </td>
        </tr>
        {{/if}}
        {{#if model.DOB}}
        <tr>
          <th>{{i18n.actor.Date_Of_Birth}}</th>
          <td>
            {{dateFormat model.DOB}}
          </td>
        </tr>
        {{/if}}
        {{#if model.occupation_en}}
        <tr>
          <th>{{i18n.actor.works_as_a_en}}</th>
          <td>
            {{model.occupation_en}}
          </td>
        </tr>
        {{/if}}
        {{!--
        {{#if model.occupation_ar}}
        <tr>
          <th>{{i18n.actor.works_as_a_ar}}</th>
          <td>
            {{model.occupation_ar}}
          </td>
        </tr>
        {{/if}}
        --}}
        {{#if model.position_en}}
        <tr>
          <th>{{i18n.actor.position_en}}</th>
          <td>
            {{model.position_en}}
          </td>
        </tr>
        {{/if}}
        {{!--
        {{#if model.position_ar}}
        <tr>
          <th>{{i18n.actor.position_ar}}</th>
          <td>
            {{model.position_ar}}
          </td>
        </tr>
        {{/if}}
        --}}
        {{#if model.nationality_en}}
        <tr>
          <th>{{i18n.actor.Nationality_en}}</th>
          <td>{{model.nationality_en}}</td>
        </tr>
        {{/if}}
        {{!--
        {{#if model.nationality_ar}}
        <tr>
          <th>{{i18n.actor.Nationality_ar}}</th>
          <td>{{model.nationality_ar}}</td>
        </tr>
        {{/if}}
        --}}
        {{#if model.ethnicity_en}}
        <tr>
          <th>{{i18n.actor.Ethnicity_en}}</th>
          <td>{{model.ethnicity_en}}</td>
        </tr>
        {{/if}}
        {{!--
        {{#if model.ethnicity_ar}}
        <tr>
          <th>{{i18n.actor.Ethnicity_ar}}</th>
          <td>{{model.ethnicity_ar}}</td>
        </tr>
        {{/if}}
        --}}
        {{#if model.spoken_dialect_en}}
        <tr>
          <th>{{i18n.actor.Speaks}}</th>
            <td>
            <span class="i18n with-en with-ar">
              <span lang="en"><span class="name">{{model.spoken_dialect_en}}</span></span>
              <!--
              <span lang="ar"><span class="name">{{model.spoken_dialect_ar}}</span></span>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
              -->
            </span>
            </td>
        </tr>
        {{/if}}
        {{#if model.religion_en}}
        <tr>
          <th>{{i18n.actor.Religion}}</th>
            <td>
            <span class="i18n with-en with-ar">
              <span lang="en"><span class="name">{{model.religion_en}}</span></span>
              <!--
              <span lang="ar"><span class="name">{{model.religion_ar}}</span></span>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
              -->
            </span>
            </td>
        </tr>
        {{/if}}
      </tbody>
    </table>
    {{#if model.actors_role}}
      <div class="actors group">
      </div>
    {{/if}}
    {{#if model.related_bulletins}}
    <div class="bulletins group">
    </div>
    {{/if}}
    {{#if model.related_incidents}}
    <div class="incidents group">
    </div>
    {{/if}}
    {{#if model.actor_comments}}
    <div id="revision-container">
    </div>
    {{/if}}
  </div>
</div>
