"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for location model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import Location

__all__ = ('LocationResource', )


class LocationResource(ModelResource):
    """
    tastypie api implementation for location model
    """
    class Meta:
        queryset = Location.objects.all()
        resource_name = 'location'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
