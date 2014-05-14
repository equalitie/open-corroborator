"""
Author: Bill Doran
Date: 15-08-2013
Create api for solr update model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from django.contrib.auth.models import User

from corroborator_app.models import MonitorUpdate
from corroborator_app.api.UserApi import UserResource

__all__ = ('MonitorUpdateResource',)


class MonitorUpdateResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')
    """
    tastypie api implementation
    """
    class Meta:
        queryset = MonitorUpdate.objects.all()
        resource_name = 'monitorUpdate'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def dehydrate(self, bundle):
        tempUser = User.objects.get(id=bundle.obj.user.id)
        bundle.data['update_username'] = tempUser.username
        return bundle
