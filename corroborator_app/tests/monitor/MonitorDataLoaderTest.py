from django.test import TestCase, Client
from django.http import HttpRequest
from django.contrib.auth import authenticate
from corroborator_app.monitor.monitorDataLoader import MonitorDataLoader
from corroborator_app.tests.test_utilities import TestUserUtility
import json

class MonitorDataLoaderTestCase(TestCase):

    def setUp(self):
        """
        Setup initial tools
        """
        self.mdl = MonitorDataLoader()

    def test_overwrite_importer_config_api(self):
        """
        Test that the importer config is correctly written
        """
        data = {
            "_HEADER": {
                "modified": "2013/10/10",
                "author": "Bill Doran"
            },
            "actors_dir": "/tmp/actors_csv/",
            "bulletins_dir": "/tmp/bulletins_csv",
            "mysql_dir": "/tmp/mysql/",
            "media_params": {
                "media_dir": "/tmp/media/",
                "file_meta_type": ".yaml",
                "file_types": {
                    "image": [
                        "test",
                        "png",
                        "gif"
                    ],
                    "video": [
                        "mp4"
                    ]
                }
            },
        }
        result = self.mdl.overwrite_importer_config(data)
        test_result = result['result']
        self.assertEqual(test_result,'success') 

    def test_overwrite_scraper_config_api(self):
        """
        Test that the scraper config is correctly written
        """
        data = {
            "_HEADER": {
                "modified": "2013/10/10",
                "author": "Bill Doran"
            },
            "actors_dir": "/tmp/actors_csv/",
            "bulletins_dir": "/tmp/bulletins_csv/",
            "scrapers": [{
                "vdc": False,
                "csrsy": False,
                "documents-sy": False,
                "syrianshuhada": False
            }]
        }
        client = Client()
        url = '/corroborator/monitoring/update/scraper/'
        response = client.post(
            url,
            json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code,200) 

    def test_overwrite_importer_config(self):
        """
        Test that the importer config is correctly written
        """
        data = {
            "_HEADER": {
                "modified": "2013/10/10",
                "author": "Bill Doran"
            },
            "actors_dir": "/tmp/actors_csv/",
            "bulletins_dir": "/tmp/bulletins_csv",
            "mysql_dir": "/tmp/mysql/",
            "media_params": {
                "media_dir": "/tmp/media/",
                "file_meta_type": ".yml",
                "file_types": {
                    "image": [
                        "test",
                        "png",
                        "gif"
                    ],
                    "video": [
                        "mp4"
                    ]
                }
            },
        }
        client = Client()
        url = '/corroborator/monitoring/update/importer/'
        response = client.post(
            url,
            json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code,200) 

    def test_overwrite_scraper_config(self):
        """
        Test that the scraper config is correctly written
        """
        data = {
            "_HEADER": {
                "modified": "2013/10/10",
                "author": "Bill Doran"
            },
            "actors_dir": "/tmp/actors_csv/",
            "bulletins_dir": "/tmp/bulletins_csv/",
            "scrapers": [{
                "vdc": False,
                "csrsy": False,
                "documents-sy": False,
                "syrianshuhada": False
            }]
        }
        result = self.mdl.overwrite_scraper_config(data)
        self.assertEqual(result['result'],'success') 

    def test_read_scraper_config(self):
        """
        Test that the scraper config is correctly read
        """
        scraper_conf = self.mdl.get_scraper_config()
        self.assertEqual(
            scraper_conf['_HEADER']['modified'],
            '2013/10/10'
        ) 

    def test_missing_fields(self):
        """
        Test error message for missing fields
        """
        data = {
            "_HEADER": {
                "modified": "2013/10/10",
                "author": "Bill Doran"
            },
            "actors_dir": "/tmp/actors_csv/",
            "bulletins_dir": "/tmp/bulletins_csv",
            "mysql_dir": "/tmp/mysql/",
            "media_params": {
                "media_dir": "/tmp/media/",
                "file_meta_type": ".yaml",
                "file_types": {
                    "image": [
                        "test",
                        "png",
                        "gif"
                    ],
                    "video": [
                        "mp4"
                    ]
                }
            },
        }
        mysql_missing = dict(data)
        del mysql_missing['mysql_dir']
        result = self.mdl.overwrite_importer_config(mysql_missing)
        self.assertEqual(result['error'], 'MySQL Directory missing')

        actor_dir_wrong = dict(data)
        actor_dir_wrong['actors_dir'] = 'not real dir'
        result = self.mdl.overwrite_importer_config(actor_dir_wrong)
        self.assertEqual(result['error'], 'not real dir is not a valid system directory')

        del actor_dir_wrong['actors_dir']
        result = self.mdl.overwrite_importer_config(actor_dir_wrong)
        self.assertEqual(result['error'], 'Actors Directory missing')


        bulletin_dir_wrong = dict(data)
        bulletin_dir_wrong['bulletins_dir'] = 'not real dir'
        result = self.mdl.overwrite_importer_config(
            bulletin_dir_wrong
        )
        self.assertEqual(result['error'], 'not real dir is not a valid system directory')

        del bulletin_dir_wrong['bulletins_dir']
        result = self.mdl.overwrite_importer_config(bulletin_dir_wrong)
        self.assertEqual(result['error'], 'Bulletins Directory missing')
        media_params = dict(data)
        media_params['media_params']['media_dir'] = 'not real dir'
        result = self.mdl.overwrite_importer_config(media_params)
        self.assertEqual(result['error'], 'not real dir is not a valid system directory')

        media_params['media_params']['media_dir'] = '/tmp/media/'
        media_params['media_params']['file_meta_type'] = '_#4eld0'
        result = self.mdl.overwrite_importer_config(media_params)
        self.assertEqual(result['error'], '_#4eld0 does not match required file extension format. eg: .yaml')

        media_params['media_params']['file_meta_type'] = '.yaml'
        media_params['media_params']['file_types']['image'].append(
            '_#4eld0'
        )
        result = self.mdl.overwrite_importer_config(media_params)
        self.assertEqual(
            result['error'], 
            '_#4eld0 does not match required file extension format. eg: jpg'
        )


    def test_validate_ext(self):
        """
        Test file extenson validation check
        """
        test_file_ext = '.yaml'
        result = self.mdl.validate_ext(test_file_ext)
        self.assertEqual(result['success'], 'true')

    def test_read_importer_config(self):
        """
        Test that the importer config can be correctly read
        """
        importer_conf = self.mdl.get_importer_config()
        self.assertEqual(
            importer_conf['_HEADER']['modified'],
            '2013/10/10'
        )
    def test_read_importer_stats(self):
        """
        Test reading of the importer stats
        """
        importer_stats = self.mdl.get_importer_stats()
        self.assertEqual(
            importer_stats['_HEADER']['modified'],
            '2013/10/10'
        )
