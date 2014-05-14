"""
Author: Cormac McGuire
Date: 11/02/2014
test that actor bootstrap formats correctly
"""
from django.test import TestCase

from corroborator_app.models import Actor


class ActorBootstrapTestCase(TestCase):
    '''
    test that actors are formatted correctly by the bootstrap manager
    '''
    fixtures = ['test_data_role']

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_actor_formatted(self):
        '''
        test that we are getting our actor back the way we want him or her
        '''
        actors = Actor.bootstrap_actors.filter(id=1)
        self.assertEqual(actors[0]['actors'],  ['/api/v1/actor/3/'])
