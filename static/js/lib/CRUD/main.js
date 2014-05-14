// Author: Cormac McGuire

// ### Description
// Entry point for the handling of CRUD functionality
// Creates a form manager that shows forms for our different entities
// Creates a display manager that displays the different entities
// Creates the EmbeddedResultsManagerView which listens for requests
// to display actors, bulletins, incidents and media which can then be related
// 
define (
  [
    'lib/CRUD/views/form-manager',
    'lib/CRUD/views/display-views/display-view-manager',
    'lib/CRUD/views/search-views/embedded-results-manager'
  ],
  function (FormManager, EmbeddedResultsManagerView, DisplayManagerView) {
    'use strict';

    var formManagerView,
        embeddedSearchView,
        displayManagerView,
        init = function() {
          formManagerView = new FormManager.FormManagerView();
          embeddedSearchView = new EmbeddedResultsManagerView();
          displayManagerView = new DisplayManagerView();
        };
    return {
      init: init
    };

});

