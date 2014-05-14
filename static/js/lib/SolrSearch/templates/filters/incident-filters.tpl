<div class="header incident-display">
  <div class="padding">
    <div class="group is-creator">
      <button class="do-create-incident create">
        <span aria-hidden="true" data-icon="e"></span>
        <span class="text T">{{i18n.filters.new_incident}}</span>
      </button>
    </div>
  </div>
</div>
<div class="body incident-filter" >
  <div class="padding">
    <div class="group is-filters filters">
      <!-- enabled filters -->
      <div class="selected-incident-filters filter is-labels">
      </div>

      <!-- filter groups go in here -->
      <div class="filter-groups">
        <div class="incident_searchable_locations_exact map-filter-container"></div>
        <div class="dd-filters"></div>
        <div class="standard-filters"></div>
        <div class="date-range"></div>
      </div>

    </div>
  </div>
</div>
