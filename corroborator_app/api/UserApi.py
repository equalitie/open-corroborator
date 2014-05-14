from django.contrib.auth.models import User
from tastypie import fields
from tastypie.resources import ModelResource, ALL_WITH_RELATIONS, ALL
from django.db import models
from tastypie.models import create_api_key, ApiKey
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import Authorization

#User creation api. Creates user and apikey
class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
        allowed_methods = ['get']
        models.signals.post_save.connect(create_api_key, sender=User)
        excludes = ['date_joined','id', 'is_active', 'is_staff', 'is_superuser', 'last_login','password',]
        filtering = {
            'email': ALL,
        }
