"""
Author: Cormac McGuire
Dev settings
"""
from common import *
import os.path

SESSION_COOKIE_AGE = 400 * 60
DEBUG = True
TEMPLATE_DEBUG = DEBUG
ALLOWED_HOSTS = ['*']

DATABASES['default']['NAME'] = 'corroborator_dev'

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

DEBUG_TOOLBAR_CONFIG = {
    #'INTERCEPT_REDIRECTS': False
}

MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)


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

