from tastypie.models import ApiKey
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Bulletin, Media, Location, \
    Actor, ActorRole, Comment, TimeInfo, StatusUpdate, Label, \
    Source, VersionStatus, SourceType
import json
from corroborator_app.tests.test_utilities import TestUserUtility, id_from_uri
#from django.utils.timezone import utc


class BulletinTestCase(ResourceTestCase):

    fixtures = ['status_update', ]

    def setUp(self):
        super(BulletinTestCase, self).setUp()
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user
        self.location = Location(name_en='test location', loc_type='Village')
        self.location.save()
        self.actor = Actor(
            fullname_en='Test Actor',
            fullname_ar='Test name ar',
            nickname_en='nick name',
            nickname_ar='nick name'
        )
        self.actor.save()
        self.role = ActorRole(role_status='Detained', actor_id=self.actor.pk)
        self.role.save()

        self.sourceType = SourceType(
            source_type='test source type',
            description='test source description'
        )

        self.sourceType.save()
        self.source = Source(
            reliability_score=0,
            name_en='test source',
            source_type_id=self.sourceType.pk
        )

        self.source.save()
        self.source = Source(
            reliability_score=0,
            name_en='test source 2',
            source_type_id=self.sourceType.pk
        )

        self.source.save()
        self.label = Label(name_en='test label')
        self.label.save()
        self.comment = Comment(
            assigned_user_id=self.user.pk,
            status_id=3,
            comments_en='test comment'
        )
        self.comment.save()

        self.media = Media(
            media_type='Video',
            name_en='test media',
            media_file=''
        )
        self.media.save()

        fixture = AutoFixture(Bulletin, generate_m2m={1, 5})
        fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        User.objects.all().delete()
        Actor.objects.all().delete()
        ActorRole.objects.all().delete()
        Location.objects.all().delete()
        TimeInfo.objects.all().delete()
        Media.objects.all().delete()
        Comment.objects.all().delete()
        StatusUpdate.objects.all().delete()
        Bulletin.objects.all().delete()

    def test_bulletin_get(self):
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/bulletin/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_bulletin_post(self):
        post_data = {
            'title_en': "Test Bulletin",
            'description_ar': "description Arabic",
            'confidence_score': 73,
            'sources': ['/api/v1/source/1/', ],
            'bulletin_imported_comments': ['/api/v1/comment/1/', ],
            'assigned_user': '/api/v1/user/1/',
            'actors_role': [],
            'times': [],
            'medias': [],
            'locations': [],
            'labels': [],
            'ref_bulletins': [],
            'comment': 'new bulletin',
        }
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)
        new_bulletin_dict = json.loads(response.content)
        new_bulletin = Bulletin(id=new_bulletin_dict['id'])
        bulletin_comments = new_bulletin.bulletin_comments.all()
        self.assertEqual(len(bulletin_comments), 1)
        vs = VersionStatus.objects.filter(
            user_id=self.user.id).order_by('version_timestamp')
        self.assertEqual(len(vs), 1)

    def test_bulletin_put(self):
        self.test_user_util.add_user_to_group('data-analyst')
        b = Bulletin.objects.all()[1]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = create_put_data(5)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.check_dehydrated_data(response)
        self.assertEqual(retrieve_last_comment_status(response), 'Updated')
        vs = VersionStatus.objects.filter(
            user_id=self.user.id).order_by('version_timestamp')
        self.assertEqual(len(vs), 1)

    def test_data_entry_put(self):
        self.test_user_util.add_user_to_group('data-entry')
        b = Bulletin.objects.all()[0]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = create_put_data(3)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Updated')
        b.assigned_user = None
        b.save()
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 403)

    def test_senior_data_analyst_put(self):
        self.test_user_util.add_user_to_group('senior-data-analyst')
        b = Bulletin.objects.all()[0]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Reviewed')

    def test_chief_data_analyst_put(self):
        self.test_user_util.add_user_to_group('chief-data-analyst')
        b = Bulletin.objects.all()[0]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = create_put_data(5)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Finalized')

    def test_finalized_is_not_updated(self):
        precreated_bulletin = Bulletin.objects.all()[0]
        comment = Comment(
            assigned_user_id=1,
            comments_en='comment',
            status_id=5
        )
        comment.save()
        precreated_bulletin.bulletin_comments.add(comment)
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            precreated_bulletin.id, self.auth_string)

        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 403)

    def test_assigned_user_perm_enforced(self):
        self.test_user_util.add_user_to_group('data-analyst')
        fixture = AutoFixture(User)
        fixture.create(1)
        precreated_bulletin = Bulletin.objects.all()[0]
        precreated_bulletin.assigned_user = User.objects.get(id=2)
        precreated_bulletin.save()
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            precreated_bulletin.id, self.auth_string)
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
            'bulletin_comments',
            'bulletin_imported_comments',
            'bulletin_locations',
            'bulletin_labels',
            'bulletin_times',
            'bulletin_sources',
            'most_recent_status_bulletin',
            'count_actors',
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


def create_put_data(status_id, bulletin_comments=[]):
    return {
        "_version_": 1459109771449729000,
        "title_ar": "",
        "title_en": "IRX.A0001.566.001",
        "actor_roles_status": [],
        "actors": [],
        "description_ar": "",
        "description_en": "",
        "confidence_score": 44,
        "sources": [],
        "bulletin_comments": [],
        "assigned_user": "/api/v1/user/1/",
        "actors_role": [],
        "times": [],
        "medias": [],
        "locations": [],
        "ref_bulletins": [],
        "labels": [],
        "comment": "comment",
        "status_uri": "/api/v1/statusUpdate/" + str(status_id) + "/",
        # above is what actually gets saved, below is mostly solr
        "bulletin_assigned_user": "admin",
        "bulletin_assigned_user_exact": "admin",
        "bulletin_confidence_bucket": "40-49",
        "bulletin_confidence_bucket_exact": "40-49",
        "bulletin_created": "2013-10-15T01:40:22",
        "bulletin_created_date": "2013-10-15T00:00:00Z",
        "bulletin_created_date_exact": "2013-10-15T00:00:00Z",
        "bulletin_created_exact": "2013-10-15T00:40:22Z",
        "bulletin_imported_comments": [],
        "bulletin_labels": [],
        "bulletin_locations": [],
        # this was causing problems in saving bulletins, should be a datetime
        #"bulletin_modified": True,
        "bulletin_sources": [],
        "bulletin_times": [],
        "bulletin_type": "Video",
        "bulletin_type_exact": "Video",
        "confidence_score_exact": 44,
        "count_actors": 0,
        "deleted": False,
        "django_ct": "corroborator_app.bulletin",
        "django_id": "1",
        "entityType": "bulletin",
        "id": 1,
        "most_recent_status_bulletin": "",
        "origin_id": None,
        "ref_bulletins": [],
        "ref_incidents": [],
        "resource_uri": "/api/v1/bulletin/12/",
        "seq_order": None,
        "sources_count": 0,
        "sources_count_exact": 0,
        "status": "",
        "text": ":40 a.m.\n\n\n\n\n\n\n\n\n\n",
        "type": "Video",
        "uri": None,
        "username": "admin"
    }


def retrieve_user_id(response):
    return id_from_uri(
        json.loads(response.content)['assigned_user']
    )


def retrieve_last_comment_status(response):
    content = json.loads(response.content)
    len_comments = len(content['bulletin_comments'])
    return Comment.objects.get(
        id=id_from_uri(content['bulletin_comments'][len_comments - 1])
    ).status.status_en
