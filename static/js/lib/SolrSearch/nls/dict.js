define({
  'root': {
    'sort': {
      'date': 'date',
      'location': 'location',
      'title': 'title',
      'status': 'status',
      'score': 'score',
      'confirm_delete_header': 'Delete Selected Items?',
      'confirm_delete_message': 'These items will be deleted. Are you Sure?',
      'confirm': 'confirm',
      'cancel': 'cancel'
    },
    'count': {
      'selected': 'selected'
    },
    'header': {
      'actions': 'Actions',
      'actor': {
        'single': '<em>1 actor</em> selected',
        'plural': '<em><%=num %> </span>actors</em> selected',
      },
      'incident': {
        'single': '<em>1 incident</em> selected',
        'plural': '<em><%=num %> incidents</em> selected',
      },
      'bulletin': {
        'single': '<em>1 bulletin</em> selected',
        'plural': '<em><%=num %> bulletins</em> selected',
      },
    },
    'filters': {
      'new_actor': 'New Actor',
      'new_bulletin': 'New Bulletin',
      'new_incident': 'New Incident',
      'and': 'and',
      'current_filters': 'Current Filters',
      'Enter_text_here_to_see_available_filters': 'Enter text here to see available filters',
      'num_results': '<%=numItems %> results.',
      'bulletin_labels_exact':'Bulletin Labels',
      'bulletin_assigned_user_exact':'Assigned user',
      'bulletin_sources_exact':'Sources',
      'bulletin_created_exact':'Created date',
      'most_recent_status_bulletin_exact':'Status',
      'bulletin_searchable_locations_exact':'Bulletin Location',
      'bulletin_created_between': 'Bulletin created between',
      //Incident fields
      'confidence_score_exact':'Confidence Score',
      'incident_times_exact':'Incident date/time',
      'incident_labels_exact':'Incident Label', 
      'incident_assigned_user_exact':'Assigned user',
      'incident_crimes_exact':'Crimes',
      'incident_created_exact':'Created date',
      'most_recent_status_incident_exact':'Status',
      'incident_searchable_locations_exact':'Incident Location',
      'incident_created_between': 'Incident created between',
      //Actor fields
      'age_exact':'Age',
      'sex_exact':'Sex',
      'civilian_exact':'Civilian',
      'religion_en_exact':'Religion(en)',
      'religion_ar_exact':'Religion(ar)',
      'nationality_en_exact':'Nationality(en)',
      'nationality_ar_exact':'Nationality(ar)',
      'occupation_en_exact':'Occupation(en)',
      'occupation_ar_exact':'Occupation(ar)',
      'position_en_exact':'Position(en)',
      'position_ar_exact':'Position(ar)',
      'ethnicity_en_exact':'Ethnicity(en)',
      'ethnicity_ar_exact':'Ethnicity(ar)',
      'spoken_dialect_en':'Dialect(en)',
      'spoken_dialect_ar':'Dialect(ar)',
      'actor_searchable_pob_exact':'Place Of birth',
      'actor_searchable_current_exact':'Current Location',
      'date_of_birth_between': 'Date of birth between'
    },
    'results': {
      'num_actors': {
        'single': '<%=num %> actor involved',
        'plural': '<%=num %> actors involved',
      },
      'involved_in':{
        'single': 'involved in <%=num %> incident',
        'plural': 'involved in <%=num %> incidents'
      },
      'aka': 'aka',
      'lives_in': 'lives in',
      'works_as_a': 'works as a',
      //'involved_in': 'involved in',
      'involved': 'involved',
      'no_results': 'No Results',
      'in': 'in'
    },
    'menu': {
      'Delete_selected': 'Delete selected',
      'Update_selected': 'Update selected',
      'Select_all': 'Select all',
      'Clear_selected': 'Clear selected',
    },
    'dialog': {
      'Save_search_as': 'Save search as',
      'Save_search': 'Save search',
      'Cancel': 'Cancel',
      'Search_title': 'Search title',
      'Share_search_with_other_users': 'Share search with other users',
      'Search_saved': 'Search saved',
      'Saving_search': 'Saving search',
      'Error_saving_search': 'Error saving search',
      'Length_error': 'Length of saved search name must be between <%=min %> and <%=max %> characters.'
    }
  },
  'ar': true
});
