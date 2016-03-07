from tastypie.models import ApiKey
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import ActorRole, Actor


class ActorRoleTestCase(ResourceTestCase):
    def setUp(self):
        super(ActorRoleTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        self.actor = Actor(
            fullname_en='Test Actor',
            fullname_ar='Test name ar',
            nickname_en='nick name',
            nickname_ar='nick name'
        )
        self.actor.save()

        fixture = AutoFixture(ActorRole, generate_m2m={1, 4})
        fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Actor.objects.all().delete()
        ActorRole.objects.all().delete()

    def test_actorRole_get(self):
        url = '/api/v1/actorRole/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/actorRole/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_actorRole_post(self):
        post_data = {
            'role_status': "K",
            'actor': "/api/v1/actor/{0}/".format(self.actor.pk)
        }
        url = '/api/v1/actorRole/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_actorRole_put(self):
        precreated_actor_role = ActorRole.objects.all()[0]
        url = '/api/v1/actorRole/{0}/?format=json{1}'.format(
            precreated_actor_role.id, self.auth_string)
        put_data = {
            'role_status': "K",
            'actor': "/api/v1/actor/{0}/".format(self.actor.pk),
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 200)

    def test_actorRole_patch(self):
        url = '/api/v1/actorRole/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'role_status': "K",
                    'actor': "/api/v1/actor/{0}/".format(self.actor.pk)
                },
                {
                    'role_status': "K",
                    'actor': "/api/v1/actor/{0}/".format(self.actor.pk)
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)

    def test_actorRole_validation(self):
        post_data = {
            'role_status': "Invalid key code",
            'actor': "/api/v1/actor/{0}/".format(self.actor.pk)
        }
        url = '/api/v1/actorRole/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 400)
