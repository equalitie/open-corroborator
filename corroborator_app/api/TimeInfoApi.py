"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for TimeInfo model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import TimeInfo

__all__ = ('TimeInfoResource', )

class TimeInfoResource(ModelResource):
    """
    tastypie api implementation for TimeInfo model
    """
    class Meta:
        queryset = TimeInfo.objects.all()
        resource_name = 'timeInfo'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
