<div class="Incident in-list embedded">
  <div class="L1">
    <div class="meta">
      <div class="score">
        <span class="value">{{model.confidence_score}}</span>
      </div>
      <div class="status">
        <span class="value">{{model.status}}</span>
      </div>
    </div>
    <div class="title i18n">
      <span lang="en">{{model.title_en}}</span>
      <!--
      <span lang="ar">{{model.title_ar}}</span>
      <span class="toggle">
        <span lang="en">EN</span><span lang="ar">AR</span>
      </span>
      -->
    </div>
  </div>
  <div class="L3">
    <div class="date-location">
      <span class="date">{{dateFormatTZ model.incident_created}}</span> in <span class="location">Damas, Syriah</span>
    </div>
  </div>
  {{#if model.result }}
  <div class="when-expanded">
    <div class="actions">
      <div class="left">
        <button class="do-relate">
          <span class="text T">{{i18n.incident.Relate}}</span>
        </button>
      </div>
      <div class="clearer">&nbsp;</div>
    </div>
  </div>
  {{/if}}
  {{#if model.selected }}
  <div class="when-related">
    <div class="actions">
      <div class="right">
        <button class="do-remove">
          <span class="text T"> {{i18n.incident.Remove}}</span>
        </button>
      </div>
      <div class="clearer"> &nbsp;</div>
    </div>
  </div>
  {{/if}}
</div>
