"""
Author: Bill Doran
Date: 05-06-2013
Create api for actor relationship model, requires apikey auth
tests in tests/api/tests.py
"""

from django.contrib.auth.models import User

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields
from tastypie.exceptions import ImmediateHttpResponse
from tastypie.http import HttpForbidden

import reversion

from corroborator_app.models import (
    ActorRelationship,
    Actor,
    ActorRole,
    VersionStatus,
    StatusUpdate
)
from corroborator_app.api.ActorConditionApi import ActorConditionResource
from corroborator_app.api.UserApi import UserResource
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.CommentApi import CommentResource
from corroborator_app.api.MediaApi import MediaResource
from corroborator_app.api.ApiMixin import APIMixin
from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta
from corroborator_app.tasks import update_object
from corroborator_app.utilities.apiValidationTool import ApiValidation

from corroborator_app.views.view_utils import can_assign_users, can_finalize

__all__ = ('ActorRelationshipResource', 'ActorResource', 'ActorRoleResource', )


class ActorResource(ModelResource, APIMixin):
    """
    tastypie api implementation
    """
    # foreign key fields
    condition = fields.ForeignKey(
        ActorConditionResource, 'condition', null=True)
    assigned_user = fields.ForeignKey(UserResource, 'assigned_user', null=True)
    POB = fields.ForeignKey(LocationResource, 'POB', null=True)
    current_location = fields.ForeignKey(
        LocationResource,
        'current_location',
        null=True
    )
    media = fields.ForeignKey(MediaResource, 'media', null=True)
    actors_role = fields.ManyToManyField(
        'corroborator_app.api.ActorRoleResource',
        'actors_role',
        null=True
    )
    actor_comments = fields.ManyToManyField(
        CommentResource,
        'actor_comments',
        null=True
    )

    class Meta:
        queryset = Actor.objects.all()
        resource_name = 'actor'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
        validation = ApiValidation()

    def obj_delete(self, bundle, **kwargs):
        username = bundle.request.GET['username']
        user = User.objects.filter(username=username)[0]

        with reversion.create_revision():
            bundle = super(ActorResource, self)\
                .obj_delete(bundle, **kwargs)
            reversion.add_meta(
                VersionStatus,
                status='deleted',
                user=user
            )
            reversion.set_user(user)
            reversion.set_comment('Deleted')
        update_object.delay(username)
        return bundle

    def obj_update(self, bundle, **kwargs):
        username = bundle.request.GET['username']
        user = User.objects.filter(username=username)[0]
        bundle.data['id'] = kwargs['pk']

        if self.can_edit(user, bundle, Actor) is False:
            raise ImmediateHttpResponse(
                HttpForbidden('You do not have permission to edit this entity')
            )

        if self.is_finalized(
            Actor,
            kwargs['pk'],
            'most_recent_status_actor'
        ) and can_finalize(user) is False:
            raise ImmediateHttpResponse(
                HttpForbidden('This item has been finalized')
            )

        if can_assign_users(user) is False and 'assigned_user' in bundle.data:
            del(bundle.data['assigned_user'])

        status_id = self.id_from_url(bundle.data)
        status_update = StatusUpdate.filter_by_perm_objects.get_update_status(
            user,
            status_id
        )
        comment_uri = self.create_comment(
            bundle.data['comment'],
            status_update.id,
            user
        )
        if "condition" not in bundle.data:
            bundle.data['condition'] = None
        if "POB" not in bundle.data:
            bundle.data['POB'] = None
        if "current_location" not in bundle.data:
            bundle.data['current_location'] = None
        try:
            bundle.data['actor_comments'].append(comment_uri)
        except KeyError:
            bundle.data['actor_comments'] = [comment_uri, ]

        with reversion.create_revision():
            bundle = super(ActorResource, self)\
                .obj_update(bundle, **kwargs)
            reversion.add_meta(
                VersionStatus,
                status='edited',
                user=user
            )
            reversion.set_user(user)
            reversion.set_comment(bundle.data['comment'])
        update_object.delay(username)
        return bundle

    def obj_create(self, bundle, **kwargs):
        '''
        created objects should automatically have a status of Human Created
        '''
        status_update = StatusUpdate.objects.get(status_en='Human Created')
        username = bundle.request.GET['username']
        user = User.objects.filter(username=username)[0]
        status_id = status_update.id

        if can_assign_users(user) is False and 'assigned_user' in bundle.data:
            del(bundle.data['assigned_user'])

        comment_uri = self.create_comment(
            bundle.data['comment'],
            status_id,
            user
        )
        bundle.data['actor_comments'] = [
            comment_uri
        ]
        with reversion.create_revision():
            bundle = super(ActorResource, self)\
                .obj_create(bundle, **kwargs)
            reversion.add_meta(
                VersionStatus,
                status='created',
                user=user
            )
            reversion.set_user(user)
            reversion.set_comment(bundle.data['comment'])
        update_object.delay(username)
        return bundle

    def dehydrate(self, bundle):
        fields = [
            'related_bulletins', 'related_incidents', 'count_incidents',
            'count_bulletins', 'roles', 'actors_role', 'actors',
            'thumbnail_url', 'actor_roles_status', 'most_recent_status_actor'
        ]
        actor_prep = ActorPrepMeta()
        for field in fields:
            prep_func = getattr(actor_prep, 'prepare_' + field)
            bundle.data[field] = prep_func(bundle.obj)
        return bundle


class ActorRoleResource(ModelResource):
    actor = fields.ForeignKey(ActorResource, 'actor', null=True)
    """
    tastypie api implementation
    """
    class Meta:
        queryset = ActorRole.objects.all()
        resource_name = 'actorRole'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
        validation = ApiValidation()


class ActorRelationshipResource(ModelResource):
    """
    tastypie api implementation for actor relationship model
    """
    actor = fields.ForeignKey(ActorResource, 'actor', null=True)

    class Meta:
        queryset = ActorRelationship.objects.all()
        resource_name = 'actorRelationship'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
        validation = ApiValidation()
