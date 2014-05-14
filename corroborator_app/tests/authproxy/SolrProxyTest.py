"""
Tests for the multisave of actors
Author: Cormac McGuire
03/10/2013
"""
#import ipdb

from django.test import TestCase, Client
from django.http import HttpRequest


from corroborator_app.tests.test_utilities import TestUserUtility
import json


class SolrAuthProxyTestCase(TestCase):
    '''
    test the updating of multiple actors
    '''
    fixtures = ['test_data_role.json', 'status_update', ]

    def setUp(self):
        '''
        initialisation for tests
        '''
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user
        self.solr_proxy_url = 'http://localhost:8002/corroborator/solrproxy/'

    def tearDown(self):
        '''
        cleanup for tests
        '''
        pass

    def test_solr_query(self):
        '''
        test that useable url is returned by AWS proxy for
        '''

        request_params = 'select?facet=true&facet.sort=count&facet.field=bulletin_labels_exact&facet.field=bulletin_assigned_user_exact&facet.field=bulletin_sources_exact&facet.field=bulletin_created_exact&facet.field=most_recent_status_bulletin_exact&facet.field=confidence_score_exact&facet.field=incident_times_exact&facet.field=incident_labels_exact&facet.field=incident_assigned_user_exact&facet.field=incident_crimes_exact&facet.field=incident_created_exact&facet.field=most_recent_status_incident_exact&facet.field=age_en_exact&facet.field=age_ar_exact&facet.field=sex_en_exact&facet.field=sex_ar_exact&facet.field=civilian_en_exact&facet.field=civilian_ar_exact&facet.field=nationality_en_exact&facet.field=nationality_ar_exact&facet.field=occupation_en_exact&facet.field=occupation_ar_exact&facet.field=position_en_exact&facet.field=position_ar_exact&facet.field=ethnicity_en_exact&facet.field=ethnicity_ar_exact&facet.field=spoken_dialect_en&facet.field=spoken_dialect_ar&rows=1000&facet.limit=1000&facet.mincount=1&json.nl=map&q=django_ct%3A*incident&wt=json&json.wrf=jQuery110207106112593319267_1383596675055&_=1383596675068'
        request_url = self.solr_proxy_url + request_params
        client = Client()
        response = client.get(
            request_url
        )
        print response
        self.assertEqual(response.status_code, 200)
