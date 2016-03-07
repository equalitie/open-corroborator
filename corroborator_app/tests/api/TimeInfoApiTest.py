from tastypie.models import ApiKey
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import TimeInfo
import datetime
from django.utils import timezone


class TimeInfoTestCase(ResourceTestCase):
    def setUp(self):
        super(TimeInfoTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(TimeInfo)
        fixture.create(10)
        now = timezone.now()
        self.from_datetime = now.isoformat()
        self.to_datetime = now.isoformat()
        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        TimeInfo.objects.all().delete()

    def test_timeInfo_get(self):
        url = '/api/v1/timeInfo/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/timeInfo/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_timeInfo_post(self):
        post_data = {
            'time_from': self.from_datetime,
            'time_to': self.to_datetime,
            'confidence_score': 79,
            'event_name_en': "Event",
        }
        print post_data
        url = '/api/v1/timeInfo/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_timeInfo_put(self):
        ti = TimeInfo.objects.all()[0]
        url = '/api/v1/timeInfo/{0}/?format=json{1}'.format(
            ti.id, self.auth_string)
        put_data = {
            'time_from': self.from_datetime,
            'time_to': self.to_datetime,
            'confidence_score': 79,
            'event_name_en': "Event",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 200)

    def test_timeInfo_patch(self):
        url = '/api/v1/timeInfo/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'time_from': self.from_datetime,
                    'time_to': self.to_datetime,
                    'confidence_score': 79,
                    'event_name_en': "Event",
                },
                {
                    'time_from': self.from_datetime,
                    'time_to': self.to_datetime,
                    'confidence_score': 79,
                    'event_name_en': "Event",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
