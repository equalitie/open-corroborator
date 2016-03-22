# coding=utf-8
"""
encoding must be utf-8 to allow inline arabic
no longer necessary

This file describes the Model entities and their relations for the Corroborator
application.
TODO: split into different model modules

Author: Bill Doran
2013/02/01
"""

from django.utils.translation import ugettext as _
from django.core import serializers
import json

from django.utils import translation
from django.contrib.auth.signals import user_logged_out, user_logged_in
from django.db.models.signals import post_save
from django.conf import settings
from django.contrib.sessions.models import Session
from django.db import models
from django.db.models import Min, Max
from django.db.models import Q

from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime
from haystack.utils.geo import Point

from reversion.models import Revision

from django.core.files.storage import default_storage
from queued_storage.backends import QueuedStorage

#from corroborator_app.index_meta_prep.actorPrepIndex import(
    #ActorBootstrapManager
#)
#from corroborator_app.index_meta_prep.bulletinPrepIndex import BulletinManager


def lang_helper(object_instance, field):
    '''
    helper method to select the correct language version of a model field
    '''
    lang_string = translation.get_language()
    return pick_attribute(object_instance, field, lang_string)


def pick_attribute(object_instance, field, locale):
    try:
        trans = getattr(object_instance, field + '_' + locale)
        if trans is not None and trans is not u'':
            return trans
        return getattr(object_instance, field + '_en')
    except AttributeError:
        return getattr(object_instance, field + '_en')


class UserLog(models.Model):
    user = models.ForeignKey(User, null=True, blank=True)
    login = models.DateTimeField(null=True, blank=True)
    logout = models.DateTimeField(null=True, blank=True)
    total_seconds = models.FloatField(null=True, blank=True)


class VersionStatus(models.Model):
    """
    TODO - add docstring
    """
    revision = models.OneToOneField(Revision)  # This is required
    status = models.CharField(max_length=255)
    user = models.ForeignKey(User, null=True, blank=True)
    version_timestamp = models.DateTimeField(auto_now=True)


class SolrUpdate(models.Model):
    """
    Store most recent solr index update
    used by the UI to poll for newest updates
    """
    user = models.ForeignKey(User)
    update_timestamp = models.DateTimeField(auto_now=True)


class MonitorUpdate(models.Model):
    """
    Store most recent monitor update
    used by the UI to poll for newest updates
    """
    user = models.ForeignKey(User)
    update_timestamp = models.DateTimeField(auto_now=True)


class PredefinedSearch(models.Model):
    """
    This object stores past searches for a given user as a URL string
    that represents all filters applied for a given search type.
    """
    user = models.ForeignKey(User, null=True, blank=True)
    search_title = models.TextField(null=True, blank=True)
    search_string = models.TextField(null=True, blank=True)
    actor_filters = models.TextField(null=True, blank=True)
    incident_filters = models.TextField(null=True, blank=True)
    bulletin_filters = models.TextField(null=True, blank=True)
    make_global = models.BooleanField(default=False)


class ActorStatus(models.Model):
    """
    This object represents an actor. It records the
    the current state of a given Actor entity.
    """
    status_en = models.CharField(max_length=255)
    status_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return self.status_en


class EventType(models.Model):
    """
    This object represents an event type. It records the
    the type of event represented by a given detail entity.
    """
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return self.name_en


class PermStatusUpdateManager(models.Manager):
    special_status_keys = [
        'm_created', 'h_created', 'reviewed', 'updated', 'finalized', ]

    def available_statuses(self, user):
        '''
        return a list of the available statuses, allows for users to have
        more that one group
        '''
        groups = {
            'data-analyst': ['updated'],
            'senior-data-analyst': ['updated', 'reviewed', ],
            'chief-data-analyst': ['updated', 'reviewed', 'finalized', ],
        }

        status_keys = []
        try:
            for group in user.groups.all():
                status_keys = status_keys + groups[group.name]
        except KeyError:
            status_keys = []

        status_keys = set(status_keys)

        return StatusUpdate.objects.filter(
            Q(key__in=status_keys) | ~Q(key__in=self.special_status_keys)
        )

    def get_update_status(self, user, requested_status_id):
        '''
        return the status that the user may update to, so if a user tries to
        update to finalized and may not, just return the updated status
        '''
        queryset = super(PermStatusUpdateManager, self).get_queryset()
        requested_status = queryset.get(id=requested_status_id)
        has_perm = False
        for group in user.groups.all():
            has_perm = has_perm or self.has_perm_for_status_requested(
                group,
                requested_status.key)

        if has_perm:
            return requested_status

        else:
            return queryset.filter(id=3)[0]

    def has_perm_for_status_requested(self, group, key):
        '''
        check that the user can update the entity based on permissions
        set
        '''
        if key not in self.special_status_keys:
            return True

        perm_status_map = {
            'updated': 'can_update',
            'reviewed': 'can_update_to_reviewed',
            'finalized': 'can_update_to_finalized'
        }
        try:
            codename = perm_status_map[key]
            return len(group.permissions.filter(codename=codename)) == 1
        except KeyError:
            return True


class StatusUpdate(models.Model):
    """
    This object represents a comment status update. It records the
    the change in state of a Bulletin or Incident based on a user's
    actions.
    """
    key = models.CharField(max_length=20)
    status_en = models.CharField(max_length=255)
    status_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, null=True, blank=True)
    objects = models.Manager()
    filter_by_perm_objects = PermStatusUpdateManager()

    @property
    def name(self):
        return lang_helper(self, 'status')

    @property
    def comment_status(self):
        return lang_helper(self, 'status')

    @property
    def description(self):
        return lang_helper(self, 'description')

    def __unicode__(self):
        return self.status_en

    class Meta:
        permissions = (
            ("can_update_to_finalized", "Can finalize an entity"),
            ("can_update", "Can update"),
            ("can_update_to_reviewed", "Can review and entity"),
        )


class Comment(models.Model):
    """
    This object represents a system comment and acts as part of the
    systems audit trail. It can be related to either Bulletins or Incidents.
    """
    assigned_user = models.ForeignKey(User)
    status = models.ForeignKey(StatusUpdate, blank=True, null=True)
    comments_en = models.TextField(blank=True)
    comments_ar = models.TextField(blank=True, null=True)
    comment_created = models.DateTimeField(auto_now_add=True)

    @property
    def comment(self):
        return lang_helper(self, 'comment')

    class Meta:
        """
        This class is used by Django Haystack in construction of
        the Solr index to determine sort order for returned results.
        """
        ordering = ['comment_created']
    #def __unicode__(self):
        #desc = self.comments_en
        #return desc
        #print self.status
        #if self.status:
            #desc = '[0] - [1]'.format(self.comments_en, self.status.status_en)

        #return desc


class Location(models.Model):
    """
    This object represents a geographical location. It is possible for
    locations to be linked together as a hierarchical chain in order
    to represent sub regions,  provinces,  towns,  cities,  etc.
    """
    LOC_TYPE = (
        ('G', 'Governates'),
        ('D', 'Districts'),
        ('S', 'Subdistricts'),
    )
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    loc_type = models.CharField(
        'location type', max_length=25, choices=LOC_TYPE)
    parent_text = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    parent_location = models.ForeignKey(
        'self', max_length=255, blank=True, null=True)
    location_created = models.DateTimeField(auto_now_add=True, null=True)
    location_modified = models.DateTimeField(auto_now=True, null=True)
    objects = models.Manager()

    @property
    def name(self):
        return lang_helper(self, 'name')

    @property
    def label(self):
        return lang_helper(self, 'name')

    @property
    def description(self):
        return lang_helper(self, 'description')

    def __unicode__(self):
        return self.name_en

    def get_location(self):
        """
        This method is utilised by Django Haystack in
        construction of the Solr index.
        It is responsible for converting the lat/long into a single
        geo point.
        """
        return Point(self.longitude,  self.latitude)


class TimeInfo(models.Model):
    """
    This object captures the time aspect of an event for
    either a Bulletin or Incident/
    """
    time_from = models.DateTimeField(blank=True, null=True)
    time_to = models.DateTimeField(blank=True, null=True)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    event_name_en = models.CharField(
        'event name en', max_length=255, blank=True, null=True)
    event_name_ar = models.CharField(
        'event name ar', max_length=255, blank=True, null=True)
    confidence_score = models.IntegerField(null=True, blank=True)
    event_location = models.ForeignKey(
        Location, blank=True, null=True)
    event_type = models.ForeignKey(
        EventType, blank=True, null=True)

    def __unicode__(self):
        return self.event_name_en


class Label(models.Model):
    """
    This object represents a label tag. it can be applied to either
    a Bulletin or Incident. Multiple labels can be interlinked as
    a chained hierarchy.
    """
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    ref_label = models.ForeignKey('self', blank=True, null=True)

    @property
    def name(self):
        return lang_helper(self, 'name')

    def __unicode__(self):
        return self.name_en


class CrimeCategory(models.Model):
    """
    This object represents a crime category. Multiple crime categories
    can be interlinked as an hierarchical chain.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    level = models.IntegerField(blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    ref_crime = models.ForeignKey('self', blank=True, null=True)
    parent = models.CharField(max_length=255, blank=True, null=True)

    @property
    def description(self):
        return lang_helper(self, 'description')

    @property
    def name(self):
        return lang_helper(self, 'name')

    def __unicode__(self):
        return self.name_en


class SourceType(models.Model):
    """
    This object stores the type of a given source.
    """
    source_type = models.CharField('source type', max_length=255)
    description = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return self.source_type


class Source(models.Model):
    """
    This object identifies a Bulletin's source. This can be of multiple types
    news media, social media, witness statements etc.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    reliability_score = models.IntegerField(
        'reliability score', blank=True)
    source_type = models.ForeignKey(SourceType, blank=True, null=True)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    ref_source = models.ForeignKey('self', blank=True, null=True)

    @property
    def comments(self):
        return lang_helper(self, 'comments')

    @property
    def name(self):
        return lang_helper(self, 'name')

    def __unicode__(self):
        return self.name_en


class Dialect(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Dialects for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)

    @property
    def comments(self):
        return lang_helper(self, 'comments')

    @property
    def name(self):
        return lang_helper(self, 'name')


class Position(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Positions for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)

    @property
    def description(self):
        return lang_helper(self, 'description')

    @property
    def name(self):
        return lang_helper(self, 'name')


class Occupation(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Occupations for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)

    @property
    def description(self):
        return lang_helper(self, 'description')

    @property
    def name(self):
        return lang_helper(self, 'name')


class Ethnicity(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Ethnicities for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)

    @property
    def description(self):
        return lang_helper(self, 'description')

    @property
    def name(self):
        return lang_helper(self, 'name')


class Religion(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Religions for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)

    @property
    def description(self):
        return lang_helper(self, 'description')

    @property
    def name(self):
        return lang_helper(self, 'name')


class Nationality(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Nationalities for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)

    @property
    def description(self):
        return lang_helper(self, 'description')

    @property
    def name(self):
        return lang_helper(self, 'name')


class Media(models.Model):
    """
    The Media object captures represents and individual piece of
    media evidence that can be related to Bulletins.
    """
    if settings.QUEUED_STORAGE:
        #Setup Boto AWS storage access system
        fstorage = QueuedStorage(
            'django.core.files.storage.FileSystemStorage',  #note: local 
            'storages.backends.s3boto.S3BotoStorage',       #note: remote
            task='queued_storage.tasks.Transfer',           #note: TransferAndDelete would remove the local copy
        )
    else:
        fstorage = default_storage

    TYPE = (
        ('Video', 'video'),
        ('Picture', 'picture'),
        ('Document', 'document'),
    )
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    media_file = models.FileField(upload_to='media', storage=fstorage)
    media_thumb_file = models.FileField(upload_to='media', storage=fstorage, null=True)
    media_type = models.CharField('type', max_length=25, choices=TYPE)
    media_created = models.DateTimeField(auto_now_add=True)
    media_file_type = models.CharField(max_length=255, blank=True, null=True)
    media_created = models.DateTimeField(auto_now_add=True)

    @property
    def name(self):
        return lang_helper(self, 'name')

    def get_uri(self):
        """
        Return AWS Media file URL.
        This method is primarily used by Django Haystack
        when populating the Solr index.
        """

        return self.media_file.url

    def get_thumb_uri(self):
        """
        Return AWS Media file URL.
        This method is primarily used by Django Haystack
        when populating the Solr index.
        """
        if self.media_thumb_file.name:
            return self.media_thumb_file.url
        else:
            return ''


class ActorBootstrapManager(models.Manager):
    '''
    format the actors for bootstrapping to make them compatible with tastypie
    api calls
    '''

    def filter(self, *args, **kwargs):
        results = super(ActorBootstrapManager, self).filter(*args, **kwargs)
        # do something with results
        fields = [
            'related_bulletins', 'related_incidents', 'count_incidents',
            'count_bulletins', 'roles', 'actors_role', 'actors',
            'thumbnail_url', 'actor_roles_status', 'most_recent_status_actor',
            'POB', 'current_location', 'actor_comments', 'assigned_user',
            'resource_uri',
        ]
        from corroborator_app.index_meta_prep.actorPrepIndex import (
            ActorPrepMeta
        )
        actor_prep = ActorPrepMeta()
        bootstrap_results = []
        for result in results:
            updated_actor = serializers.serialize('json', [result])
            updated_actor = json.loads(updated_actor)[0]['fields']
            updated_actor['id'] = result.id
            for field in fields:
                prep_func = getattr(actor_prep, 'prepare_' + field)
                updated_actor[field] = prep_func(result)
            bootstrap_results.append(updated_actor)
        return bootstrap_results


class ActorCondition(models.Model):
    """
    What is the condition of the Actor
    """
    name_en = models.CharField(max_length=25)
    name_ar = models.CharField(max_length=25)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    key = models.CharField(max_length=8, unique=True)

    @property
    def name(self):
        return lang_helper(self, 'name')


class Actor(models.Model):
    """
    This object captures the unique properties of an individual Actor
    """
    AGE_TYPE = (
        ('Adult', _('adult')),
        ('Child', _('child')),
    )
    SEX_TYPE = (
        ('Female', _('female')),
        ('Male', _('male')),
    )
    CIVILIAN_TYPE = (
        ('Civilian', _('Civilian')),
        ('Non-civilian', _('Non-civilian')),
        ('Police', _('Police')),
    )
    objects = models.Manager()
    bootstrap_actors = ActorBootstrapManager()

    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, default='')

    seq_order = models.IntegerField(blank=True, null=True)
    fullname_en = models.CharField(max_length=255)
    fullname_ar = models.CharField(max_length=255, blank=True)
    nickname_en = models.CharField(max_length=255, blank=True, null=True)
    nickname_ar = models.CharField(max_length=255, blank=True, null=True)

    # these are the fields that should be the same across languages
    # each one has a property that will return the correct version for the
    # selected locale
    age = models.CharField(
        max_length=255,
        choices=AGE_TYPE,
        blank=True,
        db_column='age_en',
    )

    sex = models.CharField(
        max_length=255,
        choices=SEX_TYPE,
        blank=True,
        db_column='sex_en',
    )

    civilian = models.CharField(
        max_length=255,
        choices=CIVILIAN_TYPE,
        blank=True,
        db_column='civilian_en'
    )

    # these probably need to reference a separate model
    occupation_en = models.CharField(max_length=255, blank=True, null=True)
    occupation_ar = models.CharField(max_length=255, blank=True, null=True)
    nationality_en = models.CharField(max_length=255, blank=True, null=True)
    nationality_ar = models.CharField(max_length=255, blank=True, null=True)
    position_en = models.CharField(max_length=255, blank=True, null=True)
    position_ar = models.CharField(max_length=255, blank=True, null=True)
    ethnicity_en = models.CharField(max_length=255, blank=True, null=True)
    ethnicity_ar = models.CharField(max_length=255, blank=True, null=True)
    religion_en = models.CharField(max_length=255, blank=True, null=True)
    religion_ar = models.CharField(max_length=255, blank=True, null=True)
    spoken_dialect_en = models.CharField(max_length=255, blank=True, null=True)
    spoken_dialect_ar = models.CharField(max_length=255, blank=True, null=True)
    family_status_en = models.CharField(max_length=255, blank=True, null=True)
    family_status_ar = models.CharField(max_length=255, blank=True, null=True)
    cause_of_death_en = models.CharField(max_length=255, blank=True, null=True)
    cause_of_death_ar = models.CharField(max_length=255, blank=True, null=True)
    legal_status_en = models.CharField(max_length=255, blank=True, null=True)
    legal_status_ar = models.CharField(max_length=255, blank=True, null=True)
    health_status_en = models.CharField(max_length=255, blank=True, null=True)
    health_status_ar = models.CharField(max_length=255, blank=True, null=True)

    times = models.ManyToManyField(TimeInfo, blank=True)
    DOB = models.DateField('date of birth', blank=True, null=True)
    date_of_death = models.DateField('date of death', blank=True, null=True)
    date_of_disappearance = models.DateField(
        'date of disappearance', blank=True, null=True)
    date_of_return = models.DateField('date of return', blank=True, null=True)
    date_of_detention = models.DateField(
        'date of detention', blank=True, null=True)

    origin_id = models.CharField(max_length=255, blank=True, null=True)
    age_numeric = models.IntegerField(blank=True, null=True)
    family_name_en = models.CharField(max_length=255, blank=True, null=True)
    family_name_ar = models.CharField(max_length=255, blank=True, null=True)
    national_id_card = models.CharField(max_length=255, blank=True, null=True)
    national_number = models.CharField(max_length=255, blank=True, null=True)

    """
    This field tracks whether the entitiy has been deleted and should thus be
    ignored by the UI
    """
    deleted = models.BooleanField(default=False)
    actor_comments = models.ManyToManyField(Comment, blank=True)

    # Foreign Keys
    #actor_status = models.ForeignKey(ActorStatus, blank=True, null=True)
    condition = models.ForeignKey(ActorCondition, blank=True, null=True)
    assigned_user = models.ForeignKey(User, blank=True, null=True)
    actors_role = models.ManyToManyField(
        'ActorRole', blank=True, related_name='actors_role')
    POB = models.ForeignKey(
        Location, blank=True, null=True, related_name='POB')
    place_of_death = models.ForeignKey(
        Location, blank=True, null=True, related_name='place_of_death')
    current_location = models.ForeignKey(
        Location, blank=True, null=True, related_name='actor_current')
    disappearance_location = models.ForeignKey(
        Location, blank=True, null=True)

    media = models.ForeignKey(Media, blank=True, null=True)
    actor_created = models.DateTimeField(auto_now_add=True)
    actor_modified = models.DateTimeField(auto_now=True)

    labels = models.ManyToManyField(Label, blank=True)
    sources = models.ManyToManyField(Source, blank=True)

    def __unicode__(self):
        return self.fullname_en

    def most_recent_update_by(self):
        """
        Returns the id of the las user you created an update
        for the given Actor
        """
        user_id = self.actor_comments.values('status__user')\
            .order_by('-comment_created')
        return user_id

    def count_bulletins(self):
        """
        This method returns the number of associated Bulletins for a given
        Actor. It is used by Django Haystack in construction of the Solr Index.
        """
        roles = self.ActorRole_set.all()
        return Bulletin.objects.filter(actors_role__in=roles).count()

    def count_incidents(self):
        """
        This method returns the number of associated Incidents for a given
        Actor. It is used by Django Haystack in construction of the Solr Index.
        """
        roles = self.ActorRole_set.all()
        return Incident.objects.filter(actors_role__in=roles).count()

    def most_recent_status_actor(self):
        """
        This method returns the most recent status for a given Bulletin event.
        It is used by Django Haystack in construction of the Solr Index.
        """
        status = self.actor_comments.values('status__status_en')\
            .order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''


class ActorRelationship(models.Model):
    """
    The Actor Relationship model captures the interrelation between actors.
    This can include shared events, familial connections, insititutional
    relationships or rank.
    """
    RELATION = (
        ('Parent', 'parent'),
        ('Sibling', 'sibling'),
        ('Family member', 'family member'),
        ('Superior officer', 'superior officer'),
        ('Subordinate officer', 'subordiante officer'),
    )
    relation_status = models.CharField(
        'status', max_length=25, choices=RELATION)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    actor = models.ForeignKey(
        Actor, blank=True, null=True, related_name='actor_b')

    def __unicode__(self):
        return self.actor.fullname_en + ': ' + self.relation_status


class RoleType(models.Model):
    """
    This object stores RoleTypes
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class RelationType(models.Model):
    """
    This object stores RelationTypes
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class ActorRole(models.Model):
    """
    This object model captures the role of a given actor
    in relation to either an Incident or a Bulletin.
    """
    ROLE_STATUS = (
        ('V', 'Victim'),
        ('WN', 'Witness'),
        ('P', 'Perpetrator'),
        ('A', 'Appeared'),
        ('O', 'Other'),
    )
    RELATION = (
        ('P', 'Parent'),
        ('S', 'Sibling'),
        ('FM', 'Family member'),
        ('SPO', 'Superior officer'),
        ('SBO', 'Subordinate officer'),
    )

    role_en = models.CharField(
        max_length=255,
        blank=True,
        null=True)
    role_ar = models.CharField(
        max_length=255,
        blank=True,
        null=True)
    role_status = models.CharField(
        'status',
        max_length=25,
        choices=ROLE_STATUS,
        blank=True,
        null=True
    )

    relation_status = models.CharField(
        'status',
        max_length=25,
        choices=RELATION,
        blank=True,
        null=True
    )
    role = models.ForeignKey(RoleType, blank=True, null=True)
    relation = models.ForeignKey(RelationType, blank=True, null=True)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    actor = models.ForeignKey(Actor, blank=True, null=True)

    def __unicode__(self):
        if self.relation_status is not None:
            return str(self.id) + ': ' + self.relation_status\
                + ': ' + str(self.actor.id)
        else:
            return str(self.id) + ': ' + self.role_status\
                + ': ' + str(self.actor.id)


class BulletinBootstrapManager(models.Manager):
    '''
    format the actors for bootstrapping to make them compatible with tastypie
    api calls
    '''

    def filter(self, *args, **kwargs):
        results = super(BulletinBootstrapManager, self).filter(*args, **kwargs)
        # do something with results
        bulletin_fields = [
            'bulletin_comments', 'bulletin_imported_comments',
            'bulletin_locations', 'bulletin_labels',
            'bulletin_sources', 'most_recent_status_bulletin',
            'count_actors', 'actor_roles_status', 'ref_incidents',
            'assigned_user', 'sources_count', 'times', 'ref_bulletins',
            'locations', 'labels', 'sources', 'medias', 'resource_uri',
        ]
        actor_fields = ['actors', 'actors_role', ]
        from corroborator_app.index_meta_prep.bulletinPrepIndex import (
            BulletinPrepMeta)
        from corroborator_app.index_meta_prep.actorPrepIndex import (
            ActorPrepMeta
        )
        bulletin_prep = BulletinPrepMeta()
        actor_prep = ActorPrepMeta()
        bootstrap_results = []
        for result in results:
            updated_bulletin = serializers.serialize('json', [result])
            updated_bulletin = json.loads(updated_bulletin)[0]['fields']
            updated_bulletin['id'] = result.id
            for field in bulletin_fields:
                prep_func = getattr(
                    bulletin_prep,
                    'prepare_' + field
                )
                updated_bulletin[field] = prep_func(result)
            for field in actor_fields:
                prep_func = getattr(
                    actor_prep,
                    'prepare_' + field
                )
                updated_bulletin[field] = prep_func(result)
            if updated_bulletin['confidence_score'] is None:
                updated_bulletin['confidence_score'] = ''
            bootstrap_results.append(updated_bulletin)
        return bootstrap_results


class Bulletin(models.Model):
    """
    This model represents the Bulletin object. It is intended
    to capture the relationship specifically between Media objects,
    chronological events and Actors' roles.
    """
    TYPE = (
        ('Video', 'video'),
        ('Picture', 'picture'),
        ('Report', 'report'),
        ('News', 'news'),
    )
    objects = models.Manager()
    bootstrap_bulletins = BulletinBootstrapManager()

    seq_order = models.IntegerField(blank=True, null=True)
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255, blank=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, default='')
    uri = models.CharField('Media Link', max_length=255, blank=True, null=True)
    confidence_score = models.IntegerField(
        'confidence score', blank=True, null=True)
    type = models.CharField('type', max_length=25, choices=TYPE, blank=True)
    bulletin_created = models.DateTimeField(auto_now_add=True)
    bulletin_modified = models.DateTimeField(auto_now=True)

    origin_id = models.CharField(max_length=255, blank=True, null=True)
    """
    This field tracks whether the entitiy has been deleted and should thus be
    ignored by the UI
    """
    deleted = models.BooleanField(default=False)

    # foreign key fields
    assigned_user = models.ForeignKey(User, blank=True, null=True)

    # ManyToManyFields
    sources = models.ManyToManyField(Source, blank=True)
    bulletin_comments = models.ManyToManyField(Comment, blank=True)
    bulletin_imported_comments = models.ManyToManyField(
        Comment,
        blank=True,
        related_name="bulletin_imported_comments"
    )
    labels = models.ManyToManyField(Label, blank=True)
    times = models.ManyToManyField(TimeInfo, blank=True)

    actors_role = models.ManyToManyField(ActorRole, blank=True)
    medias = models.ManyToManyField(Media, blank=True)
    locations = models.ManyToManyField(Location, blank=True)
    ref_bulletins = models.ManyToManyField('self', blank=True)

    def __unicode__(self):
        return self.title_en

    def get_time_length(self):
        """
        This method returns the time range for a given Bulletin event.
        It is used by Django Haystack in construction of the Solr Index.
        TODO: this is common to more than one model - extract it to a
              method
        """
        time = self.times.aggregate(
            lowest=Min('time_from'), highest=Max('time_to'))
        string = ''

        if(len(time) > 0):
            if time["lowest"] is not None and time["highest"] is not None:
                duration = (time["lowest"] - time["highest"]).days
                date_length = time["highest"].strftime('%Y/%m/%d') + '&rarr;'\
                    + time["lowest"].strftime('%Y/%m/%d')
                string = '<span class="date">{0}</span>' +\
                    '<span class="duration">({1} days)</span>'
                string = string.format(date_length, str(duration))
        return string

    def most_recent_update_by(self):
        """
        Returns the id of the las user you created an update for the
        given Bulletin
        """
        user_id = self.bulletin_comments.values('status__user')\
            .order_by('-comment_created')
        return user_id

    def most_recent_status_bulletin(self):
        """
        This method returns the most recent status for a given Bulletin event.
        It is used by Django Haystack in construction of the Solr Index.
        """

        status = self.bulletin_comments.values('status__status_en')\
            .order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''


class Incident(models.Model):
    """
    This class defined the Incident object Model. The
    object is intended to capture the meta level relationship between
    Bulletins, Actors and Events.
    """
    incident_details_en = models.TextField(blank=True, null=True)
    incident_details_ar = models.TextField(blank=True, null=True)
    confidence_score = models.IntegerField(
        'confidence score', blank=True, null=True)
    title_en = models.TextField()
    title_ar = models.TextField(blank=True)
    incident_created = models.DateTimeField(auto_now_add=True)
    incident_modified = models.DateTimeField(auto_now=True)

    assigned_user = models.ForeignKey(User, blank=True, null=True)

    incident_comments = models.ManyToManyField(Comment, blank=True)
    ref_bulletins = models.ManyToManyField(Bulletin, blank=True)
    actors_role = models.ManyToManyField(ActorRole, blank=True)
    crimes = models.ManyToManyField(CrimeCategory, blank=True)
    labels = models.ManyToManyField(Label, blank=True)
    times = models.ManyToManyField(TimeInfo, blank=True)
    locations = models.ManyToManyField(Location, blank=True)
    ref_incidents = models.ManyToManyField('self', blank=True)
    """
    This field tracks whether the entitiy has been deleted and should thus be
    ignored by the UI
    """
    deleted = models.BooleanField(default=False)

    def __unicode__(self):
        return self.title_en

    def get_time_length(self):
        """
        This method returns the time range for a given Incident event.
        It is used by Django Haystack in construction of the Solr Index.
        """
        time = self.times.aggregate(
            lowest=Min('time_from'), highest=Max('time_to'))
        string = ''

        if(len(time) > 0):
            if time["lowest"] is not None and time["highest"] is not None:
                duration = (time["highest"] - time["lowest"]).days
                date_duration = time["lowest"].strftime('%Y/%m/%d') + '&rarr;'\
                    + time["highest"].strftime('%Y/%m/%d')
                string = '<span class="date">{0}</span>' +\
                    '<span class="duration">({1} days)</span>'
                string = string.format(date_duration, str(duration))
        return string

    def most_recent_update_by(self):
        """
        Returns the id of the las user you created an update for
        the given Incident
        """
        user_id = self.incident_comments.values('status__user')\
            .order_by('-comment_created')
        return user_id

    def most_recent_status_incident(self):
        """
        This method returns the most recent status for a given Incident event.
        It is used by Django Haystack in construction of the Solr Index.
        """
        status = self.incident_comments.values(
            'status__status_en').order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''
def update_last_logout(sender, request, user, **kwargs):
    """
    A signal receiver which updates the last_logout date for
    the user logging out.
    """
    logout_timestamp = timezone.now()
    if 'lastRequest' in request.session:
        logout_timestamp = request.session['lastRequest']
        del request.session['lastRequest'] 
        

    ul = UserLog( )
    ul.login = user.last_login
    ul.logout = logout_timestamp
    try:
        logged_time = logout_timestamp - user.last_login
        ul.total_seconds = logged_time.total_seconds()
    except:
        pass  #avoid #20 error for now: TypeError: unsupported operand type(s) for -: 'datetime.datetime' and 'NoneType'
    ul.user = user
    ul.save()

user_logged_out.connect(update_last_logout)
