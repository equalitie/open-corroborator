<div class="actions">
  <button class="do-remove-event is-small">
    <span aria-hidden="true" data-icon="&#x58;"></span>
    <span class="screen-reader-text">{{i18n.event.Remove}}</span>
  </button>

  <button class="do-edit-event is-small">
    <span aria-hidden="true" data-icon="e"></span>
    <span class="screen-reader-text">{{i18n.Edit}}</span>
  </button>

</div>
  <div class="content">
    
    {{#if model.confidence_score}}
    <div class="score">
      <div class="value">{{model.confidence_score}}</div>
    </div>
    {{/if}}

    {{#if model.event_name_en}}
      <div class="name">{{model.event_name_en}}</div>
    {{/if}}
    {{!--
    {{#if model.event_name_ar}}
      <div class="name">{{model.event_name_ar}}</div>
    {{/if}}
    --}}

    {{#if model.comments_en}}
      <div class="name">{{model.comments_en}}</div>
    {{/if}}

    {{!--
    {{#if model.comments_ar}}
      <div class="name">{{model.comments_ar}}</div>
    {{/if}}
    --}}

    <div class="time">
      {{#if model.time_from}}
        {{#if model.time_to}}
          {{i18n.events.from}}
        {{/if}}
      {{/if}}

      {{#if model.time_from}}
        <span class="start">{{dateFormat model.time_from}}</span>
      {{/if}}

      {{#if model.time_from}}
        {{#if model.time_to}}
          {{i18n.events.to}}
        {{/if}}
      {{/if}}

      {{#if model.time_to}}
      <span class="end">{{dateFormat model.time_to}}</span>
      {{/if}}
    </div>
  </div>
<div class="clearer"></div>
