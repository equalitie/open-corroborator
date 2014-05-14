  <div class="header">
    <a href="#" class="form do-hide is-small">
      <span aria-hidden="true" data-icon="&#x78"></span>
      <span class="screen-reader-text">Hide</span>
    </a>
  </div>
  <div class="body" style="bottom: 49px;">
    <div class="first initial span-66p">
    <!-- switch class here is-expanded -> in-preview -->
      <div class="Actor is-edited is-expanded">
        <div class="header">
          <!-- id field - hide for new actor -->
          {{#if model.id}}
          <span class="id">
            ID <span class="value out">{{model.id}}</span>
          </span>
          {{/if}}
          <!-- actor name -->
          <div class="field clear-after hide-multiple">
            <label>{{i18n.actor.Name}}</label>
            <p class="error-text">
              {{i18n.actor.Name_must_be_entered}}
            </p>
            <span class="i18n with-en with-ar">
              <div lang="en">
                <input type="text"
                       name="fullname_en"
                       id="fullname_en"
                       value="{{model.fullname_en}}"
                       class="required actor-field w-100p">
              </div>
              <div lang="ar">
                <input type="text" name="fullname_ar" id="fullname_ar"
                  value="{{model.fullname_ar}}" class="actor-field w-100p">
              </div>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </span>
          </div>
          <!-- description -->
          <div id="actor-description-block" class="field is-description hide-multiple">
            <label>{{i18n.bulletin.Description}}</label>
            <div class="i18n with-en with-ar">
              <div lang="en">
                <textarea id="actor_description_en"
                          name="description_en"
                          type="text"
                          class="actor-field w-100p">{{model.description_en}}</textarea>
              </div>
              <div lang="ar">
                <textarea id="actor_description_ar"
                          name="description_ar"
                          type="text"
                          class="actor-field w-100p">{{model.description_ar}}</textarea>
              </div>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
            </div>
          </div>

          <!-- actor nickname -->
          <div class="field clear-after hide-multiple">
            <label>{{i18n.actor.Nickname}}</label>
            <span class="i18n with-en with-ar">
              <div lang="en">
                <input type="text" name="nickname_en" id="nickname_en"
                  value="{{model.nickname_en}}" class="actor-field w-100p">
              </div>
              <div lang="ar">
                <input type="text" name="nickname_ar" id="nickname_ar"
                  value="{{model.nickname_ar}}" class="actor-field w-100p">
              </div>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </span>
          </div>

          <!-- Place of birth -->
          <div id="actor-condition-block" class="field hide-multiple">
          </div>

          <!-- Assigned to user -->
          {{#if perms.can_assign_users}}
          <div id="actor-assignment-block" class="field actorAssigned">
            <label>{{i18n.incident.Assigned_to}}</label>

            <input type="text" class="with-clear is-assigned-to"
              value="{{model.actor_assigned_user}}">
            <input
              type="hidden"
              name="assigned_user"
              class="actor-field"
              value="{{model.assigned_user}}">

          </div>
          {{/if}}

        </div>
        <!-- end header -->

        <!-- start body -->
        <div class="body">
          <div class="group details">
            <div class="field span-33p">
              <label>{{i18n.actor.Sex}}</label>
              <div id="sex" class="button combo">

                <span class="T selected-option">
                  {{#if model.sex}}
                    {{model.sex}}
                  {{else}}
                    {{i18n.actor.Sex}}
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
                </span>
                <input name="sex" type="hidden" value="{{model.sex}}"class="actor-field">

                <ul class="options">
                  <li class="option selected">
                    <span data-val="Male" class="text T">{{i18n.actor.Male}}</span>
                  </li>
                  <li class="option">
                    <span data-val="Female" class="text T">{{i18n.actor.Female}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="field span-33p">
              <label>{{i18n.actor.ChildAdult}}</label>
              <div id="age" class="button combo">

                <span class="T selected-option">
                  {{#if model.sex}}
                    {{model.age}}
                  {{else}}
                    {{i18n.actor.Age}}
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
                </span>
                <input name="age" type="hidden" value="{{model.age}}" class="actor-field">


                <ul class="options">
                  <li class="option selected">
                    <span data-val="Child" class="text T">{{i18n.actor.Child}}</span>
                  </li>
                  <li class="option">
                    <span data-val="Adult" class="text T">{{i18n.actor.Adult}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="field span-33p">
              <label>{{i18n.actor.CivilianNoncivilian}}</label>
              <div id="civilian" class="button combo">

                <span class="T selected-option">
                  {{#if model.civilian}}
                    {{fetchCivilian model.civilian}}
                  {{else}}
                    {{i18n.actor.Civilian}}
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
                </span>
                <input type="hidden" name="civilian" value="" class="actor-field">


                <ul class="options">
                  <li class="option selected">
                    <span data-val="Civilian" class="text T">{{i18n.actor.Civilian}}</span>
                  </li>
                  <li class="option">
                    <span data-val="Non-civilian" class="text T">{{i18n.actor.Noncivilian}}</span>
                  </li>
                  <li class="option">
                    <span data-val="Police" class="text T">{{i18n.actor.Police}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Date of birth -->
          <div class="field clear-after is-birthdate field hide-multiple">
            <label>{{i18n.actor.Date_Of_Birth}}</label>
            <input type="text" name="DOB" value="{{formDateFormat model.DOB}}"
            class="w-50p actor-field"/>
          </div>

          <!-- Place of birth -->
          <div id="actor-pob-block" class="field hide-multiple">
          </div>

          <!-- map block -->
          <div id="actor-pob-map-block" class="field hide-multiple"></div>

          <!-- Current Location -->
          <div id="actor-current-location-block" class="field"></div>

          <!-- map block -->
          <div id="actor-current-map-block" class="field"></div>

          <!-- Occupation -->
          <div class="field is-occupation">
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <label>{{i18n.actor.Occupation}}</label><br />
                    <input type="text"
                        class="actor-field with-select w-30p"
                        value="{{model.occupation_en}}"
                        name="occupation_en"
                        id="actor_occupation_en">
                </div>
                <div lang="ar">
                    <label>{{i18n.actor.Occupation}}</label><br />
                    <input type="text"
                        class="actor-field with-select w-30p"
                        value="{{model.occupation_ar}}"
                        name="occupation_ar"
                        id="actor_occupation_ar">
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>
          </div>

          <!-- Position -->
          <div class="field is-position">
            <span class="i18n with-en with-ar">
                <div lang="en">
                  <label>{{i18n.actor.Position_rank}}</label><br />
                    <input type="text"
                        class="with-select actor-field w-30p"
                        value="{{model.position_en}}"
                        name="position_en"
                        id="actor_position_en" >

                </div>
                <div lang="ar">
                    <label>{{i18n.actor.Position_rank}}</label><br />
                    <input type="text"
                        class="with-select actor-field w-30p"
                        value="{{model.position_ar}}"
                        name="position_ar"
                        id="actor_position_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>
          </div>

          <!-- Ethnicity -->
          <div class="field is-ethnicity">
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <label>{{i18n.actor.Ethnicity}}</label><br />
                    <input type="text"
                        class="with-select actor-field w-30p"
                        value="{{model.ethnicity_en}}"
                        name="ethnicity_en"
                        id="actor_ethnicity_en" >
                </div>
                <div lang="ar">
                    <label>{{i18n.actor.Ethnicity}}</label><br />
                    <input type="text"
                        class="with-select actor-field w-30p"
                        value="{{model.ethnicity_ar}}"
                        name="ethnicity_ar"
                        id="actor_ethnicity_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>
          </div>

          <!-- Nationality -->
          <div class="field is-nationality">
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <label>{{i18n.actor.Nationality}}</label><br />
                    <input type="text"
                        class="with-select actor-field w-30p"
                        value="{{model.nationality_en}}"
                        name="nationality_en"
                        id="actor_nationality_en">
                </div>
                <div lang="ar">
                    <label>{{i18n.actor.Nationality}}</label><br />
                    <input type="text"
                        class="with-select actor-field w-30p"
                        value="{{model.nationality_ar}}"
                        name="nationality_ar"
                        id="actor_nationality_ar">
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>
          </div>

          <!-- Religion -->
          <div class="field is-religion">
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <label>{{i18n.actor.Religion}}</label><br />
                    <input type="text"
                    class="with-select actor-field w-30p"
                    value="{{model.religion_en}}"
                    name="religion_en"
                    id="actor_religion_en" >
                </div>
                <div lang="ar">
                    <label>{{i18n.actor.Religion}}</label><br />
                    <input type="text"
                    class="with-select actor-field w-30p"
                    value="{{model.religion_ar}}"
                    name="religion_ar"
                    id="actor_religion_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>
          </div>

          <!-- Spoken Dialects -->
          <div class="field is-dialect">
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <label>{{i18n.actor.Spoken_dialects}}</label><br />
                    <input type="text"
                    class="with-select actor-field w-30p"
                    name="spoken_dialect_en"
                    value="{{model.spoken_dialect_en}}"
                    id="actor_spoken_dialect_en" >
                </div>
                <div lang="ar">
                    <label>{{i18n.actor.Spoken_dialects}}</label><br />
                    <input type="text"
                    class="with-select actor-field w-30p"
                    name="spoken_dialect_ar"
                    value="{{model.spoken_dialect_ar}}"
                    id="actor_spoken_dialect_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>
          </div>

          <!-- Actor Field -->
          <div id="actor-actor-list-block" class="field is-actors">
            <label>{{i18n.actor.Actors}}</label><br />
            <div id="actor-actor-search-block" class="search">
              <input type="text" class="with-clear">
              <button class="do-clear">
                <span>✓</span>
              </button>
              <button class="do-search do-search-embedded actors">
                <span>{{i18n.actor.Search}}</span>
              </button>
            </div>
            <ul class="elements elements-actor">
            </ul>
          </div>

          <!-- media search - search for actor images -->
          <div id="actor-media-block" class="field is-media hide-multiple">
          </div>

          <div id="actor-version-block" class="">
            <div id="actor-status-block" class="field add">
              <p class="error-text">
                {{i18n.actor.Select_a_status_for_this_actor}}
              </p>
              <label>{{i18n.actor.Status}}</label>
              <select name="status_uri"
                      id="status"
                      class="required actor-field">
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
              <input class="actor-field" type="hidden" name="status" value="">
            </div>

            <div class="clearer"></div>
            <!-- Comment content field -->
            <div id="actor-status-comment" class="add field">

              <p class="error-text">
                {{i18n.actor.Comment_field_is_required}}
              </p>
              <label>{{i18n.actor.Comment}}</label>
              <textarea
                id="comment"
                name="comment"
                class="required actor-field w-100p"></textarea>

            </div>
          </div>
          <!-- end version info -->

        </div>
      </div>
    <div class="clearer"></div>
  </div>
  <!-- show revision details -->
  <div class="revision-container"></div>
</div>
<div class="footer actions form">
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
  <button id="expanded-actor-save" class="do-save">
    <span class="text t">{{i18n.Save}}</span>
  </button>
</div>
