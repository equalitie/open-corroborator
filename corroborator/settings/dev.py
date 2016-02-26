"""
Author: Cormac McGuire
Dev settings
"""
from common import *

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

MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

TIME_ZONE = 'Europe/Dublin'

