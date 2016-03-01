import sys
from common import *

ALLOWED_HOSTS = ['*']

PROD_BUILD = False  #enable when npm/grunt deployment works

DATABASES['default']['NAME'] = 'corroborator_demo'

QUEUED_STORAGE = False  #i.e. save uploads locally (in MEDIA_ROOT)
SENDFILE_BACKEND = 'sendfile.backends.xsendfile'

SITE_ROOT = sys.prefix

MEDIA_ROOT = os.path.join(SITE_ROOT, 'var' ,'media')

STATIC_ROOT = os.path.join(SITE_ROOT, 'static')
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)

TIME_ZONE = 'Europe/London'
