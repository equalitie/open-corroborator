<form>
  <table>
    <tr class="field">
      <td>{{i18n.importer.media_directory}}</td>
      <td>
      <p class="error-text">
        {{i18n.importer.media_directory_required}}
      </p>
      <input 
        type="text"
        name="media_dir"
        id="media_dir"
        value="{{model.media_params.media_dir}}"
        class="required importer-field"></td>
    </tr>
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
        class="required importer-field"></td>
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
      class="required importer-field"></td>
    </tr>
    <tr class="field">
      <td>{{i18n.importer.mysql_directory}}</td>
      <td>
      <p class="error-text">
        {{i18n.importer.mysql_dir_required}}
      </p>
      <input
      type="text"
      name="mysql_dir"
      id="mysql_dir"
      value="{{model.mysql_dir}}"
      class="required importer-field"></td>
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
      class="required importer-field"></td>
    </tr>
    <tr>
      <td></td>
      <td>
        <input
        type="submit"
        value="{{i18n.importer.save_config}}">
      </td>
    </tr>
  </table>
</form>
