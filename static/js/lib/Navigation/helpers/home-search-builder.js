/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description: 
// Create search object with the current user

define(
  ['backbone'],
  function (Backbone) {
  'use strict';
  var SearchModel, getSearchModel, username;
  username = Bootstrap.username;

  var bulletinFilters = [{
    displayFilterName: Bootstrap.username,
    filterName: Bootstrap.username,
    key: 'bulletin_assigned_user_exact',
    title: 'Assigned to',
    type: 'bulletin'
  }];

  var incidentFilters = [{
    displayFilterName: Bootstrap.username,
    filterName: Bootstrap.username,
    key: 'incident_assigned_user_exact',
    title: 'Assigned to',
    type: 'incident'
  }];

  SearchModel = Backbone.Model.extend({
    initialize: function() {
      this.set('actor_filters', []);
      this.set('bulletin_filters', bulletinFilters);
      this.set('incident_filters', incidentFilters);
      this.set('name_en', 'home search');
      this.set('search_request', 'predefined_search');
      this.set('search_string', '');
      this.set('type', 'predefined_search');
    }
  });

  var searchModel = new SearchModel();

  getSearchModel = function() {
    return searchModel;
  };

  return {getSearchModel: getSearchModel};
  
});
