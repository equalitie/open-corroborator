<div class="Bulletin in-list embedded">
  <div class="content">
    <div class="L1">
      <div class="meta">
        {{#if model.confidence_score}}
          <div class="score">
            <span class="value">{{model.confidence_score}}</span>
          </div>
        {{/if}}
        {{#if model.status}}
        <div class="status">
          <span class="value">{{fetchStatus model.status}}</span>
        </div>
        {{/if}}
      </div>
      <div class="title i18n" lang="en">
        <span lang="en">{{model.title_en}}</span>
        <span lang="ar">{{model.title_ar}}</span>
        <span class="toggle">
          <span lang="en">EN</span>
          <span lang="ar">AR</span>
        </span>
      </div>
    </div>
    <div class="L3">
      <div class="date-location">
        <span class="date">{{dateFormatTZ model.bulletin_created}}</span>
      {{#if model.location.[0] }}
        {{i18n.bulletin.in}} <span class="location">{{ model.location.[0]}}</span>
      {{/if}}
      </div>
      {{#if model.count_actors}}
      <div class="involved">
        {{{pluralise tpl=i18n.bulletin.actors_involved numItems=model.count_actors}}}
      </div>
      {{/if}}
    </div>
    {{#if model.result }}
    <div class="when-expanded">
      <div class="actions">
        <div class="left">
          <button class="do-relate">
            <span class="text T">{{i18n.bulletin.Relate}}</span>
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
            <span class="text T">{{i18n.bulletin.Remove}}</span>
          </button>
        </div>
        <div class="clearer"> &nbsp;</div>
      </div>
    </div>
    {{/if}}
  </div>
</div>
