define(
  [],
  function () {
  'use strict';


  var actors = [
    { 
      "_version_": 1446977498689568800, 
        "actor_roles_status": [
            "P", 
            "S"
        ], 
        "actors": [
            "/api/v1/actor/2/", 
            "/api/v1/actor/1/"
        ], 
        "actors_role": [
            "/api/v1/actorRole/1/", 
            "/api/v1/actorRole/2/"
        ]
    }
  ];
  var incidents = [
    { 
      "_version_": 1446977498689568800, 
        "actor_roles_status": [
            "K", 
            "KN"
        ], 
        "actors": [
            "/api/v1/actor/2/", 
            "/api/v1/actor/1/"
        ], 
        "actors_role": [
            "/api/v1/actorRole/1/", 
            "/api/v1/actorRole/2/"
        ], 
        "assigned_user": "/api/v1/user/2/", 
        "confidence_score": 50, 
        "confidence_score_exact": 50, 
        "count_actors": 2, 
        "count_bulletins": 1, 
        "count_incidents": 5, 
        "crimes": [
            "/api/v1/crimeCategory/1/"
        ], 
        "django_ct": "corroborator_app.incident", 
        "django_id": "1", 
        "entityType": "incident", 
        "id": "1", 
        "incident_assigned_user": "cormac", 
        "incident_assigned_user_exact": "cormac", 
        "incident_comments": [
            "/api/v1/comment/2/", 
            "/api/v1/comment/6/"
        ], 
        "incident_created": "2013-08-09T12:23:58Z", 
        "incident_created_exact": "2013-08-09T12:23:58Z", 
        "incident_crimes": [
            "Human Rights Violations"
        ], 
        "incident_crimes_exact": [
            "Human Rights Violations"
        ], 
        "incident_labels": [
            "Graphic", 
            "Needs attention", 
            "Machine created"
        ], 
        "incident_labels_exact": [
            "Graphic", 
            "Needs attention", 
            "Machine created"
        ], 
        "incident_locations": [
            "Rif Dimashq, Markaz Rif Dimashq", 
            "Tartus", 
            "Quneitra"
        ], 
        "incident_times": [
            "2013-08-08T14:20:00+00:00Z"
        ], 
        "incident_times_exact": [
            "2013-08-08T14:20:00+00:00Z"
        ], 
        "labels": [
            "/api/v1/label/1/", 
            "/api/v1/label/3/", 
            "/api/v1/label/6/"
        ], 
        "locations": [
            "/api/v1/location/64/", 
            "/api/v1/location/73/", 
            "/api/v1/location/75/"
        ], 
        "most_recent_status_incident": "Machine Created", 
        "most_recent_status_incident_exact": "Machine Created", 
        "ref_bulletins": [
            "/api/v1/bulletin/2/"
        ], 
        "ref_incidents": [
            "/api/v1/incident/2/", 
            "/api/v1/incident/3/", 
            "/api/v1/incident/4/", 
            "/api/v1/incident/6/", 
            "/api/v1/incident/12/"
        ], 
        "resource_uri": "/api/v1/incident/1/", 
        "text": " a new incident  test test test test changed by unauthorized user", 
        "times": [
            "/api/v1/timeInfo/1/"
        ], 
        "title_ar": "", 
        "title_en": " a new incident test changed by unauthorized user"
    },
    {
        "_version_": 1446977498691666000, 
        "actor_roles_status": [
            "Kidnapped", 
            "Detained"
        ], 
        "actors": [
            "/api/v1/actor/74/", 
            "/api/v1/actor/54/"
        ], 
        "actors_role": [
            "/api/v1/actorRole/240/", 
            "/api/v1/actorRole/244/"
        ], 
        "assigned_user": null, 
        "comment": "removed extra actors", 
        "confidence_score": 70, 
        "confidence_score_exact": 70, 
        "count_actors": 2, 
        "count_bulletins": 1, 
        "count_incidents": 1, 
        "crimes": [
            "/api/v1/crimeCategory/1/", 
            "/api/v1/crimeCategory/8/"
        ], 
        "deleted": false, 
        "django_ct": "corroborator_app.incident", 
        "django_id": "2", 
        "entityType": "incident", 
        "id": "2", 
        "incident_assigned_user": "unassigned", 
        "incident_assigned_user_exact": "unassigned", 
        "incident_comments": [
            "/api/v1/comment/3/", 
            "/api/v1/comment/7/"
        ], 
        "incident_created": "2013-08-09T12:46:54", 
        "incident_created_exact": "2013-08-09T17:46:54Z", 
        "incident_crimes": [
            "Human Rights Violations", 
            "Killing members of the group"
        ], 
        "incident_crimes_exact": [
            "Human Rights Violations", 
            "Killing members of the group"
        ], 
        "incident_details_ar": "", 
        "incident_details_en": "", 
        "incident_labels": [
            "Graphic", 
            "Fake", 
            "Needs attention", 
            "Machine created"
        ], 
        "incident_labels_exact": [
            "Graphic", 
            "Fake", 
            "Needs attention", 
            "Machine created"
        ], 
        "incident_locations": [
            "Rif Dimashq, Markaz Rif Dimashq", 
            "Quneitra"
        ], 
        "incident_times": [], 
        "labels": [
            "/api/v1/label/1/", 
            "/api/v1/label/2/", 
            "/api/v1/label/3/", 
            "/api/v1/label/6/"
        ], 
        "locations": [
            "/api/v1/location/64/", 
            "/api/v1/location/75/"
        ], 
        "most_recent_status_incident": "Updated", 
        "most_recent_status_incident_exact": "Updated", 
        "pk": "2", 
        "ref_bulletins": [
            "/api/v1/bulletin/2/"
        ], 
        "ref_incidents": [
            "/api/v1/incident/1/"
        ], 
        "resource_uri": "/api/v1/incident/2/", 
        "status": "/api/v1/statusUpdate/3/", 
        "text": "a new incident", 
        "times": [], 
        "title_ar": "",
        "title_en": "a new incident", 
        "username": "cormac"
    }
  ];

  return {
    actors: actors,
    incidents: incidents
  };
  
});

