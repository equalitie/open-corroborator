from common import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}
#DATABASES['default']['NAME'] = 'corroborator_dev'  #todo move from sqlite3 to mysql for tests

INSTALLED_APPS += (
    'autofixture',
)

#Haystack backend configuration
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.simple_backend.SimpleEngine',
    },
}

USE_TZ = True
TIME_ZONE = 'Europe/Dublin'
