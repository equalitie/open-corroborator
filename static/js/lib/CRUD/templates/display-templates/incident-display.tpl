  <div class="header">
    <span class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </span>
    <h2 class="title">
      <span class="i18n with-en with-ar">
      {{#if model.title_en}}
        <p>{{model.title_en}}</p>
      {{/if}}
      {{#if model.title_ar}}
        <p>{{model.title_ar}}</p>
      {{/if}}
    </h2>
    <div class="group details">
      {{#if model.assigned_user}}
      <div class="assigned-to">
        <span class="value">{{fetchUser model.assigned_user}}</span>
      </div>
      {{/if}}
      {{#if model.confidence_score}}
      <div class="score">
        <span class="value">{{model.confidence_score}}</span>
      </div>
      {{/if}}
      {{#if model.most_recent_status_incident}}
      <span class="status">
        <span class="value">{{fetchStatus model.most_recent_status_incident}}</span>
      </span>
      {{/if}}

      <div class="date-location">
        <span class="date">{{dateFormatTZ model.incident_created}}</span>
        {{#if model.location}}
        , {{i18n.incidents.in}} <span class="location">{{model.location}}</span>
        {{/if}}
      </div>

      {{#if model.times}}
      <div class="events detail">
      </div>
      {{/if}}


    </div>
    {{#if model.labels}}
    <h3 class="title">{{i18n.incident.Labels}}</h3>
    <ul class="tags group detail">
      {{#each model.labels}}
      <li class="tag"> <span class="text">{{fetchLabel this}}</span> </li>
      {{/each}}
    </ul>
    {{/if}}
  </div>

  <div class="body">
      {{#if model.locations}}
        <h3 class="title">{{i18n.incident.Locations}}</h3>
        <div id="is-incident-map" class="incident-map map detail"></div>
      {{/if}}
    <div class="media detail">
      <div class="placeholder">&nbsp;</div>
    </div>
    {{#if model.incident_details_en }}
    <div class="description detail">
      <h3 class="title">{{i18n.incident.Description}}</h3>
      {{model.incident_details_en}}
    </div>
    {{/if}}
    {{#if model.incident_details_ar }}
    <div class="description detail">
      <h3 class="title">{{i18n.incident.Description}}</h3>
      {{model.incident_details_ar}}
    </div>
    {{/if}}
    {{#if model.incident_comments}}
    <div class="comments detail">
    </div>
    {{/if}}
    <!-- end comments -->
    {{#if model.actors_role}}
    <div class="actors group detail">
    </div>
    {{/if}}
    {{#if model.ref_incidents}}
      <div class="incidents group detail">
      </div>
    {{/if}}
    {{#if model.ref_bulletins}}
    <div class="bulletins group detail">
    </div>
    {{/if}}
  </div>
