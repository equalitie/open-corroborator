"""
Author: Cormac McGuire
Dev settings
"""
from settings.common import *
import os.path

SESSION_COOKIE_AGE = 400 * 60
DEBUG = True
TEMPLATE_DEBUG = DEBUG
ALLOWED_HOSTS = ['*']

SOLR_URL = 'http://localhost:8983/solr/collection1/select'
#SOLR_PROXY_URL = '/corroborator/search/'
SOLR_PROXY_URL = '/corroborator/solrproxy/'

AWS_ACCESS_KEY_ID = '<AWS_ACCESS_KEY_ID>'
AWS_SECRET_ACCESS_KEY = '<AWS_SECRET_ACCESS_KEY>'
AWS_STORAGE_BUCKET_NAME = '<AWS_STORAGE_BUCKET_NAME>'
MEDIA_DIRECTORY = '<AWS_MEDIA_DIRECTORY>'

#ROOT_PATH = '<root_path_for_code_base>'
ROOT_PATH = os.path.abspath(os.path.dirname(__name__))
#DATABASES = {
    #'default': {
        #'ENGINE': 'django.db.backends.sqlite3',
        #'NAME': ROOT_PATH + '../db/corroborator-latest.sql',
        #'USER': '',
        #'PASSWORD': '',
        #'HOST': '',
        #'PORT': '',
    #}
#}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'corroborator_dev',
        'USER': 'django',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}


INSTALLED_APPS += (
    #'model_report',
    'autofixture',
    'debug_toolbar',
)

INTERNAL_IPS = ('127.0.0.1',)

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
]
#todo remove: old
#(
    #'debug_toolbar.panels.version.VersionDebugPanel',
    #'debug_toolbar.panels.timer.TimerDebugPanel',
    #'debug_toolbar.panels.settings_vars.SettingsVarsDebugPanel',
    #'debug_toolbar.panels.headers.HeaderDebugPanel',
    #'debug_toolbar.panels.request_vars.RequestVarsDebugPanel',
    #'debug_toolbar.panels.template.TemplateDebugPanel',
    #'debug_toolbar.panels.sql.SQLDebugPanel',
    #'debug_toolbar.panels.signals.SignalDebugPanel',
    #'debug_toolbar.panels.logger.LoggingPanel',
#)

DEBUG_TOOLBAR_CONFIG = {
    'INTERCEPT_REDIRECTS': False
}

MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

#Haystack backend configuration
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
        'URL': 'http://127.0.0.1:8983/solr',
        # ...or for multicore...
    },
}

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(ROOT_PATH, 'static/')

#todo copied from staging.py - remove the need for this!
# Additional locations of static files
STATICFILES_DIRS = (
    ('stylesheets', os.path.join(ROOT_PATH, 'static/stylesheets')),
    ('js', os.path.join(ROOT_PATH, 'static/js')),
    ('images', os.path.join(ROOT_PATH, 'static/images')),
    ('fonts', os.path.join(ROOT_PATH, 'static/fonts')),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)


TIME_ZONE = 'Europe/Dublin'

IMPORTER_CONF_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/importer.json')
SCRAPER_CONF_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/scraper.json')
MONITOR_JOB_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/importer_stats.json')
