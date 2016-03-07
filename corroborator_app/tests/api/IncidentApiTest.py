import json

from django.contrib.auth.models import User

from autofixture import AutoFixture

from tastypie.models import ApiKey
from tastypie.test import ResourceTestCase

from corroborator_app.models import (
    Incident, CrimeCategory, Location, Actor, ActorRole, Comment,
    TimeInfo, StatusUpdate, Label, VersionStatus
)
from corroborator_app.tests.test_utilities import TestUserUtility, id_from_uri


class IncidentTestCase(ResourceTestCase):
    fixtures = ['test_data_role.json', 'status_update', ]

    def setUp(self):
        super(IncidentTestCase, self).setUp()
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user

        self.location = Location(name_en='test location', loc_type='Village')
        self.location.save()

        self.actor = Actor(
            fullname_en='Test Actor',
            fullname_ar='Test name ar',
            nickname_en='nick name',
            nickname_ar='nick name')
        self.actor.save()
        self.role = ActorRole(role_status='Detained', actor_id=self.actor.pk)
        self.role.save()

        self.statusUpdate = StatusUpdate(status_en='test status')
        self.statusUpdate.save()

        self.crimeCategory = CrimeCategory(
            name_en='test crime category',
            level=1,
            description_en='test source incident_details')
        self.crimeCategory.save()
        self.label = Label(name_en='test label')
        self.label.save()

        self.comment = Comment(
            assigned_user_id=self.user.pk,
            status_id=self.statusUpdate.pk,
            comments_en='test comment')
        self.comment.save()

        fixture = AutoFixture(Incident, generate_m2m={1, 5})
        fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        User.objects.all().delete()
        Incident.objects.all().delete()
        Actor.objects.all().delete()
        ActorRole.objects.all().delete()
        Location.objects.all().delete()
        TimeInfo.objects.all().delete()
        Comment.objects.all().delete()
        StatusUpdate.objects.all().delete()
        CrimeCategory.objects.all().delete()

    def test_incident_get(self):
        url = '/api/v1/incident/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/incident/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_incident_post(self):
        post_data = {
            'title_en': "Test Incident",
            'incident_details_ar': "incident_details Arabic",
            'confidence_score': 11,
            'assigned_user': '/api/v1/user/1/',
            'incident_comments': ['/api/v1/comment/1/', ],
            'bulletins': [],
            'actors_role': [],
            'crimes': [],
            'labels': [],
            'times': [],
            'locations': [],
            'ref_incidents': [],
            'status': '/api/v1/statusUpdate/1/',
            'comment': 'Comment',
            'status_uri': '/api/v1/statusUpdate/1/'
        }
        url = '/api/v1/incident/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)
        new_incident_dict = json.loads(response.content)
        new_incident = Incident(id=new_incident_dict['id'])
        incident_comments = new_incident.incident_comments.all()
        self.assertEqual(len(incident_comments), 1)
        vs = VersionStatus.objects.filter(user_id=self.user.id).order_by('version_timestamp')
        self.assertEqual(len(vs), 1)

    def test_incident_put(self):
        i = Incident.objects.all()[0]
        url = '/api/v1/incident/{0}/?format=json{1}'.format(
            i.id, self.auth_string)

        put_data = create_put_data()
        response = self.api_client.put(url, data=put_data)
        self.check_dehydrated_data(response)
        self.assertEqual(response.status_code, 200)
        vs = VersionStatus.objects.filter(user_id=self.user.id).order_by('version_timestamp')
        self.assertEqual(len(vs), 1)


    def test_finalized_is_not_updated(self):
        precreated_incident = Incident.objects.all()[0]
        comment = Comment(
            assigned_user_id=1,
            comments_en='comment',
            status_id=5
        )
        comment.save()
        precreated_incident.incident_comments.add(comment)
        url = '/api/v1/incident/{0}/?format=json{1}'.format(
            precreated_incident.id, self.auth_string)

        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 403)

    def test_assigned_user_perm_enforced(self):
        self.test_user_util.add_user_to_group('data-analyst')
        fixture = AutoFixture(User)
        fixture.create(1)
        precreated_incident = Incident.objects.all()[0]
        precreated_incident.assigned_user = User.objects.get(id=2)
        precreated_incident.save()
        url = '/api/v1/incident/{0}/?format=json{1}'.format(
            precreated_incident.id, self.auth_string)
        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        assigned_user_id = retrieve_user_id(response)
        self.assertEqual(assigned_user_id, 2)
        self.test_user_util.add_user_to_group('chief-data-analyst')
        response = self.api_client.put(url, data=put_data)
        assigned_user_id = retrieve_user_id(response)
        self.assertEqual(assigned_user_id, 1)

    def check_dehydrated_data(self, response):
        """
        Test that returned data contains required dehydrated fields.
        New fields should be added to this method as they are added to the
        API to ensure that consistency between front and back end.
        """
        dehydrate_keys = [
            'incident_locations',
            'incident_labels',
            'incident_times',
            'incident_crimes',
            'most_recent_status_incident',
            'count_actors',
            'count_bulletins',
            'count_incidents',
            'actor_roles_status',
            'actors',
            'actors_role'
        ]
        content = json.loads(response.content)
        self.assertEqual(
            all(
                test in content for test in dehydrate_keys
            ),
            True
        )


def create_put_data(status_id=3):
    return {
        'title_en': "Test Incident",
        'title_ar': "Test Incident Arabic",
        'incident_details_en': "incident_details en",
        'incident_details_ar': "incident_details Arabic",
        'confidence_score': 11,
        'assigned_user': '/api/v1/user/1/',
        'incident_comments': ['/api/v1/comment/1/', ],
        'bulletins': [],
        'actors_role': [],
        'crimes': [],
        'labels': [],
        'times': [],
        'locations': [],
        'ref_incidents': [],
        'comment': 'Comment',
        'status_uri': '/api/v1/statusUpdate/{0}/'.format(status_id)
    }


def retrieve_user_id(response):
    return id_from_uri(
        json.loads(response.content)['assigned_user']
    )


def retrieve_last_comment_status(response):
    content = json.loads(response.content)
    len_comments = len(content['incident_comments'])
    return Comment.objects.get(
        id=id_from_uri(content['incident_comments'][len_comments - 1])
    ).status.status_en
