module.exports = function() {

  return {
    'lib/elements/templates/combo-inner.tpl.js'       : 'lib/elements/templates/combo-inner.tpl',
    'lib/elements/templates/combo-outer.tpl.js'       : 'lib/elements/templates/combo-outer.tpl',
    'lib/elements/templates/label-widget.tpl.js'      : 'lib/elements/templates/label-widget.tpl',
    'lib/elements/templates/label.tpl.js'             : 'lib/elements/templates/label.tpl',
    'lib/elements/templates/select-option.tpl.js'     : 'lib/elements/templates/select-option.tpl',
    'lib/elements/templates/date-time-range.tpl.js'   : 'lib/elements/templates/date-time-range.tpl',

    // search results
    'lib/SolrSearch/templates/results/actor-results.tpl.js'   : 'lib/SolrSearch/templates/results/actor-results.tpl',
    'lib/SolrSearch/templates/results/empty-results.tpl.js'   : 'lib/SolrSearch/templates/results/empty-results.tpl',
    'lib/SolrSearch/templates/results/actor.tpl.js'           : 'lib/SolrSearch/templates/results/actor.tpl',
    'lib/SolrSearch/templates/results/incident.tpl.js'        : 'lib/SolrSearch/templates/results/incident.tpl',
    'lib/SolrSearch/templates/results/incident-results.tpl.js': 'lib/SolrSearch/templates/results/incident-results.tpl',
    'lib/SolrSearch/templates/results/bulletin-results.tpl.js': 'lib/SolrSearch/templates/results/bulletin-results.tpl',
    'lib/SolrSearch/templates/results/bulletin.tpl.js'        : 'lib/SolrSearch/templates/results/bulletin.tpl',

    // header
    'lib/SolrSearch/templates/header-count.tpl.js'    : 'lib/SolrSearch/templates/header-count.tpl',
    'lib/SolrSearch/templates/header.tpl.js'          : 'lib/SolrSearch/templates/header.tpl',
    'lib/SolrSearch/templates/sort/delete-dialog.tpl.js'          : 'lib/SolrSearch/templates/sort/delete-dialog.tpl',

    //sort
    'lib/SolrSearch/templates/sort/sort.tpl.js'       : 'lib/SolrSearch/templates/sort/sort.tpl',
    'lib/SolrSearch/templates/sort/sort-actors.tpl.js': 'lib/SolrSearch/templates/sort/sort-actors.tpl',
    // filters
    'lib/SolrSearch/templates/filters/filter-group.tpl.js'         : 'lib/SolrSearch/templates/filters/filter-group.tpl',
    'lib/SolrSearch/templates/filters/dropdown-filter-group.tpl.js': 'lib/SolrSearch/templates/filters/dropdown-filter-group.tpl',
    'lib/SolrSearch/templates/filters/single-filter.tpl.js'        : 'lib/SolrSearch/templates/filters/single-filter.tpl',
    'lib/SolrSearch/templates/filters/incident-filters.tpl.js'     : 'lib/SolrSearch/templates/filters/incident-filters.tpl',
    'lib/SolrSearch/templates/filters/actor-filters.tpl.js'        : 'lib/SolrSearch/templates/filters/actor-filters.tpl',
    'lib/SolrSearch/templates/filters/bulletin-filters.tpl.js'     : 'lib/SolrSearch/templates/filters/bulletin-filters.tpl',
    'lib/SolrSearch/templates/filters/selected-filters.tpl.js'     : 'lib/SolrSearch/templates/filters/selected-filters.tpl',
    'lib/SolrSearch/templates/filters/date-range.tpl.js'           : 'lib/SolrSearch/templates/filters/date-range.tpl',
    'lib/SolrSearch/templates/filters/selected-filter.tpl.js'      : 'lib/SolrSearch/templates/filters/selected-filter.tpl',
    'lib/SolrSearch/templates/filters/map-container.tpl.js'      : 'lib/SolrSearch/templates/filters/map-container.tpl',

    // Navigation
    'lib/Navigation/templates/search-help.tpl.js': 'lib/Navigation/templates/search-help.tpl',

    // dialogs
    'lib/SolrSearch/templates/save-search-dialog.tpl.js': 'lib/SolrSearch/templates/save-search-dialog.tpl',

    // entity not found
    'lib/CRUD/templates/display-templates/misc/entity-not-found.tpl.js': 'lib/CRUD/templates/display-templates/misc/entity-not-found.tpl',
    // forms
    // actor
    'lib/CRUD/templates/search-templates/actor/actor.tpl.js'                : 'lib/CRUD/templates/search-templates/actor/actor.tpl',
    'lib/CRUD/templates/search-templates/actor/expanded-actor.tpl.js'       : 'lib/CRUD/templates/search-templates/actor/expanded-actor.tpl',
    'lib/CRUD/templates/search-templates/actor/actor-result.tpl.js'         : 'lib/CRUD/templates/search-templates/actor/actor-result.tpl',
    'lib/CRUD/templates/search-templates/actor/actor-search-field.tpl.js'   : 'lib/CRUD/templates/search-templates/actor/actor-search-field.tpl',

    //bulletin
    'lib/CRUD/templates/search-templates/bulletin/bulletin.tpl.js'             : 'lib/CRUD/templates/search-templates/bulletin/bulletin.tpl',
    'lib/CRUD/templates/search-templates/bulletin/expanded-bulletin-display.tpl.js'    : 'lib/CRUD/templates/search-templates/bulletin/expanded-bulletin-display.tpl',
    'lib/CRUD/templates/search-templates/bulletin/bulletin-result.tpl.js'      : 'lib/CRUD/templates/search-templates/bulletin/bulletin-result.tpl',
    'lib/CRUD/templates/search-templates/bulletin/bulletin-search-field.tpl.js': 'lib/CRUD/templates/search-templates/bulletin/bulletin-search-field.tpl',

    //incident
    'lib/CRUD/templates/search-templates/incident/incident-search-field.tpl.js'    : 'lib/CRUD/templates/search-templates/incident/incident-search-field.tpl',
    'lib/CRUD/templates/search-templates/incident/incident-result.tpl.js'          : 'lib/CRUD/templates/search-templates/incident/incident-result.tpl',
    'lib/CRUD/templates/search-templates/incident/incident.tpl.js'                 : 'lib/CRUD/templates/search-templates/incident/incident.tpl',
    'lib/CRUD/templates/search-templates/incident/expanded-incident-display.tpl.js': 'lib/CRUD/templates/search-templates/incident/expanded-incident-display.tpl',

    //media
    'lib/CRUD/templates/search-templates/media/media-search-field.tpl.js'   : 'lib/CRUD/templates/search-templates/media/media-search-field.tpl',
    'lib/CRUD/templates/search-templates/media/media-result.tpl.js'         : 'lib/CRUD/templates/search-templates/media/media-result.tpl',
    'lib/CRUD/templates/search-templates/media/media-viewer.tpl.js'         : 'lib/CRUD/templates/search-templates/media/media-viewer.tpl',
    'lib/CRUD/templates/search-templates/media/media-form.tpl.js'           : 'lib/CRUD/templates/search-templates/media/media-form.tpl',

    'lib/CRUD/templates/search-templates/embedded-results.tpl.js'     : 'lib/CRUD/templates/search-templates/embedded-results.tpl',
    'lib/CRUD/templates/search-templates/confirm-dialog.tpl.js'       : 'lib/CRUD/templates/search-templates/confirm-dialog.tpl',

    //'lib/CRUD/templates/search-templates/location-search-field.tpl.js': 'lib/CRUD/templates/search-templates/location-search-field.tpl',
    //'lib/CRUD/templates/search-templates/location-result.tpl.js'      : 'lib/CRUD/templates/search-templates/location-result.tpl',

    //comment
    'lib/CRUD/templates/search-templates/comment/comment-container.tpl.js'    : 'lib/CRUD/templates/search-templates/comment/comment-container.tpl',
    'lib/CRUD/templates/search-templates/comment/comment-form.tpl.js'         : 'lib/CRUD/templates/search-templates/comment/comment-form.tpl',
    'lib/CRUD/templates/search-templates/comment/comment-display.tpl.js'      : 'lib/CRUD/templates/search-templates/comment/comment-display.tpl',

    //event
    'lib/CRUD/templates/search-templates/event/event-container.tpl.js'      : 'lib/CRUD/templates/search-templates/event/event-container.tpl',
    'lib/CRUD/templates/search-templates/event/event-form.tpl.js'           : 'lib/CRUD/templates/search-templates/event/event-form.tpl',
    'lib/CRUD/templates/search-templates/event/event-display.tpl.js'        : 'lib/CRUD/templates/search-templates/event/event-display.tpl',
   
    //revisions
    'lib/CRUD/templates/search-templates/revision/revision-container.tpl.js'      : 'lib/CRUD/templates/search-templates/revision/revision-container.tpl',

    // form and display
    'lib/CRUD/templates/map-container.tpl.js'   : 'lib/CRUD/templates/map-container.tpl',

    // individual display
    'lib/CRUD/templates/display-templates/display-manager.tpl.js'                    : 'lib/CRUD/templates/display-templates/display-manager.tpl',
    'lib/CRUD/templates/display-templates/actor-display.tpl.js'                      : 'lib/CRUD/templates/display-templates/actor-display.tpl',
    'lib/CRUD/templates/display-templates/bulletin-display.tpl.js'                   : 'lib/CRUD/templates/display-templates/bulletin-display.tpl',
    'lib/CRUD/templates/display-templates/incident-display.tpl.js'                   : 'lib/CRUD/templates/display-templates/incident-display.tpl',
    'lib/CRUD/templates/display-templates/media/media-container.tpl.js'              : 'lib/CRUD/templates/display-templates/media/media-container.tpl',
    'lib/CRUD/templates/display-templates/media/media.tpl.js'                        : 'lib/CRUD/templates/display-templates/media/media.tpl',
    'lib/CRUD/templates/display-templates/misc/comment-container.tpl.js'             : 'lib/CRUD/templates/display-templates/misc/comment-container.tpl',
    'lib/CRUD/templates/display-templates/misc/comment.tpl.js'                       : 'lib/CRUD/templates/display-templates/misc/comment.tpl',
    'lib/CRUD/templates/display-templates/events/event-container.tpl.js'             : 'lib/CRUD/templates/display-templates/events/event-container.tpl',
    'lib/CRUD/templates/display-templates/events/event.tpl.js'                       : 'lib/CRUD/templates/display-templates/events/event.tpl',
    'lib/CRUD/templates/display-templates/actors/actor-container.tpl.js'             : 'lib/CRUD/templates/display-templates/actors/actor-container.tpl',
    'lib/CRUD/templates/display-templates/actors/actor.tpl.js'                       : 'lib/CRUD/templates/display-templates/actors/actor.tpl',
    'lib/CRUD/templates/display-templates/actors/expanded-actor-display.tpl.js'      : 'lib/CRUD/templates/display-templates/actors/expanded-actor-display.tpl',
    'lib/CRUD/templates/display-templates/incident/incident-container.tpl.js'        : 'lib/CRUD/templates/display-templates/incident/incident-container.tpl',
    'lib/CRUD/templates/display-templates/incident/incident.tpl.js'                  : 'lib/CRUD/templates/display-templates/incident/incident.tpl',
    'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl.js' : 'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl',
    'lib/CRUD/templates/display-templates/bulletins/bulletin-container.tpl.js'       : 'lib/CRUD/templates/display-templates/bulletins/bulletin-container.tpl',
    'lib/CRUD/templates/display-templates/bulletins/bulletin.tpl.js'                 : 'lib/CRUD/templates/display-templates/bulletins/bulletin.tpl',
    'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl.js': 'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl'
  };
};
