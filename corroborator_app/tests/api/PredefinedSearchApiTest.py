from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import PredefinedSearch

class PredefinedSearchTestCase(ResourceTestCase):
    def setUp(self):
        super(PredefinedSearchTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(PredefinedSearch)
        predefinedSearchs = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        PredefinedSearch.objects.all().delete()

    def test_predefinedSearch_get(self):
        url = '/api/v1/predefinedSearch/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/predefinedSearch/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_predefinedSearch_post(self):
        post_data = {
            'user': "/api/v1/user/{0}/".format(self.user.pk),
            'name_en': "Test name",
            'search_request': "fake_query",
            'search_type': "django_ct:*bulletin",
        }
        url = '/api/v1/predefinedSearch/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_predefinedSearch_put(self):
        ps = PredefinedSearch.objects.all()[0]
        url = '/api/v1/predefinedSearch/{0}/?format=json{1}'.format(ps.id, self.auth_string)
        put_data = {
            'user': "/api/v1/user/{0}/".format(self.user.pk),
            'name_en': "Test name",
            'search_request': "fake_query",
            'search_type': "django_ct:*bulletin",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        
    def test_predefinedSearch_patch(self):
        url = '/api/v1/predefinedSearch/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'user': "/api/v1/user/{0}/".format(self.user.pk),
                    'name_en': "Test name",
                    'search_request': "fake_query",
                    'search_type': "django_ct:*bulletin",
                },
                {
                    'user': "/api/v1/user/{0}/".format(self.user.pk),
                    'name_en': "Test name",
                    'search_request': "fake_query",
                    'search_type': "django_ct:*bulletin",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
