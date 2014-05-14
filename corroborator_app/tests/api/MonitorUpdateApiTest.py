from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import MonitorUpdate


class MonitorUpdateTestCase(ResourceTestCase):
    def setUp(self):
        super(MonitorUpdateTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(MonitorUpdate)
        fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        MonitorUpdate.objects.all().delete()

    def test_source_get(self):
        url = '/api/v1/monitorUpdate/1/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/source/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)
