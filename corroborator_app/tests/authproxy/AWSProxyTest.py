"""
Tests for the multisave of actors
Author: Cormac McGuire
03/10/2013
"""
#import ipdb

from django.test import TestCase, Client
from django.http import HttpRequest
from django.contrib.auth import authenticate


from corroborator_app.tests.test_utilities import TestUserUtility
import json


class AWSAuthProxyTestCase(TestCase):
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
        self.client = Client()
        self.aws_proxy_url = '/corroborator/aws/'

    def tearDown(self):
        '''
        cleanup for tests
        '''
        pass

    def test_request_image_url(self):
        '''
        test that useable url is returned by AWS proxy for
        '''
        image_name = 'test_image.jpg'
        request_url = self.aws_proxy_url + image_name
        print request_url
        self.client.login(
            username=self.user.username,
            password=self.user.password
        )
        response = self.client.post(
            request_url
        )
        self.assertEqual(response.status_code, 302)
