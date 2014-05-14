<div class="header">
    <a href="#" class="form do-hide is-small">
      <span aria-hidden="true" data-icon="x"></span>
      <span class="screen-reader-text">{{i18n.Hide}}</span>
    </a>
</div>
<div class="body" style="bottom: 49px;">
  <div class="Incident is-edited is-expanded">
    <div class="first initial span-66p">
      <div class="header">
        {{#if model.id}}
        <span class="id">
          ID <span id="view-actor-id" class="value out">{{model.django_id}}</span>
        </span>
        {{/if}}
        <div class="field is-title hide-multiple">
          <p class="error-text">
            {{i18n.incident.Title_field_is_required}}
          </p>
          <label>{{i18n.incident.Title}}</label>
          <span class="i18n with-en with-ar">
            <div lang="en">
              <textarea 
                id="incident_title_en"
                type="text"
                name="title_en"
                class="required incident-field
                w-100p">{{model.title_en}}</textarea>
            </div>
            <div lang="ar">
              <textarea 
                id="incident_title_ar"
                name="title_ar"
                type="text"
                class="incident-field
                w-100p">{{model.title_ar}}</textarea>
            </div>
            <span class="toggle">
              <span lang="en">EN</span><span lang="ar">AR</span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="last initial span-33p">
      <div class="group details">
        <div class="field clear-after">

          <!-- score slider -->
          <div id="incident-score-block" class="is-score right">
            <label>{{i18n.incident.Reliability_Score}}</label>
            <span class="score">

              <span id="incident_confidence_score" class="value">
                {{model.confidence_score}}
              </span>
              <input type="hidden" 
                      class="incident-field"
                      name="confidence_score"
                      value="{{model.confidence_score}}">
              <div class="score-editor">
                <div class="rail">
                  <div class="slider"></div>  
                  <!-- <div class="cursor">&nbsp;</div> -->
                  <div class="axis">
                    <div class="start">
                      <span class="label">0%</span>
                    </div>
                    <div class="middle">
                      <span class="label">50%</span>
                    </div>
                    <div class="end">
                      <span class="label">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
              
          <!-- Assigned to user -->
          {{#if perms.can_assign_users}}
          <div id="incident-assignment-block" class="incidentAssigned left">
            <label>{{i18n.incident.Assigned_to}}</label>

            <input type="text" class="with-clear is-assigned-to"
              value="{{model.incident_assigned_user}}">
            <input
              type="hidden"
              name="assigned_user"
              class="incident-field"
              value="{{model.assigned_user}}">

          <button id="clear-user" class="do-clear">
            <span>✓</span>
          </button>
          </div>
          {{/if}}
        </div>
      </div>
    </div>
    <div class="first span-66p">

      <!-- end header -->
      <div class="body">

        <!-- Incident Crimes -->
        <div id="incident-crime-block" class="field is-crimes">
          <label>{{i18n.incident.Crime}}</label>
          <ul class="crimes editor">

            <li class="crime is-new">
              <input type="text" value="Crime" class="with-select crimes-ac">
            </li>
          </ul>
        </div>

        <!-- Description -->
        <div id="incident-description-block" class="field detail is-description hide-multiple">
          <div class="i18n with-en with-ar">
            <label>{{i18n.incident.Description}}</label>
            <div lang="en">
              <textarea 
                id="incident_details_en"
                name="incident_details_en"
                class="incident-field w-100p">{{model.incident_details_en}}</textarea>
            </div>
            <div lang="ar">
              <textarea 
                id="incident_details_ar"
                name="incident_details_ar"
                class="incident-field w-100p">{{model.incident_details_ar}}</textarea>
            </div>
            <span class="toggle">
              <span lang="en">EN</span><span lang="ar">AR</span>
            </span>
          </div>
        </div>

        <!-- comments -->
        <!--<div id="incident-comment-block" class="field is-comments hide-multiple">-->
        <!--</div>-->

          <!-- Actor selection -->
        <div id="incident-actor-list-block" class="field is-actors">
        </div>

        <!-- Bulletin selection block -->
        <div id="incident-bulletin-block" class="field is-bulletins">
        </div>

        <!-- Incident selection block -->
        <div id="incident-incident-block" class="field is-incidents">
        </div>

      </div>
    </div>
    <!-- second column -->
    <div class="last span-33p">
      <div class="body">

        <!-- incident labels -->
        <div id="incident-label-block" class="field is-tags">

        </div>
        <!-- events -->
        <div id="incident-event-block" class="field is-events clear hide-multiple">
        </div>

        <!-- Locations -->
        <div id="incident-location-block" class="field is-locations">
        </div>
        <!-- incident map block -->
        <div id="incident-map-block" class="field"></div>



      </div>
    </div>
    <div class="first span-66p">
      <div id="bulletin-version-block" class="">
        <div id="bulletin-status-block" class="field add">
          <p class="error-text">
            {{i18n.incident.Select_a_status_for_this_incident}}
          </p>
          <label>{{i18n.incident.Status}}</label>
          <select name="status_uri" 
                  id="status" 
                  class="required incident-field">
                {{#if isNew}}
                <option value="{{createStatus.resource_uri}}">{{createStatus.comment_status}}</option>
                {{else}}
                <option value="{{statuses.0.resource_uri}}">{{statuses.0.comment_status}}</option>
                {{/if}}
                {{#unless isNew}}
                {{#each statuses}}
                {{#if @index}}
                  <option
                    value="{{this.resource_uri}}"
                  >{{this.comment_status}}</option>
                {{/if}}
                {{/each}}
                {{/unless}}
          </select>
          <input class="incident-field" type="hidden" name="status" value="">
        </div>

        <div class="clearer"></div>
        <!-- Comment content field -->
        <div id="bulletin-status-comment-block" class="field add">

          <p class="error-text">
          {{i18n.incident.You_must_supply_a_reason_for_the_edit}}
          </p>
          <label>{{i18n.incident.Reason_For_Update}}</label>
          <textarea 
            id="comment"
            name="comment"
            class="required incident-field w-100p"></textarea>
          </div>

      </div>
    </div>
    <div class="clearer"></div>
  </div>
  <!-- show revision details -->
  <div class="revision-container"></div>
</div>
<div class="footer with-revision">
  <div class="actions form when-not_revision">
    <div class="when-overlay-expanded">
      <button class="do-collapse-form">
        <span class="text t">» {{i18n.Collapse}}</span>
      </button>
    </div>
    <div class="when-overlay-not_expanded">
      <button class="do-expand-form">
        <span class="text t">« {{i18n.Expand}}</span>
      </button>
    </div>
    <button id="incident-action_save" class="do-save do-toggleRevision default">
      <span class="text t">{{i18n.Save}}</span>
    </button>
  </div>
</div>
