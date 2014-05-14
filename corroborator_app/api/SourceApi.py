"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for source model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import Source

__all__ = ('SourceResource', )

class SourceResource(ModelResource):
    """
    tastypie api implementation for source model
    """
    class Meta:
        queryset = Source.objects.all()
        resource_name = 'source'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

