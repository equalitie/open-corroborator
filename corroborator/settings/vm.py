from common import *

from queued_storage.backends import QueuedStorage

ALLOWED_HOSTS = ['*']

DATABASES['default']['NAME'] = 'corroborator_vm'

AWS_ACCESS_KEY_ID = 'todo'
AWS_SECRET_ACCESS_KEY = 'todo'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
#Setup Boto AWS storage access system
DEFAULT_FILE_STORAGE = QueuedStorage(
    'django.core.files.storage.FileSystemStorage',  #note: local (temporary while on queue)
    'storages.backends.s3boto.S3BotoStorage'        #note: remote
)
#todo next: DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

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
