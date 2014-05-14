import os, sys

path = '/var/www/corroborator'

if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'corroborator.settings.dev'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()



