  <div class="header">
    <button class="do-hide is-small">
      <span class="t">{{i18n.Hide}}</span>
    </button>
  </div>
  <div class="body" style="bottom: 49px;">
    <div class="first span-66p">
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
          <div class="field clear-after">
            <label>{{i18n.actor.Name}}</label>
            <span class="i18n with-en with-ar">
              <div lang="en">
                <input type="text" name="fullname_en" id="fullname_en" 
                  value="{{model.fullname_en}}" class="actor-field w-100p">
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

          <!-- actor nickname -->
          <div class="field clear-after">
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

        </div>
        <!-- end header -->

        <!-- start body -->
        <div class="body">
          <div class="group details">
            <div class="field span-33p">
              <label>{{i18n.actor.Sex}}</label>
              <div id="sex_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.sex_en}}
                    {{model.sex_en}}
                  {{else}}
                    {{i18n.actor.Sex}}
                  {{/if}}
                </span>
                <input name="sex_en" type="hidden" value="{{model.sex_en}}"class="actor-field">
        
                <ul class="options">
                  <li class="option selected">
                    <span class="text T">{{i18n.actor.Male}}</span>
                  </li>
                  <li class="option">
                    <span class="text T">{{i18n.actor.Female}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="field span-33p">
              <label>{{i18n.actor.ChildAdult}}</label>
              <div id="age_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.sex_en}}
                    {{model.age_en}}
                  {{else}}
                    {{i18n.actor.Age}}
                  {{/if}}
                </span>
                <input name="age_en" type="hidden" value="{{model.age_en}}" class="actor-field">
        

                <ul class="options">
                  <li class="option selected">
                    <span class="text T">{{i18n.actor.Child}}</span>
                  </li>
                  <li class="option">
                    <span class="text T">{{i18n.actor.Adult}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="field span-33p">
              <label>{{i18n.actor.CivilianNoncivilian}}</label>
              <div id="civilian_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.civilian_en}}
                    {{model.civilian_en}}
                  {{else}}
                    {{i18n.actor.Civilian}}
                  {{/if}}
                </span>
                <input type="hidden" name="civilian_en" value="" class="actor-field">
        

                <ul class="options">
                  <li class="option selected">
                    <span class="text T">{{i18n.actor.Civilian}}</span>
                  </li>
                  <li class="option">
                    <span class="text T">{{i18n.actor.Noncivilian}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Date of birth -->
          <div class="field clear-after is-birthdate field ">
            <label>{{i18n.actor.Date_of_birth}}</label>
            <input type="text" name="DOB" value="{{formDateFormat model.DOB}}"
            class="w-50p actor-field"/>
          </div>

          <!-- Place of birth -->
          <div id="actor-pob-block" class="field">
          </div>

          <!-- map block -->
          <div id="actor-pob-map-block" class="field"></div>

          <!-- Current Location -->
          <div id="actor-current-location-block" class="field"></div>

          <!-- map block -->
          <div id="actor-current-map-block" class="field"></div>

          <!-- Occupation -->
          <div class="field is-occupation">
            <label>{{i18n.actor.Occupation}}</label>
            <input type="text" class="actor-field with-select w-30p" value="{{model.occupation_en}}" 
              name="occupation_en" id="actor_occupation_en">
          </div>

          <!-- Position -->
          <div class="field is-position">
            <label>{{i18n.actor.Position_rank}}</label>
            <input type="text" class="with-select actor-field w-30p" value="{{model.position_en}}" 
              name="position_en" id="actor_position_en" >
          </div>

          <!-- Ethnicity -->
          <div class="field is-ethnicity">
            <label>{{i18n.actor.Ethnicity}}</label>
            <input type="text" class="with-select actor-field w-30p" value="{{model.ethnicity_en}}"
              name="ethnicity_en" id="actor_ethnicity_en" >
          </div>

          <!-- Nationality -->
          <div class="field is-nationality">
            <label>{{i18n.actor.Nationality}}</label>
            <input type="text" class="with-select actor-field w-30p" value="{{model.nationality_en}}"
              name="nationality_en" id="actor_nationality_en">
          </div>

          <!-- Religion -->
          <div class="field is-religion">
            <label>{{i18n.actor.Religion}}</label>
            <input type="text" class="with-select actor-field w-30p" value="{{model.religion_en}}"
              name="religion_en" id="actor_religion_en" >
          </div>

          <!-- Spoken Dialects -->
          <div class="field is-dialect">
            <label>{{i18n.actor.Spoken_dialects}}</label>
            <input type="text" class="with-select actor-field w-30p" name="spoken_dialect_en"
              value="{{model.spoken_dialect_en}}" id="actor_spoken_dialect_en" >
          </div>

          <!-- Actor Field -->
          <div id="actor-actor-list-block" class="field is-actors">
            <label>{{i18n.actor.Actors}}</label>
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
          <div id="actor-media-block" class="field is-media">
          </div>

        </div>
      </div>
      <div class="clearer"></div>
    </div>
  </div>
  <div class="footer actions">
    <div class="left">
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
    </div>
    <div class="right">
      <button id="expanded-actor-save" class="do-save">
        <span class="text t">{{i18n.Save}}</span>
      </button>
    </div>
  </div>
