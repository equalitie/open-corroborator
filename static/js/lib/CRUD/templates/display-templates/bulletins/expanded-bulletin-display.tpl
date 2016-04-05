<div class="Bulletin in-view is-expanded">
  <div class="header">
    <span class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </span>
    <h2 class="title">
      {{#if model.title_en}}
        <p>{{model.title_en}}</p>
      {{/if}}
      {{!--
      {{#if model.title_ar}}
        <p>{{model.title_ar}}</p>
      {{/if}}
      --}}
    </h2>
  </div>
  <div class="span-66p">
    <div class="body">
      {{#if model.bulletin_sources}}
      <div class="is-sources group">
        <h4>Sources</h4>
        <div class="value">
          {{sourceList model.bulletin_sources}}
        </div>
      </div>
      {{/if}}
      {{#if model.medias}}
      <div class="is-media group">
      </div>
      {{/if}}

      {{#if model.description_en}}
      <div class="is-description group">
        <h4>{{i18n.bulletin.Description}}</h4>
        <div class="description">{{model.description_en}}</div>
      </div>
      {{/if}}
      {{!--
      {{#if model.description_ar}}
      <div class="is-description group">
        <h4>{{i18n.bulletin.Description}}</h4>
        <div class="description">{{model.description_ar}}</div>
      </div>
      {{/if}}
      --}}
      {{#if model.actors_role}}
      <div class="is-actors group">
        <div class="clearer"></div>
      </div>
      {{/if}}
      {{#if model.ref_bulletins}}
      <div class="is-bulletins group">
      </div>
      {{/if}}
    </div>
  </div>
  <!-- end left column -->

  <!-- start right column -->
  <div class="span-33p">
    <div class="body">
      <div class="group">
        {{#if model.confidence_score}}
        <div class="is-score group">
          <h4>Confidence</h4>
          <div class="score">
            <span class="value">{{model.confidence_score}}</span>
          </div>
        </div>
        {{/if}}
        {{#if model.most_recent_status_bulletin}}
        <div class="is-status group">
          <h4>{{i18n.bulletins.update_status}}</h4>
          <div class="status">
            <span class="value status">{{fetchStatus model.most_recent_status_bulletin}}</span>
          </div>
        </div>
        {{/if}}
        <div class="is-assigned-to group">
          <h4>{{i18n.bulletins.assigned_to}}</h4>
          <div class="assigned-to">
            {{#if model.assigned_user}}
            <span class="value">{{fetchUser model.assigned_user}}</span>
            {{else}}
            <span class="value">{{i18n.bulletins.unassigned}}</span>
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
        <h4>Locations</h4>
        <div class="locations">
          {{#each model.bulletin_locations}}
          <div class="location">{{this}}</div>
          {{/each}}
        </div>
      </div>
      <div class="is-bulletin-map map"></div>
      {{/if}}
      <div class="is-tags group">
        {{#if model.labels}}
        <h4>{{i18n.bulletin.Labels}}</h4>
        <ul class="tags group detail">
          {{#each model.labels}}
          <li class="tag">
            <span class="text">{{fetchLabel this}}</span>
          </li>
          {{/each}}
        </ul>
        {{/if}}
      </div>
      <!-- {{#if model.bulletin_imported_comments}} -->
      <h4>{{i18n.comment.comments}}</h4>
      <div class="is-comments group">
      </div>
      {{/if}}
      {{#if model.bulletin_comments}}
        <div id="revision-container" class="is-history group">
        </div>
      {{/if}}
    </div>
  </div>
  <div class="clearer"></div>
</div>
