  <div class="header">
    <button class="do-hide is-small">
      <span class="T">{{i18n.bulletin.close}}</span>
    </button>
  </div>
  <div class="body" style="bottom: 49px;">
    <div class="Bulletin is-edited is-expanded">
      <div class="first span-66p">
        <div class="header">
          {{#if model.id}}
          <span class="id">
            ID <span id="view-actor-id" class="value out">{{model.id}}</span>
          </span>
          {{/if}}
          <div class="field is-title">
            <label>Title</label>
            <span class="i18n with-en with-ar">
              <div lang="en">
                <textarea type="text" class="w-100p">{{model.title_en}}</textarea>
              </div>
              <!--
              <div lang="ar">
                <textarea type="text" class="w-100p">{{mdoel.title_ar}}</textarea>
              </div>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
              -->
            </span>
          </div>
        </div>
        <div class="body">

          <!-- Sources field -->
          <div id="bulletin-source-block" class="field is-sources">
          </div>

          <div id="bulletin-media-block" class="field is-media">
          </div>
        
          <!-- description -->
          <div id="bulletin-description-block" class="field is-description">
            <label>{{i18n.bulletin.Description}}</label>
            <div class="i18n with-en with-ar">
              <div lang="en">
                <textarea id="bulletin_description_en"
                          name="bulletin_description_en"
                          type="text"
                          class="bulletin-field w-100p">{{model.description_en}}</textarea>
              </div>
              <!--
              <div lang="ar">
                <textarea id="bulletin_description_ar"
                          name="bulletin_description_ar"
                          type="text"
                          class="bulletin-field w-100p">{{model.description_ar}}</textarea>
              </div>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
              -->
            </div>
          </div>

          <!-- Related Actors -->
          <div id="bulletin-actor-list-block" class="field is-actors">
          </div>

          <!-- Related bulletins -->
          <div id="bulletin-bulletin-block" class="field is-bulletins">
          </div>

        </div>
      </div>
      <!-- end first col -->
      <div class="last span-33p">
        <div class="body">
          <div class="group details">
            <div class="field clear-after">

              <!-- score slider -->
              <div id="bulletin-score-block" class="is-score right">
                <label>{{i18n.bulletin.Score}}</label>
                <div class="score">

                  <span id="bulletin_confidence_score" class="value">0</span>
                  <input type="hidden" 
                         name="confidence_score"
                         value="{{model.confidence_score}}"
                         class="bulletin-field">

                  <div class="score-editor">

                    <div class="rail">
                      <div class="slider">
                      </a>
                      </div>  
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
                </div>
              </div>
              <!-- end score slider -->


            <!-- Assigned to field name='assigned_user' -->
              <div id="bulletin-assignment-block" class="bulletinAssigned  left">
                <label>{{i18n.bulletin.Assigned_to}}</label>

                <input type="text" class="with-clear is-assigned-to" value="{{model.bulletin_assigned_user}}">
                <input type="hidden" 
                       name="assigned_user"
                       value="{{model.assigned_user}}"
                       class="bulletin-field" >

              <button id="clear-user" class="do-clear">
                <span>✓</span>
              </button>
              </div>
              <!-- end assigned_user -->

            </div>
          </div>

          <!-- Event block -->
          <div id="bulletin-event-block" class="field is-events clear">
          </div>

          <!-- location block -->
          <div id="bulletin-location-block" class="field is-locations">
          </div>

          <!-- map block -->
          <div id="bulletin-map-block" class="is-bulletin-map field"></div>

          <!-- Labels field -->
          <div id="bulletin-label-block" class="field is-tags">
          </div>

        </div>
      </div>
      <div class="clearer"></div>
    </div>
  </div>
  <div class="footer with-revision">
    <div class="actions when-revision hidden Revision-editor clear-after">
      <div class="col first span-33p">
        <div class="body">
          <div class="field is-revision">
            <label for="revision" class="T">{{i18n.bulletin.Revision}}</label>
            <div class="revision clear-after w-100p">
              <span class="number">3</span>
              <span>by John Doe, March 24th 2013</span>
            </div>
          </div>
          <div class="field is-changed">
            <label>Changed</label>
            <ul class="changed as-list">
              <li class="changed">
                <span class="text T">Title</span>
              </li>
              <li class="changed">
                <span class="text T">Date</span>
              </li>
              <li class="changed">
                <span class="text T">Labels</span>
              </li>
              <li class="changed">
                <span class="text T">Bulletins</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col last span-66p">
        <div class="body">
          <div class="field is-description">
            <label for="description" class="T">Changes Description</label>
            <div class="textarea">
              <textarea class="w-100p">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions clear-after when-not_revision">
      <div class="left">
        <div class="when-overlay-expanded">
          <button class="do-collapse-form">
            <span class="text t">» collapse</span>
          </button>
        </div>
        <div class="when-overlay-not_expanded">
          <button class="do-expand-form">
            <span class="text t">« expand</span>
          </button>
        </div>
      </div>
      <div class="right">
        <button id="bulletin-action_save" class="do-select do-toggleRevision default">
          <span class="text t">Save changes</span>
        </button>
      </div>
    </div>
  </div>
