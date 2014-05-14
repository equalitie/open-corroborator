"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for label model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import Label

__all__ = ('LabelResource', )

class LabelResource(ModelResource):
    """
    tastypie api implementation for label model
    """
    class Meta:
        queryset = Label.objects.all()
        resource_name = 'label'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
