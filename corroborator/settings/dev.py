"""
Author: Cormac McGuire
Dev settings
"""
from common import *

SESSION_COOKIE_AGE = 400 * 60
DEBUG = True
TEMPLATE_DEBUG = DEBUG

DATABASES['default']['NAME'] = 'corroborator_dev'

SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

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

