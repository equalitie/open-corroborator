from django.test import TestCase
from django.test.client import Client
from corroborator_app.tests.test_utilities import TestUserUtility
from corroborator_app.models import StatusUpdate


class StatusUpdateModelTestCase(TestCase):
    '''
    Test the Manager of the Status Update model
    '''
    fixtures = ['status_update', ]

    def setUp(self):
        self.test_utility = TestUserUtility()
        self.user = self.test_utility.user

    def tearDown(self):
        pass

    def test_correct_statuses_returned(self):
        '''
        check that the right statuses are returned depending on a user's group
        '''
        self.test_utility.add_user_to_group('data-analyst')
        statuses =\
            StatusUpdate.filter_by_perm_objects.available_statuses(self.user)
        self.assertIs(len(statuses), 2)
        self.test_utility.add_user_to_group('senior-data-analyst')
        statuses =\
            StatusUpdate.filter_by_perm_objects.available_statuses(self.user)
        self.assertIs(len(statuses), 3)
        self.test_utility.add_user_to_group('chief-data-analyst')
        statuses =\
            StatusUpdate.filter_by_perm_objects.available_statuses(self.user)
        self.assertIs(len(statuses), 4)
