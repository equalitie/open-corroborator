<table>
    <tr class="field">
      <td>{{i18n.importer.actor_csv_directory}}</td>
      <td>
      <p class="error-text">
        {{i18n.importer.actor_dir_required}}
      </p>
      <input
        type="text"
        name="actors_dir"
        id="actors_dir"
        value="{{model.actors_dir}}"
        class="required scraper-field"></td>
    </tr>
    <tr class="field">
      <td>{{i18n.importer.bulletin_csv_directory}}</td>
      <td>
      <p class="error-text">
        {{i18n.importer.bulletin_dir_required}}
      </p>
      <input
      type="text"
      name="bulletins_dir"
      id="bulletins_dir"
      value="{{model.bulletins_dir}}"
      class="required scraper-field"></td>
    </tr>
    <tr class="field">
      <td>{{i18n.importer.set_job_time}}</td>
      <td>
      <p class="error-text">
        {{i18n.importer.job_time_required}}
      </p>
      <input
      type="text"
      name="next_job_time"
      id="next_job_time"
      value="{{dateTimeFormat model.next_job_time}}"
      class="required scraper-field"></td>
    </tr>
  <tr>
    <td><b>{{i18n.scraper.enable_scrapers}}</b></td>
  </tr>
  {{#each model.scrapers}}
  <tr class="field">
    <td>{{label}}</td>
    <td>
      <input 
        {{#if enabled}}checked{{/if}}
        type="checkbox"
        id="{{site}}"
        name="{{site}}"
        value="true"
        class="scraper-field"
        >
    </td>
  </tr>
  {{/each}}
  <tr>
    <td></td>
    <td>
      <input
      type="submit"
      value="{{i18n.importer.save_config}}">
    </td>
  </tr>
</table>

