"""
Author: Cormac McGuire
Created: 2013-12-17
Test that the app views load correctly
"""

from django.test import TestCase, Client
from django.contrib.auth.models import User

from corroborator_app.tests.test_utilities import TestUserUtility
from corroborator_app.views.context import can_assign_users


class AppViewTestCase(TestCase):
    '''
    test that the correct js app get's loaded depending on the user's
    permissions
    '''
    fixtures = ['test_data_role.json', 'status_update', ]

    def setUp(self):
        self.client = Client()
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user

    def tearDown(self):
        User.objects.all().delete()
        pass

    def test_normal_app_redirects_for_unauthorized_users(self):
        response = self.client.get('/corroborator/')
        self.assertRedirects(
            response,
            '/accounts/login/?next=/corroborator/',
            msg_prefix='unauthorized user not redirected')

    def test_normal_app_loads_for_authorized_users(self):
        '''
        check that the normal js app loads correctly
        '''
        self.test_user_util.add_user_to_group('data-analyst')
        client = self.test_user_util.client_login()
        response = client.get('/corroborator/')
        self.assertTemplateUsed(
            response, 'new_base.html', 'base template not loaded')
        self.assertTemplateUsed(
            response, 'new_search.html', 'search template not loaded')

    def test_data_entry_users_redirected(self):
        '''
        test that the data entry users are redirected
        '''
        self.test_user_util.add_user_to_group(group_name='data-entry')
        self.client.login(username='user', password='password')
        response = self.client.get('/corroborator/')
        self.assertRedirects(
            response,
            '/data-entry/',
            msg_prefix='data-entry user not redirected')

    def test_data_entry_view_returned(self):
        '''
        test that the data entry url returns a page
        '''
        self.test_user_util.add_user_to_group(group_name='data-entry')
        self.client.login(username='user', password='password')
        response = self.client.get('/data-entry/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, 'includes/bootstrap.html', 'search template not loaded')

    def test_assigned_user_perm(self):
        '''
        check that the permission for assigned user is respected, in that
        only valid users receive the list of assigned users
        '''
        self.test_user_util.add_user_to_group(group_name='data-analyst')
        has_perm = can_assign_users(self.user)
        self.assertEqual(has_perm, False)
        self.test_user_util.add_user_to_group(group_name='chief-data-analyst')
        has_perm = can_assign_users(self.user)
        self.assertEqual(has_perm, True)
