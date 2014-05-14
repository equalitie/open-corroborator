"""
Tests for the multisave of actors
Author: Cormac McGuire
03/10/2013
"""
#import ipdb

from django.test import TestCase
from django.test.client import Client
from django.http import HttpRequest
from django.contrib.auth.models import User

from autofixture import AutoFixture

from corroborator_app.multisave import (
    multi_save_actors, extract_ids,
    update_entities, process_actor_data, create_comment
)
from corroborator_app.models import Actor, Location, ActorRole, StatusUpdate
from corroborator_app.tests.test_utilities import TestUserUtility, id_from_uri
import json

from reversion.models import Version

class MultiSaveActorTestCase(TestCase):
    '''
    test the updating of multiple actors
    '''
    fixtures = ['test_data_role.json', 'status_update', ]

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
        cleanup for tests
        '''
        Actor.objects.all().delete()
        Location.objects.all().delete()
        ActorRole.objects.all().delete()
        User.objects.all().delete()

    def test_actors_updated(self):
        '''
        broad test to verify that actors are getting updated
        '''
        client = self.test_user_util.client_login()
        post_data = create_actor_data()

        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        post_data = create_actor_data(empty_data=True)

        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        revision = Version.objects.filter(object_id=1)        
        self.assertNotEqual(revision, None)

    def test_extract_ids(self):
        '''
        test that actor ids are returned correctly
        TODO: move to common test suite
        '''
        json_dict = json.loads(create_actor_data())
        actor_ids = extract_ids(json_dict, 'selectedActors')
        self.assertEqual(actor_ids, ['1', '2', ])

    def test_actor_update_from_query_dict(self):
        '''
        test that the actor gets updated correctly from the query dict
        passed in the request
        '''
        json_dict = json.loads(create_actor_data())
        json_dict['user'] = self.user
        json_dict = process_actor_data(json_dict)
        actor_ids = extract_ids(json_dict, 'selectedActors')
        actor = Actor.objects.get(id=1)
        actor.position_en = u'position'
        actor.save()
        actor_objects = Actor.objects.filter(
            id__in=actor_ids
        )
        update_entities(json_dict, actor_objects, [])
        actor_1 = Actor.objects.get(id=1)
        actor_2 = Actor.objects.get(id=2)
        self.assertEqual(actor_1.occupation_en, 'Farmer')
        self.assertEqual(actor_1.position_en, 'position')
        self.assertEqual(actor_1.current_location.id, 1)
        self.assertEqual(actor_2.occupation_en, 'Farmer')

    def test_actor_role_update(self):
        '''
        test that actor roles are getting updated correctly
        '''
        json_dict = json.loads(create_actor_data())
        request = HttpRequest()
        request.user = self.user
        multi_save_actors(request, json_dict, self.user.username)

        actor_1 = Actor.objects.get(id=1)
        actor_2 = Actor.objects.get(id=2)
        actor_role_1 = actor_1.actors_role.all()[0]
        self.assertEqual(actor_role_1.role_status, 'T')
        self.assertEqual(len(actor_2.actors_role.all()), 1)

    def test_version_update(self):
        '''
        test that the version get's updated for all actors
        and fails if not present
        '''
        client = self.test_user_util.client_login()
        post_data = create_actor_data(version_info=False)
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 403)
        post_data = create_actor_data()
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_content_returned(self):
        '''
        test that we are returning the correct content
        '''
        client = Client()
        client.login(username='user', password='password')
        post_data = create_actor_data()
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        response_data = json.loads(response.content)
        #actor = Actor.objects.get(id=1)
        self.assertEqual(response_data[0]['occupation_en'], u'Farmer')
        self.assertEqual(
            response_data[0]['most_recent_status_actor'],
            u'/api/v1/statusUpdate/3/')
        self.assertEqual(response.status_code, 200)

    def test_actors_status_update_analyst(self):
        '''
        test that status gets set to updated no matter what id is sent
        '''
        client = self.test_user_util.client_login()
        post_data = create_actor_data(
            empty_data=False,
            version_info=True,
            status_id=1
        )
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(get_status_from_response(response), 'Updated')
        post_data = create_actor_data(
            empty_data=False,
            version_info=True,
            status_id=4
        )
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(get_status_from_response(response), 'Updated')

    def test_actors_status_update_senior(self):
        '''
        test that reviewed status can be added by senior
        '''
        self.test_user_util.add_user_to_group('senior-data-analyst')
        client = self.test_user_util.client_login()
        post_data = create_actor_data(
            empty_data=False,
            version_info=True,
            status_id=4
        )
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(get_status_from_response(response), 'Reviewed')

    def test_actors_status_update_chief(self):
        '''
        test that finalized status can be added by chief
        '''
        self.test_user_util.add_user_to_group('chief-data-analyst')
        client = self.test_user_util.client_login()
        post_data = create_actor_data(
            empty_data=False,
            version_info=True,
            status_id=5
        )
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(get_status_from_response(response), 'Finalized')

    def test_finalized_entities_are_not_updated(self):
        '''
        finalized entities should not be updated
        '''
        user = User.objects.get(id=1)
        finalized_actor = Actor.objects.get(id=1)
        finalized_actor.actor_comments.add(
            create_comment('A finalizing comment', 5, user)
        )
        client = self.test_user_util.client_login()
        post_data = create_actor_data(
            empty_data=False,
            version_info=True,
            status_id=3
        )
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        finalized_actor_comments = Actor.objects.get(id=1).actor_comments.all()

        self.assertEqual(len(finalized_actor_comments), 1)


def get_status_from_response(response):
    status_id = id_from_uri(
        get_key_from_response(response, 'most_recent_status_actor'))
    return StatusUpdate.objects.get(id=status_id).status_en


def get_key_from_response(response, key):
    '''
    extract the status from the response array
    '''
    response_dict = json.loads(response.content)[0]
    return response_dict[key]


def create_actor_data(empty_data=False, version_info=True, status_id=3):
    location_id = Location.objects.all()[0].id
    '''
    test data for the actor
    '''
    actor_data = {
        "selectedActors": ["/api/v1/actor/1/", "/api/v1/actor/2/"],
        "sex_en": "Male",
        "age_en": "",
        "civilian_en": "",
        "current_location": "/api/v1/location/" + str(location_id) + "/",
        "occupation_en": "Farmer",
        "occupation_ar": "",
        "position_en": "",
        "position_ar": "",
        "ethnicity_en": "",
        "ethnicity_ar": "",
        "nationality_en": "",
        "nationality_ar": "",
        "religion_en": "",
        "religion_ar": "",
        "spoken_dialect_en": "",
        "spoken_dialect_ar": "",
        "actors_role": ["/api/v1/actorRole/1/"],
        "sex_ar": "",
        "age_ar": "",
        "civilian_ar": "",
        "username": "admin",
    }
    if version_info:
        actor_data.update({
            "status_uri": "/api/v1/status/{0}/".format(status_id),
            "comment": "comment"
        })
    else:
        actor_data.update({
            "status_uri": "",
            "comment": ""
        })

    if empty_data is True:
        actor_data.pop('actors_role')
        actor_data['current_location'] = ""

    return json.dumps(actor_data)
