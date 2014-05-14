  <td class="is-selector">
    <input type="checkbox" {{model.checked}}>
  </td>
  <td class="is-description">
    <a href="#bulletin/{{model.id}}">
      <div class="title text i18n">
        {{#if model.title_en }}
        <span >{{model.title_en}}</span>
        {{/if}}
        {{#if model.title_ar }}
        <span >{{model.title_ar}}</span>
        {{/if}}
      </div>
      <div class="meta text">
        {{#if model.actors.length}}
        <span class="actors">
        {{pluralise tpl=i18n.results.num_actors numItems=model.actors.length }}
        </span> 
        {{/if}}
      </div>
      <div class="details text">
        <span class="date">{{dateFormat model.bulletin_created}}</span>
        {{#if model.locations}}
          {{commaSeparatedList list=model.locations}}
        {{/if}}

        {{#if model.bulletin_sources}}
          (
          {{sourceList model.bulletin_sources}}
          )
        {{/if}}
      </div>
    </a>
    </td>
    <td class="is-status">
    {{#if model.most_recent_status_bulletin}}
    <span class="status">
    <span class="text">{{fetchStatus model.most_recent_status_bulletin}}</span>
    </span>
    {{/if}}
    </td>
  <td class="is-score">
  <span class="value">{{model.confidence_score}}</span>
  </td>
