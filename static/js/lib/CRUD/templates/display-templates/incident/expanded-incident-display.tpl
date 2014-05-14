<div class="Incident in-view is-expanded">
  <div class="header">
    <span class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </span>
    <h2 class="title">
      {{#if model.title_en}}
        <p>{{model.title_en}}</p>
      {{/if}}
      {{#if model.title_ar}}
        <p>{{model.title_ar}}</p>
      {{/if}}
    </h2>
  </div>
  <div class=" span-66p">
    <div class="body">
      {{#if model.incident_crimes}}
      <div class="is-crimes group">
        <h4>{{i18n.incident.Crime}}</h4>
        <ul class="crimes">
          {{#each model.incident_crimes}}
          <li class="crime">
            <span class="text">{{this}}</span>
          </li>
          {{/each}}
        </ul>
      </div>
      {{/if}}
      {{#if model.incident_details_en}}
      <div class="is-description group">
        <h4>{{i18n.incident.Description}}</h4>
        <div class="description">{{model.incident_details_en}}</div>
      </div>
      {{/if}}
      {{#if model.incident_details_ar}}
      <div class="is-description group">
        <h4>{{i18n.incident.Description}}</h4>
        <div class="description">{{model.incident_details_ar}}</div>
      </div>
      {{/if}}
      {{#if model.incident_comments}}
      <div class="comments group">
      </div>
      {{/if}}
      {{#if model.actors_role}}
      <div class="is-actors group">
      </div>
      {{/if}}
      {{#if model.ref_bulletins}}
      <div class="is-bulletins group">
      </div>
      {{/if}}
      {{#if model.ref_incidents}}
      <div class="is-incidents group">
      </div>
      {{/if}}
    </div>
  </div>
  <div class="last span-33p">
    <div class="body">
      <div class="group">
        <div class="is-score group">
          <h4>{{i18n.incident.confidence}}</h4>
          <div class="score">
            <span class="value">{{model.confidence_score}}</span>
          </div>
        </div>
        {{#if model.most_recent_status_incident}}
        <div class="is-status group">
          <h4>{{i18n.bulletins.update_status}}</h4>
          <div class="status">
            <span class="value status">{{fetchStatus model.most_recent_status_incident}}</span>
          </div>
        </div>
        {{/if}}
        <div class="is-assigned-to group">
          <h4>{{i18n.incident.assigned_to}}</h4>
          <div class="assigned-to">
            {{#if model.assigned_user}}
            <span class="value">{{i18n.incident.Assigned_to}}: {{fetchUser model.assigned_user}}</span>
            {{else}}
            <span class="value">{{i18n.incident.Assigned_to}}: {{i18n.incidents.unassigned}}</span>
            {{/if}}
          </div>
        </div>
        <div class="clearer"></div>
      </div>
      {{#if model.times}}
      <div class="is-events group">
      </div>
      {{/if}}
      {{#if model.locations}}
      <div class="is-locations group">
        <h4>{{i18n.incident.Locations}}</h4>
        <div class="locations">
          {{#each model.locations}}
          <div class="location">{{fetchLocation this}}</div>
          {{/each}}
        </div>
      </div>
      <div id="is-incident-map" class="map"></div>
      {{/if}}
      {{#if model.labels}}
      <div class="is-tags group">
        <h4>{{i18n.incident.Labels}}</h4>
        <ul class="tags group display">
          {{#each model.labels}}
          <li class="tag">
            <span class="text">{{fetchLabel this}}</span>
          </li>
          {{/each}}
        </ul>
      </div>
      {{/if}}
      <div id="revision-container" class="is-history group">
      </div>
    </div>
  </div>
  <div class="clearer"></div>
</div>
