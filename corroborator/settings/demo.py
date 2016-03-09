import sys
from common import *

ALLOWED_HOSTS = ['*']

PROD_BUILD = False  #enable when npm/grunt deployment works

DATABASES['default']['NAME'] = 'corroborator_demo'

SECRET_KEY = '<DJANGO_SECRET_KEY> should be more than 50 characters and have more than 5 unique characters.'

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True

QUEUED_STORAGE = False  #i.e. save uploads locally (in MEDIA_ROOT)
SENDFILE_BACKEND = 'sendfile.backends.xsendfile'

SITE_ROOT = sys.prefix

MEDIA_ROOT = os.path.join(SITE_ROOT, 'var' ,'media')

STATIC_ROOT = os.path.join(SITE_ROOT, 'static')
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)

TIME_ZONE = 'Europe/London'
