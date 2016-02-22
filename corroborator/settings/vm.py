from dev import *

AWS_ACCESS_KEY_ID = 'todo'
AWS_SECRET_ACCESS_KEY = 'todo'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
MEDIA_DIRECTORY = 'corroborator-media/test'

DEBUG_TOOLBAR_PATCH_SETTINGS = False 
DEBUG_TOOLBAR_CONFIG = {}

DATABASES['default']['NAME'] = 'corroborator_vm'

#DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHECKOUT_ROOT = os.path.abspath(os.path.join(PROJECT_ROOT, '..'))
MEDIA_ROOT = os.path.join(CHECKOUT_ROOT, 'var', 'media')
STATIC_ROOT = os.path.join(CHECKOUT_ROOT, 'var', 'static')


STATICFILES_DIRS = (
    ('stylesheets', os.path.join(CHECKOUT_ROOT, 'static/stylesheets')),
    ('js', os.path.join(CHECKOUT_ROOT, 'static/js')),
    ('images', os.path.join(CHECKOUT_ROOT, 'static/images')),
    ('fonts', os.path.join(CHECKOUT_ROOT, 'static/fonts')),
    ('css', os.path.join(CHECKOUT_ROOT, 'static/css')),
    
    ('admin', os.path.join(CHECKOUT_ROOT, 'static/admin')),
)

TEMPLATE_DIRS = (
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(CHECKOUT_ROOT, 'corroborator_app/templates'),
)
