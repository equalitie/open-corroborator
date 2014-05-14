"""
This file handles the construction of Solr entities based on the existing MySQL
database model using Django Haystacks as an interface.
"""
from haystack import indexes
from corroborator_app.models import(
    Location,
    Media,
)
from celery_haystack.indexes import CelerySearchIndex
from django.conf import settings
from incident_index import IncidentIndex
from actor_index import ActorIndex
from bulletin_index import BulletinIndex


__all__ = [
    IncidentIndex, ActorIndex, BulletinIndex,
]


class MediaIndex(CelerySearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Media Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    name_en = indexes.CharField(model_attr='name_en', null=True)
    name_ar = indexes.CharField(model_attr='name_en', null=True)
    media_type = indexes.CharField(model_attr='media_type', null=True)
    media_created = indexes.DateTimeField(
        model_attr='media_created', faceted=True, null=True)
    media_file = indexes.CharField()
    resource_uri = indexes.CharField()
    media_thumb_file = indexes.CharField()
    media_file_type = indexes.CharField(
        model_attr="media_file_type", null=True)

    def get_model(self):
        return Media

    def prepare_media_file(self, object):
        """
        Returns URI of a given Media
        """
        #return object.get_uri()

        if (object.media_file.name != ''
                and object.media_file.name is not None):
            return settings.S3_URL + '/' + object.media_file.name
        else:
            ''

    def prepare_media_thumb_file(self, object):
        #return object.get_thumb_uri()
        if (object.media_thumb_file.name != ''
                and object.media_thumb_file.name is not None):
            return settings.S3_URL + '/' + object.media_thumb_file.name
        else:
            ''

    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this media instance
        for the tastypie api
        """
        return '/api/v1/media/{0}/'.format(object.id)


class LocationIndex(CelerySearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Location Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name_en', null=True)
    location_type = indexes.CharField(model_attr='loc_type', null=True)
    parent_text = indexes.CharField(model_attr='parent_text', null=True)
    location = indexes.LocationField(model_attr='get_location', null=True)

    def get_model(self):
        return Location

    def get_updated_field(self):
        return "location_modified"
