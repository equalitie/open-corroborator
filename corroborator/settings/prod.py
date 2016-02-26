"""Initial settings for production"""
import sys
from common import *

ALLOWED_HOSTS = ['<host>']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'corroborator_prod',
        'USER': '<db_user>',
        'PASSWORD': '<db_password>',
        'HOST': '',
        'PORT': '',
    }
}

SECRET_KEY = '<DJANGO_SECRET_KEY>'

QUEUED_STORAGE = False  #i.e. save uploads locally (in MEDIA_ROOT)
SENDFILE_BACKEND = 'sendfile.backends.xsendfile'

SITE_ROOT = sys.prefix

MEDIA_ROOT = os.path.join(SITE_ROOT, 'var' ,'media')

STATIC_ROOT = os.path.join(SITE_ROOT, 'static')
STATICFILES_DIRS = ('/var/local/checkouts/corroborator/static',)

TIME_ZONE = 'Europe/London'
