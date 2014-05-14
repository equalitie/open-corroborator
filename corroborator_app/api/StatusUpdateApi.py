"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for statusUpdate model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import StatusUpdate

__all__ = ('StatusUpdateResource', )

class StatusUpdateResource(ModelResource):
    """
    tastypie api implementation for statusUpdate model
    """
    class Meta:
        queryset = StatusUpdate.objects.all()
        resource_name = 'statusUpdate'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
