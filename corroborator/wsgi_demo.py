"""
WSGI config for open-corroborator project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.5/howto/deployment/wsgi/
"""

import os, sys
sys.path.append("/var/local/sites/equalitie.sandbox.isotoma.uk0.bigv.io/lib/python2.7/site-packages")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "corroborator.settings.demo")

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()