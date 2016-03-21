from django.conf import settings
import json
import os
import re

class MonitorDataLoader:

    def __init__(self):
        """
        get initial json data for monitor elements
        """
        self.importer_config = self.get_importer_config()
        self.scraper_config = self.get_scraper_config()
        self.importer_stats = self.get_importer_stats()

    def get_importer_config(self):
        """
        Get current config for importer
        """
        importer_config_file = settings.IMPORTER_CONF_FILE
        return self.get_config(importer_config_file)

    def get_scraper_config(self):
        """
        Get current config for importer
        """
        scraper_config_file = settings.SCRAPER_CONF_FILE
        return self.get_config(scraper_config_file)

    def overwrite_scraper_config(self, data):
        """
        Update config file
        """
        scraper_config_file = settings.SCRAPER_CONF_FILE
        validation = self.validate_scraper_config(data)
        if 'error' in validation:
            return validation
        else:
            return self.overwrite_config(data, scraper_config_file)


        return self.overwrite_config(data, scraper_config_file)

    def overwrite_importer_config(self, data):
        """
        Update config file
        """
        importer_config_file = settings.IMPORTER_CONF_FILE
        validation = self.validate_importer_config(data)
        if 'error' in validation:
            return validation
        else:
            return self.overwrite_config(data, importer_config_file)

    def validate_scraper_config(self, data):
        """
        Validate and sanitise configuration JSON input
        """
        if 'actors_dir' not in data:
            return {'error': 'Actors Directory missing'}
        elif not os.path.exists(data['actors_dir']):
            return {
                'error': data['actors_dir'] + ' is not a valid system directory'
            }
        if 'bulletins_dir' not in data:
            return {'error': 'Bulletins Directory missing'}
        elif not os.path.exists(data['actors_dir']):
            return {
                'error': data['bulletins_dir'] + ' is not a valid system directory'
            }
        if 'scrapers' not in data:
            return {
                'error': 'scrapers not specified. At least one scraper must be specified.'
            }

        return {'result': 'success'}

    def validate_importer_config(self, data):
        """
        Validate and sanitise configuration JSON input
        """
        if 'mysql_dir' not in data:
            return {'error': 'MySQL Directory missing'}
        if 'actors_dir' not in data:
            return {'error': 'Actors Directory missing'}
        elif not os.path.exists(data['actors_dir']):
            return {
                'error': data['actors_dir'] + \
                    ' is not a valid system directory'
            }
        if 'bulletins_dir' not in data:
            return {'error': 'Bulletins Directory missing'}
        elif not os.path.exists(data['bulletins_dir']):
            return {
                'error': data['bulletins_dir'] +\
                    ' is not a valid system directory'
            }

        if 'media_params' not in data:
            return {'error': 'Media parameters missing'}
        elif 'media_dir' not in data['media_params']:
            return {'error': 'Media Directory missing'}
        elif not os.path.exists(data['media_params']['media_dir']):
            return {
                'error': data['media_params']['media_dir'] + ' is not a valid system directory'
            }
        elif 'file_meta_type' not in data['media_params']:
            return {'error': 'File Meta type missing'}

        ext_result = self.validate_ext(
            data['media_params']['file_meta_type']
        )
        if 'error' in ext_result:
            return ext_result
       
        if 'file_types' not in data['media_params']:
            return {
                'error': 'File types not specified'
            }
        file_types = data['media_params']['file_types']
        if 'image' not in file_types:
            return{
                'error': 'Image file types not specified. At least one image file type must be specified.'
            }
        elif 'video' not in file_types:
            return{
                'error': 'Video file types not specified. At least one video file type must be specified.'
            }

        image_types =  data['media_params']['file_types']['image']
        image_types +=  data['media_params']['file_types']['video']
        
        for image_type in image_types:
            result = self.validate_file_type(image_type)
            if 'error' in result:
                return result

        return {'result': 'success'}

    def validate_file_type(self, file_type):
        """
        Test file type to ensure it meets requirements
        """
        if re.match("^[A-Za-z0-9]+$", file_type):
            return {'success':'true'}
        else:
            return {'error': file_type +\
                ' does not match required file extension format. eg: jpg'
            }

    def validate_ext(self, ext_str):
        """
        Test extension string to ensure that it meets the required
        format
        """
        if re.match("^\.[A-Za-z0-9]+$", ext_str):
            return {'success':'true'}
        else:
            return {'error': ext_str +\
                ' does not match required file extension format. eg: .yaml'
            }

    def get_importer_stats(self):
        """
        Get current config for importer
        """
        importer_stats_file = settings.MONITOR_JOB_FILE
        return self.get_config(importer_stats_file)

    def get_config(self, config_file):
        """
        Get the config as JSON for the specified file
        """

        CONFIG_FILE = os.path.join(
            #todo remove: full path now passed in: os.path.dirname(__file__), 
            config_file    
        )

        config_data = open(CONFIG_FILE)
        config = json.load(config_data)
        config_data.close()
        return config

    def overwrite_config(self, data, config_file):
        """
        Write the specified json out to the given config file
        """
        CONFIG_FILE = os.path.join(
            #todo remove: full path now passed in: os.path.dirname(__file__), 
            config_file    
        )
        try:
            with open(CONFIG_FILE, 'w') as outfile:
                json.dump(data, outfile)

            return {"result": "success"}
        except Exception, e:
            return {"error": str(e)}


