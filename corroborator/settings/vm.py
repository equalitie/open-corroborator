import sys
from common import *

ALLOWED_HOSTS = ['*']

DATABASES['default']['NAME'] = 'corroborator_vm'

AWS_ACCESS_KEY_ID = 'TODO IF QUEUED_STORAGE IS SET'
AWS_SECRET_ACCESS_KEY = 'TODO IF QUEUED_STORAGE IS SET'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
QUEUED_STORAGE = False  #i.e. save uploads locally (in MEDIA_ROOT)
SENDFILE_BACKEND = 'sendfile.backends.xsendfile'

SITE_ROOT = sys.prefix

MEDIA_ROOT = os.path.join(SITE_ROOT, 'var' ,'media')

STATIC_ROOT = os.path.join(SITE_ROOT, 'static')
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)

TIME_ZONE = 'Europe/London'
