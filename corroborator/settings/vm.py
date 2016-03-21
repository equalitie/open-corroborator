import sys
from common import *

ALLOWED_HOSTS = ['*']

DATABASES['default']['NAME'] = 'corroborator_vm'

SECRET_KEY = '<DJANGO_SECRET_KEY> should be more than 50 characters and have more than 5 unique characters.'

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True

AWS_ACCESS_KEY_ID = 'TODO IF QUEUED_STORAGE IS SET'
AWS_SECRET_ACCESS_KEY = 'TODO IF QUEUED_STORAGE IS SET'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
QUEUED_STORAGE = False  #i.e. save uploads locally (in MEDIA_ROOT)
SENDFILE_BACKEND = 'sendfile.backends.xsendfile'

SITE_ROOT = sys.prefix

MEDIA_ROOT = os.path.join(SITE_ROOT, 'var' ,'media')

STATIC_ROOT = os.path.join(SITE_ROOT, 'static')
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)

IMPORTER_CONF_FILE = os.path.join(STATICFILES_DIRS[0], 'js/test_confs/importer.json')
SCRAPER_CONF_FILE = os.path.join(STATICFILES_DIRS[0], 'js/test_confs/scraper.json')
MONITOR_JOB_FILE = os.path.join(STATICFILES_DIRS[0], 'js/test_confs/importer_stats.json')

TIME_ZONE = 'Europe/London'
