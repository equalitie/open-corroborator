"""
Author: Cormac McGuire
Created: 09/10/2013
Test the multisave incident functionality
End to end tests for incidents, more detailed testing in MultiSaveActorTestCase
"""

import json

from django.test import TestCase
from django.contrib.auth.models import User

from autofixture import AutoFixture

from corroborator_app.multisave import create_comment

from corroborator_app.tests.test_utilities import TestUserUtility
from corroborator_app.models import Incident, Location, ActorRole

from reversion.models import Version

class MultiSaveIncidentTestCase(TestCase):
    '''
    verify that multiple incident updates are happening correctly
    '''
    fixtures = [
        'test_data_role', 'status_update', 'bulletin', 'incident', ]
    api_url = '/corroborator/incident/0/multisave/'

    def setUp(self):
        '''
        initialisation for tests
        '''
        location_fixture = AutoFixture(Location)
        location_fixture.create(1)
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user

    def tearDown(self):
        '''
        initialisation for tests
        '''
        Incident.objects.all().delete()
        Location.objects.all().delete()
        ActorRole.objects.all().delete()

    def test_incidents_updated(self):
        '''
        basic test to ensure that end to end functionality is in place
        '''
        client = self.test_user_util.client_login()
        post_data = create_incident_data()
        response = client.post(
            self.api_url,
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        incident_1 = Incident.objects.get(pk=1)
        incident_2 = Incident.objects.get(pk=2)
        self.assertEqual(len(incident_1.actors_role.all()), 1)
        self.assertEqual(len(incident_1.ref_bulletins.all()), 2)
        self.assertEqual(len(incident_1.ref_incidents.all()), 1)
        self.assertEqual(len(incident_2.actors_role.all()), 2)
        response_data = json.loads(response.content)
        self.assertEqual(
            response_data[0]['most_recent_status_incident'],
            u'/api/v1/statusUpdate/3/')
        revision = Version.objects.filter(object_id=1)        
        self.assertNotEqual(revision, None)


    def test_incidents_updated_with_empty_relations(self):
        client = self.test_user_util.client_login()
        post_data = create_incident_data(empty_data=True)
        response = client.post(
            self.api_url,
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_statusless_update_fails(self):
        client = self.test_user_util.client_login()
        post_data = create_incident_data(version_info=False)
        response = client.post(
            self.api_url,
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 403)

    def test_finalized_entities_are_not_updated(self):
        '''
        finalized entities should not be updated
        '''
        user = User.objects.get(id=1)
        finalized_incident = Incident.objects.get(id=1)
        finalized_incident.incident_comments.add(
            create_comment('A finalizing comment', 5, user)
        )
        client = self.test_user_util.client_login()
        post_data = create_incident_data(
            empty_data=False,
            version_info=True
        )
        response = client.post(
            '/corroborator/incident/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        finalized_incident_comments =\
            Incident.objects.get(id=1).incident_comments.all()

        self.assertEqual(len(finalized_incident_comments), 1)


def create_incident_data(empty_data=False, version_info=True):
    '''
    test data for incident creation
    '''
    incident_data = {
        "actors": [],
        "actorsRoles": [],
        "assigned_user": "/api/v1/user/1/",
        "crimes": [],
        "incidents": [
            "/api/v1/incident/1/",
            "/api/v1/incident/2/",
        ],
        "actors_role": [
            "/api/v1/actorRole/1/",
        ],
        "labels": [],
        "locations": [],
        "ref_bulletins": ["/api/v1/bulletin/2/"],
        "ref_incidents": ["/api/v1/incident/2/"],
        "username": "cormac",
        "comment": "comment",
        "status_uri": "/api/v1/status/3/",
    }
    if empty_data is True:
        incident_data['ref_incidents'] = []
        incident_data['relatedActors'] = []

    if version_info is False:
        incident_data['status_uri'] = ""
        incident_data['comment'] = ""

    return json.dumps(incident_data)
