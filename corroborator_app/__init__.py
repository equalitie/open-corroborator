"""
Author: Cormac
Date:
Create the assign user permissions - is this the right place??
"""
from django.contrib.auth.models import User, Permission
import django.contrib.auth.models as auth_models
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_syncdb  #todo remove

from django.apps import AppConfig
from django.db.models.signals import post_migrate


# Create the can_assign_user permission
def add_assign_permission(*args, **kwargs):
    content_type = ContentType.objects.get_for_model(User)
    permissions = [
        'can_assign_users',
        'can_delete_entities',
        'can_edit_entities',
        'can_edit_assigned_entities',
    ]
    labels = [
        'Can assign users via api',
        'Can delete entities via api',
        'Can edit entities via api',
        'Can edit assigned entities via api',
    ]
    for permission, label in zip(permissions, labels):
        create_permission(permission, label, content_type)


def create_permission(codename, label, content_type):
    po = Permission.objects.get_or_create(
        codename=codename,
        content_type=content_type
    )[0]
    po.name = label
    po.save()

#todo remove - deprecated: post_syncdb.connect(add_assign_permission, sender=auth_models)

default_app_config = 'corroborator_app.CorroboratorAppConfig'

class CorroboratorAppConfig(AppConfig):
    name = 'corroborator_app'
    
    def ready(self):
        post_migrate.connect(add_assign_permission, sender=auth_models)
