// filter data
// provide test data for unit tests
define (
  [],
  function () {
  return {
      "age_en_exact": {
          "Adult": 5, 
          "Child": 13, 
      }, 
      "age_ar_exact": {},
      "sex_ar_exact": {},
      "civilian_ar_exact": {},
      "sex_en_exact": {
          "Male": 13, 
          "Female": 27, 
      }, 
      "civilian_en_exact": {
          "Civilian": 6, 
          "Non-Civilian": 1, 
      }, 
      "nationality_ar_exact": {},
      "nationality_en_exact": {
          "Syrian": 1, 
          "Turkish": 1, 
          "Irish": 1, 
      }, 
      'occupation_en_exact': {},
      'occupation_ar_exact': {},
      'position_en_exact': {},
      'position_ar_exact': {},
      'ethnicity_en_exact': {},
      'ethnicity_ar_exact': {},
      'spoken_dialect_en': {},
      'spoken_dialect_ar': {},
      "crimes_exact": {}, 

      "incident_assigned_user_exact": {
          "admin": 2
      }, 
      "incident_labels_exact": {}, 
      "incident_crimes_exact": {}, 
      "most_recent_status_incident_exact": {}, 

      // bulletin filters
      "bulletin_assigned_user_exact": {
        "admin": 5
      }, 
      "bulletin_labels_exact": {}, 
      "most_recent_status_bulletin_exact": {}, 
      "bulletin_sources_exact": {}
  };
});
