"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for PredefinedSearch model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.api.UserApi import UserResource
from corroborator_app.models import PredefinedSearch


import json
__all__ = ('PredefinedSearchResource', )

class PredefinedSearchResource(ModelResource):
    """
    tastypie api implementation
    """
    user = fields.ForeignKey(UserResource, 'user', null=True)
    class Meta:
        queryset = PredefinedSearch.objects.all()
        resource_name = 'predefinedSearch'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
    def hydrate(self, bundle):
        bundle.data['incident_filters'] =\
            json.dumps(bundle.data['incident_filters']) if 'incident_filters' in bundle.data else ''
        bundle.data['bulletin_filters'] =\
            json.dumps(bundle.data['bulletin_filters']) if 'bulletin_filters' in bundle.data else ''
        bundle.data['actor_filters'] =\
            json.dumps(bundle.data['actor_filters']) if 'actor_filters' in bundle.data else ''
        return bundle
