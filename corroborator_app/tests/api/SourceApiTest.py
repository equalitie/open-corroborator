from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Source, SourceType

class SourceTestCase(ResourceTestCase):
    def setUp(self):
        super(SourceTestCase, self).setUp()
        self.sourceType = SourceType(
            source_type="test type",
            description="test description"
        )
        self.sourceType.save()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(Source)
        sources = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Source.objects.all().delete()
        SourceType.objects.all().delete()

    def test_source_get(self):
        url = '/api/v1/source/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/source/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_source_post(self):
        post_data = {
            'name_en': "Test Source",
            'name_ar': "Test Source Arabic",
            'comments_en': "comments en",
            'comments_ar': "comments Arabic",
            'reliability_score': 1,
            'source_type': "/api/vi/sourceType/{0}/".format(self.sourceType.pk),
        }
        url = '/api/v1/source/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_source_put(self):
        source = Source.objects.all()[0]
        url = '/api/v1/source/{0}/?format=json{1}'.format(source.id, self.auth_string)
        put_data = {
            'name_en': "Test Source",
            'name_ar': "Test Source Arabic",
            'comments_en': "comments en",
            'comments_ar': "comments Arabic",
            'reliability_score': 1,
            'source_type': "/api/vi/sourceType/{0}/".format(self.sourceType.pk),
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        
    def test_source_patch(self):
        url = '/api/v1/source/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'name_en': "Test Source",
                    'name_ar': "Test Source Arabic",
                    'comments_en': "comments en",
                    'comments_ar': "comments Arabic",
                    'reliability_score': 1,
                    'source_type': "/api/vi/sourceType/{0}/".format(self.sourceType.pk),
                },
                {
                    'name_en': "Test Source",
                    'name_ar': "Test Source Arabic",
                    'comments_en': "comments en",
                    'comments_ar': "comments Arabic",
                    'reliability_score': 1,
                    'source_type': "/api/vi/sourceType/{0}/".format(self.sourceType.pk),
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
