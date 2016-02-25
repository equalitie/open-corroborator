from dev import *

AWS_ACCESS_KEY_ID = 'todo'
AWS_SECRET_ACCESS_KEY = 'todo'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
MEDIA_DIRECTORY = 'corroborator-media/test'

DEBUG = False

DATABASES['default']['NAME'] = 'corroborator_vm'

#DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHECKOUT_ROOT = os.path.abspath(os.path.join(PROJECT_ROOT, '..'))
MEDIA_ROOT = '/var/local/sites/corroborator/var/media'

STATIC_ROOT = '/var/local/sites/corroborator/static'
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)



TEMPLATE_DIRS = (
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(CHECKOUT_ROOT, 'corroborator_app/templates'),
)
