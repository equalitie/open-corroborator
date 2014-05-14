import json
from django.test import TestCase
from django.contrib.auth.models import User
from corroborator_app.tests.test_utilities import TestUserUtility
from corroborator_app.reporting.user_reporting import UserReportingApi
from corroborator_app.models import (
    UserLog,
    VersionStatus,
    Bulletin,
    Incident,
    Comment,
    Actor,
    StatusUpdate,
)
from autofixture import AutoFixture

from corroborator_app.tests.user_log_utilities import(
    generate_start_end_times,
    average_updates_value,
    create_version_status_entries_for_user,
    crud_items_by_date,
)


class ReportingTestCase(TestCase):
    '''
    Test the reporting view and it's supporting json ajax views
    '''
    fixtures = ['status_update', ]

    def setUp(self):
        self.test_util = TestUserUtility()
        fixture = AutoFixture(VersionStatus, generate_fk=True)
        fixture.create(10)
        # we'll need to create the UserLog objects manually to ensure a valid
        # login and logout datetime
        # see line 110
        #fixture = AutoFixture(UserLog, generate_fk=True)
        #fixture.create(10)
        fixture = AutoFixture(User)
        fixture.create(1)
        fixture = AutoFixture(Bulletin)
        fixture.create(1)
        fixture = AutoFixture(Incident)
        fixture.create(1)
        fixture = AutoFixture(Actor)
        fixture.create(1)

    def tearDown(self):
        User.objects.all().delete()
        UserLog.objects.all().delete()

    def test_reporting_page_loads(self):
        '''
        does the reporting view displays correctly
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        client = self.test_util.client_login()
        response = client.get('/corroborator/reporting/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reporting.html')

    def test_unauthorized_access_prevented(self):
        '''
        ensure unauthorized groups return a 404
        '''
        self.test_util.add_user_to_group([
            'data-entry',
            'data-analyst'
        ])
        client = self.test_util.client_login()
        response = client.get('/corroborator/reporting/')
        self.assertEqual(response.status_code, 404)

    #####################################################################
    # DRYing up the tests
    #####################################################################
    def test_graphs_respond(self):
        '''
        check the graph views respond with a 200
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()
        graph_codes = [
            'user_login_time', 'user_average_updates', 'user_created_items',
            'user_edited_items', 'user_edited_items',
        ]
        url_tpl = '/corroborator/graphs/user/{0}/'
        for graph_code in graph_codes:
            url = url_tpl.format(graph_code)
            response = self.client.get(url)
            fail_message = '{0} failed to load'.format(url_tpl)
            self.assertEqual(response.status_code, 200, fail_message)

    def test_graphs_with_user_id_respond(self):
        '''
        check the graph views that require a user_id respond with a 200
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()
        user_id = User.objects.all()[0].id
        graph_codes = [
            'user_login_per_day', 'user_assigned_items_by_status',
            'user_deleted_edited_created',
        ]
        url_tpl = '/corroborator/graphs/user/{0}/{1}/'
        for graph_code in graph_codes:
            url = url_tpl.format(graph_code, user_id)
            response = self.client.get(url)
            fail_message = '{0} failed to load'.format(url_tpl)
            self.assertEqual(response.status_code, 200, fail_message)

    #####################################################################
    # tests below can now skip the login bit and test the data generation
    # directly
    # this will hopefully speed up the tests
    # I've included an example of directly testing the formatting code
    #####################################################################
    def test_user_login_time(self):
        '''
        Test correct return of user login time json
        '''
        user = User.objects.all()[0]
        values = generate_start_end_times(user)
        expected_response = json.dumps({
            'values': [
                {
                    'value': 360,
                    'label': 'user'
                }
            ],
            'title': 'Total login time by User'
        })
        ura = UserReportingApi()
        expected_response = json.loads(expected_response)
        json_response = json.loads(ura.total_user_login_time())
        self.assertEqual(expected_response, json_response)

    def test_user_login_per_day(self):
        '''
        Test correct return of user login
        time per day json
        '''
        user = User.objects.all()[0]
        values = generate_start_end_times(user)
        ura = UserReportingApi()
        expected_response = json.dumps({
            'values': [
                {
                    'values': [
                        {
                            "y": 180, 
                            "x": 1370041200000.0
                        },
                        {
                            "y": 180, 
                            "x": 1370127600000.0
                        }],
                    'label': 'user'
                }
            ],
            'title': 'Total user login time per day'
        })

        json_response = json.loads(ura.total_user_login_per_day(user.id))
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)

    def test_user_average_update(self):
        '''
        Test correct return of user
        average updates json
        '''
        user = User.objects.all()[0]
        value = average_updates_value(user)
        ura = UserReportingApi()
        expected_response = json.dumps({
            'values': [
                {
                    'value': 0.5,
                    'label': 'user'
                }
            ],
            'title': 'Average user updates per hour'
        })

        json_response = json.loads(ura.user_average_updates_per_hour())
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)

    def test_user_assigned_items_by_status(self):
        '''
        Test correct return of user assigned
        items by status json
        '''
        user = User.objects.all()[0]
        precreated_bulletin = Bulletin.objects.all()[0]
        precreated_actor = Actor.objects.all()[0]
        precreated_incident = Incident.objects.all()[0]
        comment = Comment(
            assigned_user_id=user.id,
            comments_en='comment',
            status_id=5
        )
        comment.save()
        precreated_bulletin.assigned_user = user
        precreated_bulletin.bulletin_comments.add(comment)

        precreated_actor.assigned_user = user
        precreated_actor.actor_comments.add(comment)

        precreated_incident.assigned_user = user
        precreated_incident.incident_comments.add(comment)

        precreated_bulletin.save()
        precreated_actor.save()
        precreated_incident.save()

        status_label = StatusUpdate.objects.filter(pk=5)\
            .values('status_en')[0]['status_en']

        ura = UserReportingApi()
        expected_response = json.dumps({
            'values': [
                {
                    'value': 3,
                    'label': 'Finalized'
                }
            ],
            'title': 'User assigned items by status'
        })

        json_response = json.loads(ura.user_assigned_items_by_status(user.id))
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)

    def test_user_deleted_items(self):
        '''
        Test correct return of user deleted items
        json
        '''
        user = User.objects.all()[0]
        total_updates = create_version_status_entries_for_user(user)
        ura = UserReportingApi()
        expected_response = json.dumps({
            'values': [
                {
                    'value': 3,
                    'label': 'user'
                }
            ],
            'title': 'Total deleted items by User'
        })
        json_response = json.loads(ura.total_user_items_by_crud('deleted'))
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)

    def test_user_created_items(self):
        '''
        Test correct return of user created items
        json
        '''
        user = User.objects.all()[0]
        total_updates = create_version_status_entries_for_user(user)
        ura = UserReportingApi()
        expected_response = json.dumps({
            'values': [
                {
                    'value': 3,
                    'label': 'user'
                }
            ],
            'title': 'Total created items by User'
        })
        json_response = json.loads(ura.total_user_items_by_crud('created'))
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)

    def test_user_edited_items(self):
        '''
        Test correct return of user edited items
        json
        '''
        user = User.objects.all()[0]
        total_updates = create_version_status_entries_for_user(user)
        ura = UserReportingApi()
        expected_response = json.dumps({
            'values': [
                {
                    'value': 3,
                    'label': 'user'
                }
            ],
            'title': 'Total edited items by User'
        })
        json_response = json.loads(ura.total_user_items_by_crud('edited'))
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)

    def test_user_deleted_edited_created(self):
        '''
        Test correct return of CRUD data as json
        '''
        user = User.objects.all()[0]
        items = crud_items_by_date(user)
        ura = UserReportingApi()
        expected_response = json.dumps({
            'values': [
                {
                    'values': [{
                            "y": 3, 
                            "x": 1390867200000.0
                    }],
                    'key': 'Deleted items by date'
                },
                {
                    'values': [{
                            "y": 3, 
                            "x": 1390867200000.0
                    }],
                    'key': 'Created items by date'
                },
                {
                    'values': [{
                            "y": 3, 
                            "x": 1390867200000.0
                    }],
                    'key': 'Edited items by date'
                }
            ],
            'title': 'Deleted, created and edited items by date'
        })
        json_response = json.loads(ura.crud_per_day(user.id))
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)
