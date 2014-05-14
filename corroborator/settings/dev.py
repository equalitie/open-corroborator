"""
Author: Cormac McGuire
Dev settings
"""
from settings.common import *

SESSION_COOKIE_AGE = 400 * 60
DEBUG = True
ALLOWED_HOSTS = ['*']

SOLR_URL = '<solr_url>'
SOLR_PROXY_URL = '<solr_proxy_url>'

ROOT_PATH = '<root_path_for_code_base>'
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
        'NAME': '<db_name>',
        'USER': '<db_user>',
        'PASSWORD': '<db_password>',
        'HOST': 'localhost',
        'PORT': '',
    }
}


INSTALLED_APPS += (
    'model_report',
    'autofixture',
    'debug_toolbar',
)

INTERNAL_IPS = ('127.0.0.1',)

DEBUG_TOOLBAR_PANELS = (
    'debug_toolbar.panels.version.VersionDebugPanel',
    'debug_toolbar.panels.timer.TimerDebugPanel',
    'debug_toolbar.panels.settings_vars.SettingsVarsDebugPanel',
    'debug_toolbar.panels.headers.HeaderDebugPanel',
    'debug_toolbar.panels.request_vars.RequestVarsDebugPanel',
    'debug_toolbar.panels.template.TemplateDebugPanel',
    'debug_toolbar.panels.sql.SQLDebugPanel',
    'debug_toolbar.panels.signals.SignalDebugPanel',
    'debug_toolbar.panels.logger.LoggingPanel',
)
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

STATIC_ROOT = ROOT_PATH + 'static/'

TIME_ZONE = 'Europe/Dublin'

IMPORTER_CONF_FILE = ROOT_PATH + '/static/js/test_confs/importer.json'
SCRAPER_CONF_FILE = ROOT_PATH + '/static/js/test_confs/scraper.json'
MONITOR_JOB_FILE = ROOT_PATH + '/static/js/test_confs/importer_stats.json'
