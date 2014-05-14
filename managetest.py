#!/usr/bin/env python
import os
import sys
import site

if __name__ == "__main__":
    # Remember original sys.path.
    prev_sys_path = list(sys.path)

    # we add currently directory to path and change to it
    pwd = os.path.dirname(os.path.abspath(__file__))
    os.chdir( pwd )
    sys.path = [pwd] + sys.path
    sys.path  = [pwd + '/corroborator/'] + sys.path

    # find the site-packages within the local virtualenv
    for python_dir in os.listdir('env/lib'):
        site_packages_dir = os.path.join("env/lib", python_dir, "site-packages")
        if os.path.exists(site_packages_dir):
            site.addsitedir(os.path.abspath(site_packages_dir))

    # Reorder sys.path so new directories at the front.
    new_sys_path = []
    for item in list(sys.path):
        if item not in prev_sys_path:
            new_sys_path.append(item)
            sys.path.remove(item)
            sys.path[:0] = new_sys_path
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.test")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
