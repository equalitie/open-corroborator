from common import *

ALLOWED_HOSTS = ['*']

DATABASES['default']['NAME'] = 'corroborator_vm'

AWS_ACCESS_KEY_ID = 'todo'
AWS_SECRET_ACCESS_KEY = 'todo'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
QUEUED_STORAGE = True  #i.e. local (temporarily) then queue to S3
#todo next: QUEUED_STORAGE=False

SITE_ROOT = os.path.abspath(os.path.join(ROOT_PATH, '..', '..'))

MEDIA_ROOT = '/var/local/sites/corroborator/var/media'

STATIC_ROOT = '/var/local/sites/corroborator/static'
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)

TIME_ZONE = 'Europe/London'

TEMPLATE_DIRS = (
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(SITE_ROOT, 'corroborator_app/templates'),
)
