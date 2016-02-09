from common import *
import os.path

SOLR_CORE = 'corrob_demo'  #todo use (default collection1)

DEBUG = True  #temp
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['*']  #todo fix

SOLR_URL = 'http://localhost:8983/solr/' + SOLR_CORE + '/select'
SOLR_PROXY_URL = '/corroborator/solrproxy/'

#todo
AWS_ACCESS_KEY_ID = '<AWS_ACCESS_KEY_ID>'
AWS_SECRET_ACCESS_KEY = '<AWS_SECRET_ACCESS_KEY>'
AWS_STORAGE_BUCKET_NAME = '<AWS_STORAGE_BUCKET_NAME>'
MEDIA_DIRECTORY = '<AWS_MEDIA_DIRECTORY>'

ROOT_PATH = os.path.abspath(os.path.dirname(__name__))

DATABASES = {
    'default': {
    'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
    'NAME': 'corroborator_demo',                      # Or path to database file if using sqlite3.
    'USER': 'django',                      # Not used with sqlite3.
    'PASSWORD': 'password',                  # Not used with sqlite3.
    'HOST': 'localhost',                      # Set to empty string for localhost. Not used with sqlite3.
    'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
                                                                }
}

INTERNAL_IPS = ('127.0.0.1',)

#Haystack backend configuration
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'
#todo fix: HAYSTACK_SIGNAL_PROCESSOR = 'celery_haystack.signals.CelerySignalProcessor'

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
        'URL': 'http://localhost:8000/solr'
        # ...or for multicore...
    },
}

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = '/var/local/sites/open-corroborator-vm.stage.isotoma.com/var/static/'

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    ('stylesheets', 'static/stylesheets'),
    ('js', 'static/js'),
    ('images', 'static/images'),
    ('fonts', 'static/fonts'),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

#todo review:
TIME_ZONE = 'Europe/Dublin'
IMPORTER_CONF_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/importer.json')
SCRAPER_CONF_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/scraper.json')
MONITOR_JOB_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/importer_stats.json')