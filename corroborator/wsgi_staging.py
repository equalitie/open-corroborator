"""
WSGI config for corroborator project.

This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.
"""

# -*- coding: utf-8 -*-
import os
import site
import sys


# Remember original sys.path.
prev_sys_path = list(sys.path)

# we add current directory to path and change to it
pwd = os.path.dirname(os.path.abspath(__file__))
os.chdir( pwd )
sys.path = [pwd] + sys.path
sys.path  = [pwd + '/../'] + sys.path

# find the site-packages within the local virtualenv
for python_dir in os.listdir('../env/lib'):
    site_packages_dir = os.path.join("../env/lib", python_dir, "site-packages")
    if os.path.exists(site_packages_dir):
        site.addsitedir(os.path.abspath(site_packages_dir))

# Reorder sys.path so new directories at the front.
new_sys_path = []
for item in list(sys.path):
    if item not in prev_sys_path:
        print item
        new_sys_path.append(item)
        sys.path.remove(item)
        sys.path[:0] = new_sys_path


# now start django
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings.staging'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()


