  <div class="span-70p">

    <div class="i18n with-en with-ar">
      <label>{{i18n.event.Description}}</label>
      <div lang="en">
        <textarea name="event_name_en"
          class="w-100p {{entityType}}-field bulletin_event-description">{{model.event_name_en}}</textarea>
      </div>
      <!--
      <div lang="ar">
        <textarea name="event_name_ar"
          class="w-100p {{entityType}}-field bulletin_event-description">{{model.event_name_ar}}</textarea>
      </div>
      <span class="toggle">
        <span lang="en">EN</span><span lang="ar">AR</span>
      </span>
      -->
    </div>


  </div>
  <div class="clearer">&nbsp;</div>
  <div class="span-70p">

  <div class="i18n with-en with-ar">
      <label>{{i18n.event.Comment}}</label>
      <div lang="en">
        <textarea
          id="comments_en"
          name="comments_en"
          class="{{entityType}}-field w-100p">{{model.comments_en}}</textarea>
      </div>
      <!--
      <div lang="ar">
        <textarea
          id="comments_ar"
          name="comments_ar"
          class="{{entityType}}-field w-100p">{{model.comments_ar}}</textarea>
      </div>
      <span class="toggle">
      <span lang="en">EN</span><span lang="ar">AR</span>
      </span>
      -->
  </div>


  </div>


  <div class="clearer">&nbsp;</div>
  <div class="span-70p">
    <span class="score">
      <span class="bulletin_event-cscore value"></span>
      <input type="hidden" name="confidence_score"
        class="{{entityType}}-field"
        value="{{model.confidence_score}}"
      >
    </span>
    <!-- Reliability score slider -->
    <label>{{i18n.event.Reliability_score}}</label>
    <div class="score-editor">
      <div class="rail">
        <div class="slider">
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
  <div class="clearer">&nbsp;</div>
  <div class="event-time-range">
  </div>
  <div class="span-30p">
    <label></label><br/>
    <div class="pad">
      <button class="do-addEvent">
        <span class="T">{{i18n.event.Save_Event}}</span>
      </button>
    </div>
  </div>
  <div class="clearer">&nbsp;</div>
