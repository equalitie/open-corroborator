"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for sourceType model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import SourceType

__all__ = ('SourceTypeResource', )

class SourceTypeResource(ModelResource):
    """
    tastypie api implementation for sourceType model
    """
    class Meta:
        queryset = SourceType.objects.all()
        resource_name = 'sourceType'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
