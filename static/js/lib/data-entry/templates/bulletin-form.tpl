  <div class="header">
    <h1>{{i18n.bulletin_label}}</h1>
  </div>
  <div class="body" style="bottom: 49px;">
    <div class="Bulletin is-edited is-expanded">
      <div class="first initial span-66p">
        <div class="header">
          {{#if model.id}}
          <span class="id">
            ID <span id="view-bulletin-id" class="value out">{{model.id}}</span>
          </span>
          {{/if}}
          <div class="field is-title hide-multiple">
            <p class="error-text">
              {{i18n.bulletin.Title_field_is_required}}
            </p>
            <label>{{i18n.bulletin.Title}}</label>
            <span class="i18n with-en with-ar">
              <div lang="en">
              <textarea
                id="incident_title_en"
                type="text"
                name="title_en"
                class="required bulletin-field
                w-100p">{{model.title_en}}</textarea>
              </div>
              <!--
              <div lang="ar">
                <label>{{i18n.bulletin.Title}}</label>
                <textarea
                  id="incident_title_ar"
                  name="title_ar"
                  type="text"
                  class="bulletin-field
                  w-100p">{{model.title_ar}}</textarea>
              </div>
                <span class="toggle">
                  <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
              -->
            </span>
          </div>
        </div>
      </div>
      <div class="last initial span-33p">
        <div class="group details">
          <div class="field clear-after">

            <!-- score slider -->
            <div id="bulletin-score-block" class="is-score right">
              <label>{{i18n.bulletin.Score}}</label>
              <div class="score">

                <span id="bulletin_confidence_score" class="value">{{model.confidence_score}}</span>
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

          </div>
        </div>
      </div>
      <div class="first span-66p">
        <div class="body">

          <!-- Sources field -->
          <div id="bulletin-source-block" class="field is-sources">
          </div>
          <!-- Labels field -->
          <div id="bulletin-label-block" class="field is-tags"> </div>

          <div id="bulletin-media-block" class="field is-media hide-multiple">
          </div>

          <!-- description -->
          <div id="bulletin-description-block" class="field is-description hide-multiple">
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
          <!-- location block -->
          <div id="bulletin-location-block" class="field is-locations">
          </div>

          <!-- map block -->
          <div id="bulletin-map-block" class="is-bulletin-map field"></div>

          <!-- Related Actors -->
          <div id="bulletin-actor-list-block" class="field is-actors">
          </div>

          <!-- Related bulletins -->
          <div id="bulletin-bulletin-block" class="field is-bulletins">
          </div>


          <!-- Update Comment content field -->
          {{#if model.id}}
          <div id="bulletin-status-comment-block" class="field add">
            <p class="error-text">
              {{i18n.bulletin.Comment_field_is_required}}
            </p>
            <label>{{i18n.bulletin.Comment}}</label>
            <textarea
              id="comment"
              name="comment"
              class="required bulletin-field w-100p"></textarea>
          </div>
          {{/if}}

        </div>
      </div>
      <!-- end first col -->
      <div class="last span-33p">
        <div class="body">

          <!-- Event block -->
          <!-- <div id="bulletin-comment-block" class="field is-comments hide-multiple clear"> -->
          <!-- </div> -->

          <!-- Event block -->
          <div id="bulletin-event-block" class="field is-events hide-multiple clear">
          </div>



        </div>
      </div>
      <input type="button" class="save-data-entry" value="{{i18n.Save}}">
    </div>

  </div>
