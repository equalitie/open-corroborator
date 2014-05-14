"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for Incident model, requires apikey auth
tests in tests/api/tests.py
"""

from django.contrib.auth.models import User

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields
from tastypie.exceptions import ImmediateHttpResponse
from tastypie.http import HttpForbidden

from corroborator_app.api.ApiMixin import APIMixin
from corroborator_app.api.UserApi import UserResource
from corroborator_app.api.LabelApi import LabelResource
from corroborator_app.api.ActorRoleApi import ActorRoleResource
from corroborator_app.api.CommentApi import CommentResource
from corroborator_app.api.TimeInfoApi import TimeInfoResource
from corroborator_app.api.BulletinApi import BulletinResource
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.CrimeCategoryApi import CrimeCategoryResource

from corroborator_app.index_meta_prep.incidentPrepIndex import IncidentPrepMeta
from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta

from corroborator_app.tasks import update_object

from corroborator_app.views.view_utils import can_assign_users, can_finalize

import reversion

from corroborator_app.models import (
    Incident, Comment, StatusUpdate, VersionStatus
)

__all__ = ('IncidentResource', )


class IncidentResource(ModelResource, APIMixin):
    """
    tastypie api implementation for Incident model
    """
    # foreign key fields
    assigned_user = fields.ForeignKey(
        UserResource, 'assigned_user', blank=True, null=True)

    incident_comments = fields.ManyToManyField(
        CommentResource,
        'incident_comments',
        null=True
    )
    actors_role = fields.ManyToManyField(
        ActorRoleResource,
        'actors_role',
        null=True
    )
    crimes = fields.ManyToManyField(CrimeCategoryResource, 'crimes', null=True)
    labels = fields.ManyToManyField(LabelResource, 'labels', null=True)
    times = fields.ManyToManyField(TimeInfoResource, 'times', null=True)
    locations = fields.ManyToManyField(
        LocationResource, 'locations', null=True)
    ref_incidents = fields.ManyToManyField('self', 'ref_incidents', null=True)
    ref_bulletins = fields.ManyToManyField(
        BulletinResource,
        'ref_bulletins',
        null=True
    )

    class Meta:
        queryset = Incident.objects.all()
        resource_name = 'incident'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def obj_delete(self, bundle, **kwargs):
        username = bundle.request.GET['username']
        user = User.objects.filter(username=username)[0]

        with reversion.create_revision():
            bundle = super(IncidentResource, self)\
                .obj_delete(bundle, **kwargs)
            reversion.add_meta(
                VersionStatus,
                user=user,
                status='deleted'
            )
            reversion.set_user(user)
            reversion.set_comment('Deleted')
        update_object.delay(username)
        return bundle

    def create_comment(self, comment, status_id, user):
        comment = Comment(
            assigned_user_id=user.id,
            comments_en=comment,
            status_id=status_id
        )
        comment.save()
        comment_uri = '/api/v1/comment/{0}/'.format(comment.id)

        return comment_uri

    def obj_update(self, bundle, **kwargs):
        username = bundle.request.GET['username']

        user = User.objects.filter(username=username)[0]
        if self.is_finalized(
            Incident,
            kwargs['pk'],
            'most_recent_status_incident'
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
        try:
            bundle.data['incident_comments'].append(comment_uri)
        except KeyError:
            bundle.data['incident_comments'] = [comment_uri, ]

        with reversion.create_revision():
            bundle = super(IncidentResource, self)\
                .obj_update(bundle, **kwargs)
            reversion.add_meta(
                VersionStatus,
                user=user,
                status='edited'
            )
            reversion.set_user(user)
            reversion.set_comment(bundle.data['comment'])
        update_object.delay(username)
        return bundle

    def obj_create(self, bundle, **kwargs):
        username = bundle.request.GET['username']
        user = User.objects.filter(username=username)[0]
        status_update = StatusUpdate.objects.get(status_en='Human Created')

        if can_assign_users(user) is False and 'assigned_user' in bundle.data:
            del(bundle.data['assigned_user'])

        comment_uri = self.create_comment(
            bundle.data['comment'],
            status_update.id,
            user
        )
        bundle.data['incident_comments'] = [
            comment_uri
        ]

        with reversion.create_revision():
            bundle = super(IncidentResource, self)\
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
            'incident_locations', 'incident_labels', 'incident_times',
            'incident_crimes', 'most_recent_status_incident', 'count_actors',
            'count_bulletins', 'count_incidents', 'actor_roles_status',
            'actors', 'actors_role',
        ]

        incident_prep_instance = IncidentPrepMeta()

        for field in fields:
            prep_func = getattr(incident_prep_instance, 'prepare_' + field)
            bundle.data[field] = prep_func(bundle.obj)

        if bundle.data['confidence_score'] is None:
            bundle.data['confidence_score'] = ''
        return bundle
