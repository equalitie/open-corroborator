"""
Author: Cormac McGuire
Date: 12/02/2014
Create api for actor condition
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication

from corroborator_app.models import ActorCondition

__all__ = ('ActorConditionResource', )


class ActorConditionResource(ModelResource):
    """
    tastypie api implementation
    """
    class Meta:
        queryset = ActorCondition.objects.all()
        resource_name = 'actorCondition'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
