"""
Author: Cormac McGuire
Date: 11/02/2014
test that bulletin bootstrap formats correctly
"""
from django.test import TestCase

from corroborator_app.models import Bulletin
from autofixture import AutoFixture
from django.contrib.auth.models import User


class BulletinBootstrapTestCase(TestCase):
    '''
    test that bulletins are formatted correctly by the bootstrap manager
    '''
    fixtures = ['corroborator_model_data']

    def setUp(self):
        fixture = AutoFixture(User)
        fixture.create(10)

    def tearDown(self):
        User.objects.all().delete()

    def test_bulletin_formatted(self):
        '''
        test that we are getting our bulletin back the way we want him or her
        '''
        test_bulletin = {
            u'origin_id': None,
            u'labels': ['/api/v1/label/1/'],
            u'locations': ['/api/v1/location/74/'],
            'count_actors': 2,
            u'sources': [
                '/api/v1/source/1/',
                '/api/v1/source/7/',
                '/api/v1/source/9/'],
            u'assigned_user': '',
            u'actors_role': [
                '/api/v1/actorRole/227/',
                '/api/v1/actorRole/228/'],
            u'ref_bulletins': [
                '/api/v1/bulletin/3/',
                '/api/v1/bulletin/4/',
                '/api/v1/bulletin/5/',
                '/api/v1/bulletin/46/'],
            'bulletin_sources': [
                '/api/v1/source/1/',
                '/api/v1/source/7/',
                '/api/v1/source/9/'],
            u'confidence_score': 50,
            u'bulletin_created': u'2013-05-24T23:05:31Z',
            'most_recent_status_bulletin': '/api/v1/statusUpdate/3/',
            u'bulletin_modified': u'2013-05-24T23:05:31Z',
            'actors': ['/api/v1/actor/101/', '/api/v1/actor/85/'],
            u'bulletin_imported_comments': [],
            u'type': u'Video', 'bulletin_labels': ['/api/v1/label/1/'],
            u'description_ar': u'', 'sources_count': 3,
            u'deleted': False,
            u'title_en': u'TEST.A0001.648.001',
            u'description_en': u'',
            'id': 2,
            'bulletin_locations': [u'Homs'],
            u'seq_order': None,
            u'title_ar': u'',
            u'uri': None,
            u'times': ['/api/v1/timeInfo/8/'],
            'actor_roles_status': [u'K', u'D'],
            u'medias': [
                '/api/v1/media/2/',
                '/api/v1/media/169/',
                '/api/v1/media/180/'],
            u'bulletin_comments': ['/api/v1/comment/5/'],
            'ref_incidents': [
                '/api/v1/incident/1/', '/api/v1/incident/2/',
                '/api/v1/incident/3/', '/api/v1/incident/4/',
                '/api/v1/incident/6/', '/api/v1/incident/10/',
                '/api/v1/incident/11/', '/api/v1/incident/12/',
                '/api/v1/incident/13/'],
            'resource_uri': '/api/v1/bulletin/2/'
        }
        bulletins = Bulletin.bootstrap_bulletins.filter(id=2)
        self.maxDiff = None
        self.assertEqual(bulletins[0],  test_bulletin)
