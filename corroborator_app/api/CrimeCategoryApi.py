"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for crimeCategory model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import CrimeCategory

__all__ = ('CrimeCategoryResource', )

class CrimeCategoryResource(ModelResource):
    """
    tastypie api implementation for crimeCategory model
    """
    class Meta:
        queryset = CrimeCategory.objects.all()
        resource_name = 'crimeCategory'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
