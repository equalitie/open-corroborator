from django.contrib.auth.models import User, Group, Permission
from django.test.client import Client
from tastypie.models import ApiKey


class TestUserUtility(object):
    '''
    create a user to be used in unit tests
    '''
    username = 'user'
    password = 'password'

    def __init__(self):
        self.user = User.objects.create_user(
            self.username, 'admin@test.com', self.password)
        self.user.save()
        self.api_key = self.create_api_key()
        self.auth_string = ''

    def create_api_key(self):
        '''
        create an api key for the user
        '''
        try:
            api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            api_key = ApiKey.objects.create(user=self.user)
        return api_key

    def get_auth_string(self):
        '''
        generate the auth string for tastypie requests
        '''
        if self.auth_string is '':
            self.auth_string = '&username={0}&api_key={1}'.format(
                self.user.username,
                self.api_key.key
            )
        return self.auth_string

    def add_user_to_group(self, group_name='group_name'):
        if hasattr(group_name, '__iter__'):
            for group in group_name:
                self._add_user_to_group(group)
        else:
            self._add_user_to_group(group_name)

    def _add_user_to_group(self, group_name):
        group = self.create_corroborator_groups(group_name)
        self.user.groups.add(group)
        self.user.save()

    def client_login(self, client=Client()):
        '''
        return a logged in client using the test user, self.user
        '''
        client.login(username=self.username, password=self.password)
        return client

    def create_corroborator_groups(self, group_name):
        group = Group(name=group_name)
        group.save()
        permissions_map = {
            'data-entry': ['can_edit_assigned_entities', ],
            'data-analyst': ['can_update', 'can_edit_entities', ],
            'senior-data-analyst': [
                'can_update', 'can_update_to_reviewed', 'can_edit_entities', ],
            'chief-data-analyst': [
                'can_update',
                'can_update_to_reviewed',
                'can_update_to_finalized',
                'can_assign_users',
                'can_edit_entities',
            ],
        }
        for permission_string in permissions_map[group_name]:
            permission = Permission.objects.get(codename=permission_string)
            group.permissions.add(permission)
        return group


def id_from_uri(uri):
    '''
    get the id from an api uri in the format /api/v1/<entity>/<id>/
    '''
    return int(uri.split('/')[4])
