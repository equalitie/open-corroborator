/*global define*/
// Author: Cormac McGuire
// ### all the solr facet fields
// 

define(
  [],
  function() {
  'use strict';
    return [ 
          //Bulletin fields
          'bulletin_labels_exact',
          'bulletin_assigned_user_exact',
          'bulletin_sources_exact',
          'bulletin_created_exact',
          'bulletin_searchable_locations_exact',
          'most_recent_status_bulletin_exact',

          'confidence_score_exact',
          'incident_times_exact',
          'incident_labels_exact', 
          'incident_assigned_user_exact',

          'incident_crimes_exact',
          'incident_created_exact',
          'incident_searchable_locations_exact',
          'most_recent_status_incident_exact',

          'most_recent_status_actor_exact',
          'age_exact',
          'sex_exact',
          'civilian_exact',
          'civilian_exact',

          'religion_en_exact',
          'religion_ar_exact',


          'nationality_en_exact',
          'nationality_ar_exact',
          //'occupation_en_exact',
          //'occupation_ar_exact',
          //'position_en_exact',
          //'position_ar_exact',
          'ethnicity_en_exact',
          'ethnicity_ar_exact',
          'spoken_dialect_en_exact',
          'spoken_dialect_ar_exact',
          'actor_searchable_current_exact',
          'actor_searchable_pob_exact'
          //'current_location_exact',
          //'POB_exact',
        ];
  
  }
);
