from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import StatusUpdate

class statusUpdateTestCase(ResourceTestCase):
    def setUp(self):
        super(statusUpdateTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(StatusUpdate)
        statusUpdates = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        StatusUpdate.objects.all().delete()

    def test_statusUpdate_get(self):
        url = '/api/v1/statusUpdate/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/statusUpdate/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_statusUpdate_post(self):
        post_data = {
            'status_en': "Test statusUpdate",
            'status_ar': "Test statusUpdate Arabic",
            'description_en': "description en",
            'description_ar': "description Arabic",
        }
        url = '/api/v1/statusUpdate/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_statusUpdate_put(self):
        su = StatusUpdate.objects.all()[0]
        url = '/api/v1/statusUpdate/{0}/?format=json{1}'.format(su.id, self.auth_string)
        put_data = {
            'status_en': "Test statusUpdate",
            'status_ar': "Test statusUpdate Arabic",
            'description_en': "description en",
            'description_ar': "description Arabic",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 200)
        
    def test_statusUpdate_patch(self):
        url = '/api/v1/statusUpdate/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'status_en': "Test statusUpdate",
                    'status_ar': "Test statusUpdate Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                },
                {
                    'status_en': "Test statusUpdate",
                    'status_ar': "Test statusUpdate Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
