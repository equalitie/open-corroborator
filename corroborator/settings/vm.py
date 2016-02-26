import sys
from common import *

ALLOWED_HOSTS = ['*']

DATABASES['default']['NAME'] = 'corroborator_vm'

SECRET_KEY = '<DJANGO_SECRET_KEY>'

AWS_ACCESS_KEY_ID = 'todo'
AWS_SECRET_ACCESS_KEY = 'todo'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
QUEUED_STORAGE = True  #i.e. local then queue to S3
SENDFILE_BACKEND = 'sendfile.backends.xsendfile'

SITE_ROOT = sys.prefix

MEDIA_ROOT = os.path.join(SITE_ROOT, 'var' ,'media')

STATIC_ROOT = os.path.join(SITE_ROOT, 'static')
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)

TIME_ZONE = 'Europe/London'

#todo remove? TEMPLATE_DIRS = (
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
#    os.path.join(SITE_ROOT, 'corroborator_app/templates'),
#)
