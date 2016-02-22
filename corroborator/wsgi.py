"""
WSGI config for open-corroborator project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.5/howto/deployment/wsgi/
"""

#note: assumes caller has set DJANGO_SETTINGS_MODULE

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
