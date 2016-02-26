"""
Django settings for corroborator project.
"""
import os.path
import djcelery
djcelery.setup_loader()

ROOT_PATH = os.path.abspath(os.path.dirname(__name__))

BROKER_URL = 'amqp://guest:guest@localhost:5672/'

ALLOWED_HOSTS = ['*']
DEBUG = False
TEMPLATE_DEBUG = DEBUG

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'corroborator',
        'USER': 'django',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}

AWS_ACCESS_KEY_ID = 'TODO'
AWS_SECRET_ACCESS_KEY = 'TODO'
AWS_STORAGE_BUCKET_NAME = 'equalitie'
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
QUEUED_STORAGE = False  #if True, stores locally then copies to S3; if False, uses DEFAULT_FILE_STORAGE
SENDFILE_BACKEND = 'sendfile.backends.development'

SOLR_CORE = 'corroborator-search'
SOLR_URL = 'http://localhost:8983/solr/' + SOLR_CORE + '/select'
SOLR_PROXY_URL = '/corroborator/solrproxy/'
SOLR_REFRESH_WINDOW = 100  #Solr update refresh window in minutes

#Haystack backend configuration
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'
#todo test for staging HAYSTACK_SIGNAL_PROCESSOR = 'celery_haystack.signals.CelerySignalProcessor'
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
        'URL': 'http://127.0.0.1:8983/solr/' + SOLR_CORE,
    },
}

CORROBORATOR_LOGIN_TIMEOUT = 60 * 60 * 4
#SESSION_COOKIE_AGE = 10
#SESSION_EXPIRE_AT_BROWSER_CLOSE = True

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

# Tastypie configuration parameters
TASTYPIE_DEFAULT_FORMATS = ['json']

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'UTC'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = '/tmp/corroborator'

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = '/corroborator/aws/'  #todo replace storage-specific 'aws' with just 'media'? (would need to modify url too)


STATIC_ROOT = os.path.join(ROOT_PATH, 'static/')

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

STATIC_URL = '/static/'

# Make this unique, and don't share it with anybody.
SECRET_KEY = '<DJANGO_SECRET_KEY>'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
    #'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'corroborator_app.custom_middleware.SessionAuditMiddleware',
    #'reversion.middleware.RevisionMiddleware',
    # Uncomment line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'corroborator.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'corroborator.wsgi.application'

IMPORTER_CONF_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/importer.json')
SCRAPER_CONF_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/scraper.json')
MONITOR_JOB_FILE = os.path.join(ROOT_PATH, 'static/js/test_confs/importer_stats.json')

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    #'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    'django.contrib.gis',

    # contrib apps
    'djcelery',
    'queued_storage',
    'haystack',
    'south',
    'tastypie',
    'reversion',
    'celery_haystack',

    #'locking',

    # custom apps
    'corroborator_app',
)

# locking config
LOCKING = {'time_until_expiration': 120, 'time_until_warning': 60}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(name)s %(process)d %(message)s',
        },
        'simple': {
            'format': '%(levelname)s %(message)s',
        },
    },  
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': True,
        },
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },

    }
}
