<table>
  <tr>
    <td>{{i18n.monitor.current_job_type}}</td>
    <td>{{model.current_type}}</td>
  </tr>
  <tr>
    <td>{{i18n.monitor.start_time}}</td>
    <td>{{dateTimeFormat model.timestart}}</td>
  </tr>
  <tr>
    <td>{{i18n.monitor.number_files}}</td>
    <td>{{model.total}}</td>
  </tr>
  <tr>
    <td>{{i18n.monitor.number_files_processed}}</td>
    <td>{{model.done}}</td>
  </tr>
  <tr>
    <td>{{i18n.monitor.time_taken}}</td>
    <td>{{formatDuration model.timetaken}}</td>
  </tr>
</table>


<div class="error-reporter">
  {{#if model.num_errors}}
    <div class="error-total">
      {{model.num_errors}} {{i18n.monitor.errors}}
    </div>
    {{#each model.errors}}
    <div class="error-title">{{i18n.monitor.error}}</div>
    <div class="error-message">{{this}}</div>
    {{/each}}
  {{/if}}
</div>

<div class="progress-container">
</div>
