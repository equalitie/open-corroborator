from django.test import TestCase
#from django.test.client import Client
from django.contrib.auth.models import User

from corroborator_app.tests.test_utilities import TestUserUtility

from corroborator_app.views.view_utils import is_user_in_groups


class ViewsUtilsTestCase(TestCase):
    '''
    test the views helper functions
    '''

    def setUp(self):
        self.test_utils = TestUserUtility()
        pass

    def tearDown(self):
        User.objects.all().delete()
        pass

    def test_user_in_group(self):
        '''
        verify that user group testing works correctly
        '''
        groups = ['senior-data-analyst', 'chief-data-analyst', ]
        self.test_utils.add_user_to_group('data-analyst')
        failed = is_user_in_groups(groups, self.test_utils.user)
        self.assertEqual(failed, False)
        self.test_utils.add_user_to_group('senior-data-analyst')
        passed = is_user_in_groups(groups, self.test_utils.user)
        self.assertEqual(passed, True)
