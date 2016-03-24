<div class="Actor in-list embedded">
    {{#if model.thumbnail_url}}
      <div class="avatar"><img src="{{model.thumbnail_url}}" alt="actor thumbnail"></div>
    {{else}}
      <div class="avatar">&nbsp;</div>
    {{/if}}
    <div class="content">
      <div class="L1">
        {{#if model.fullname_en}}
        <p class="name">{{model.fullname_en}}</p>
        {{/if}}
        {{#if model.fullname_ar}}
        <p class="name">{{model.fullname_ar}}</p>
        {{/if}}
        <p class="sex">{{model.sex}}</p>
        <p class="age">{{model.age}}</p>
      </div>
      <div class="L2">
          {{#if model.nickname_en}}
          <p class="aka">{{i18n.actor.aka}} «{{model.nickname_en}}»</p>
          {{/if}}
      </div>
      {{#if model.selected }}
      <div class="actor-summary hidden">
        <div class="L3">
          {{#if model.lives_in.location_en}}
            <p class='lives-in'>{{i18n.actor.lives_in}} 
              <span class="location">{{model.lives_in.location_en}}</span>
            </p>
          {{/if}}
          {{#if model.occupation_en}}
          <p class='works-as'>
          {{#if model.lives_in.location_en}}
          , 
          {{/if}}
          {{i18n.actor.works_as_a}} 
            <span class="occupation">{{model.occupation_en}}</span> 
          </p>
          {{/if}}

          <br>involved in <span class="incidents-count">{{model.count_incidents}} incidents</span>
        </div>
      </div>
      {{/if}}
      {{#if model.result }}
      <div class="actor-long-summary">
        <table class="details">
          <tbody>
            {{#if model.lives_in.location_en}}
              <tr>
                <th>{{i18n.actor.Lives_in}}</th>
                <td>{{model.lives_in.location_en}}</td>
              </tr>
            {{/if}}
            {{#if model.pob}}
              <tr>
                <th>{{i18n.actor.Born_in}}</th>
                <td>{{ model.pob }}</td>
              </tr>
            {{/if}}
            {{#if model.nationality_en}}
              <tr>
                <th>{{i18n.actor.Nationality}}</th>
                <td>{{nationality_en}}</td>
              </tr>
            {{/if}}
            {{#if model.ethnicity_en}}
              <tr>
                <th>{{i18n.actor.Ethnicity}}</th>
                <td>{{model.ethnicity_en}}</td>
              </tr>
            {{/if}}
            {{#if model.spoken_dialect_en}}
              <tr>
                <th>{{i18n.actor.Speaks}}</th>
                <td>{{model.spoken_dialect_en}}</td>
              </tr>
            {{/if}}
            {{#if model.religion_en}}
              <tr>
                <th>{{i18n.actor.Religion}}</th>
                <td>{{model.religion_en}}</td>
              </tr>
            {{/if}}
          </tbody>
        </table>
        <div class="stats">
          <div class="is-mentions">
            <h4 class="title">{{i18n.actor.Mentioned_in}}</h4>
            <div class="stat">
              <div class="value">{{ model.count_bulletins }}</div>
              <div class="label">{{i18n.actor.Bulletins}}</div>
            </div>
            <div class="stat">
              <div class="value">{{ model.count_incidents }}</div>
              <div class="label">{{i18n.actor.Incidents}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions search-result">
        <div class="button combo is-default">
          <span class="T">{{i18n.actor.Add_as}}
          <span aria-hidden="true" data-icon="&#x64;"></span>
          </span>
          <ul class="options">
            {{#each roles}}
            <li>
              <span data-role="{{this.key}}" class="text T">{{this.value}}</span>
            </li>
            {{/each}}
          </ul>
        </div>
      </div>
      {{/if}}
      <div class="when-related">
        <div class="actions">
          <div class="left">
            <div class="button combo is-default">
              <span class="T">
                {{i18n.actor.Related_as}}: {{roleModel.role_en}} 
                <span aria-hidden="true" data-icon="&#x64;"></span>
                <ul class="options">
                  {{#each roles}}
                  <li>
                    <span data-role="{{this.key}}" class="text T">{{this.value}}</span>
                  </li>
                  {{/each}}
                </ul>
              </span>
            </div>
          </div>
          <div class="right">
            <button class="do-removeActor">
              <span class="text T">{{i18n.actor.Remove}}</span>
            </button>
          </div>
          <div class="clearer">&nbsp;</div>
        </div>
      </div>
   </div> 
</div>
