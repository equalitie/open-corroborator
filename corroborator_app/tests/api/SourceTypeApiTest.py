from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import SourceType

class SourceTypeTestCase(ResourceTestCase):
    def setUp(self):
        super(SourceTypeTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(SourceType)
        sourceTypes = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        SourceType.objects.all().delete()

    def test_sourceType_get(self):
        url = '/api/v1/sourceType/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/sourceType/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_sourceType_post(self):
        post_data = {
            'source_type': "Test SourceType",
            'description': "Test SourceType Arabic",
        }
        url = '/api/v1/sourceType/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_sourceType_put(self):
        st = SourceType.objects.all()[0]
        url = '/api/v1/sourceType/{0}/?format=json{1}'.format(st.id, self.auth_string)
        put_data = {
            'source_type': "Test SourceType",
            'description': "Test SourceType Arabic",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 200)
        
    def test_sourceType_patch(self):
        url = '/api/v1/sourceType/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'source_type': "Test SourceType",
                    'description': "Test SourceType Arabic",
                },
                {
                    'source_type': "Test SourceType",
                    'description': "Test SourceType Arabic",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
