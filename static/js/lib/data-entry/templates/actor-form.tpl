  <div class="header">
    <h1>{{i18n.actor_label}}</h1>
  </div>
  <div class="body" style="bottom: 49px;">
    <div class="Actor is-edited is-expanded">
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
            <label>Name</label>
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

          <!-- actor nickname -->
          <div class="field clear-after hide-multiple">
            <label>Nickname</label>
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
            <div class="field span-28p">
              <label>{{i18n.actor.Sex}}</label>
              <div id="sex_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.sex_en}}
                    {{model.sex_en}}
                  {{else}}
                    Sex
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
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
            <div class="field span-28p">
              <label>{{i18n.actor.ChildAdult}}</label>
              <div id="age_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.sex_en}}
                    {{model.age_en}}
                  {{else}}
                    {{i18n.actor.Age}}
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
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
            <div class="field span-28p">
              <label>{{i18n.actor.CivilianNoncivilian}}</label>
              <div id="civilian_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.civilian_en}}
                    {{model.civilian_en}}
                  {{else}}
                    {{i18n.actor.Civilian}}
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
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

          <!-- media search - search for actor images -->
          <div id="actor-media-block" class="field is-media hide-multiple">
          </div>

          <!-- Update Comment content field -->
          {{#if model.id}}
          <div id="actor-status-comment-block" class="field add">
            <p class="error-text">
              {{i18n.actor.Comment_field_is_required}}
            </p>
            <label>{{i18n.actor.Comment}}</label>
            <textarea 
              id="comment"
              name="comment"
              class="required actor-field w-100p"></textarea>
          </div>
          {{/if}}

        </div>
      </div>
    <div class="clearer"></div>
  </div>
  <div class="last span-33p">
    <div class="body">
      <!-- Occupation -->
      <div class="field is-occupation">
        <label>{{i18n.actor.Occupation}}</label>
        <span class="i18n with-en with-ar">
            <div lang="en">
                <input type="text" 
                    class="actor-field with-select" 
                    value="{{model.occupation_en}}" 
                    name="occupation_en" 
                    id="actor_occupation_en">
            </div>
            <div lang="ar">
                <input type="text" 
                    class="actor-field with-select" 
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
        <label>{{i18n.actor.Position_rank}}</label>
        <span class="i18n with-en with-ar">
            <div lang="en">
                <input type="text" 
                    class="with-select actor-field" 
                    value="{{model.position_en}}" 
                    name="position_en" 
                    id="actor_position_en" >

            </div>
            <div lang="ar">
                <input type="text" 
                    class="with-select actor-field" 
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
        <label>{{i18n.actor.Ethnicity}}</label>
        <span class="i18n with-en with-ar">
            <div lang="en">
                <input type="text" 
                    class="with-select actor-field" 
                    value="{{model.ethnicity_en}}"
                    name="ethnicity_en" 
                    id="actor_ethnicity_en" >
            </div>
            <div lang="ar">
                <input type="text" 
                    class="with-select actor-field" 
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
        <label>{{i18n.actor.Nationality}}</label>
        <span class="i18n with-en with-ar">
            <div lang="en">
                <input type="text" 
                    class="with-select actor-field" 
                    value="{{model.nationality_en}}"
                    name="nationality_en" 
                    id="actor_nationality_en">
            </div>
            <div lang="ar">
                <input type="text" 
                    class="with-select actor-field" 
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
        <label>{{i18n.actor.Religion}}</label>
        <span class="i18n with-en with-ar">
            <div lang="en">
                <input type="text" 
                class="with-select actor-field" 
                value="{{model.religion_en}}"
                name="religion_en" 
                id="actor_religion_en" >
            </div>
            <div lang="ar">
                <input type="text" 
                class="with-select actor-field" 
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
        <label>{{i18n.actor.Spoken_dialects}}</label>
        <span class="i18n with-en with-ar">
            <div lang="en">
                <input type="text" 
                class="with-select actor-field " 
                name="spoken_dialect_en"
                value="{{model.spoken_dialect_en}}" 
                id="actor_spoken_dialect_en" >
            </div>
            <div lang="ar">
                <input type="text" 
                class="with-select actor-field" 
                name="spoken_dialect_ar"
                value="{{model.spoken_dialect_ar}}" 
                id="actor_spoken_dialect_ar" >
            </div>
            <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
            </span>
        </span>          
      </div>
    </div>
    </div>
      <input type="button" class="save-data-entry" value="{{i18n.Save}}">
  </div>
</div>
