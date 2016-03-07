from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Location

class LocationTestCase(ResourceTestCase):
    def setUp(self):
        super(LocationTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(Location)
        locations = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Location.objects.all().delete()

    def test_location_get(self):
        url = '/api/v1/location/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/location/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_location_post(self):
        post_data = {
            'name_en': "Test Location",
            'name_ar': "Test Location Arabic",
            'description_en': "description en",
            'description_ar': "description Arabic",
            'loc_type': "City",
        }
        url = '/api/v1/location/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_location_put(self):
        loc = Location.objects.all()[0]
        url = '/api/v1/location/{0}/?format=json{1}'.format(loc.id, self.auth_string)
        put_data = {
            'name_en': "Test Location",
            'name_ar': "Test Location Arabic",
            'description_en': "description en",
            'description_ar': "description Arabic",
            'loc_type': "City",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 200)
        
    def test_location_patch(self):
        url = '/api/v1/location/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'name_en': "Test Location",
                    'name_ar': "Test Location Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                    'loc_type': "City",
                },
                {
                    'name_en': "Test Location",
                    'name_ar': "Test Location Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                    'loc_type': "City",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
