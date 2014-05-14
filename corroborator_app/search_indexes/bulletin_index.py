from haystack import indexes
from corroborator_app.models import Bulletin
from celery_haystack.indexes import CelerySearchIndex

from corroborator_app.index_meta_prep.bulletinPrepIndex import BulletinPrepMeta
from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta


class BulletinIndex(CelerySearchIndex, indexes.Indexable, BulletinPrepMeta):
    """
    This document handles the construction of the Bulletin Solr document.
    """
    bulletin_type = indexes.CharField(
        faceted=True, model_attr='type', null=True)
    text = indexes.CharField(document=True, use_template=True)
    title_en = indexes.CharField(model_attr='title_en', null=True)
    title_ar = indexes.CharField(model_attr='title_ar', null=True)
    confidence_score = indexes.IntegerField(
        model_attr='confidence_score', null=True, faceted=True)
    type = indexes.CharField(model_attr='type', null=True)
    bulletin_times = indexes.MultiValueField(faceted=True, null=True)
    locations = indexes.MultiValueField(faceted=True)
    bulletin_labels = indexes.MultiValueField(faceted=True, null=True)
    bulletin_sources = indexes.MultiValueField(faceted=True, null=True)
    count_actors = indexes.IntegerField()
    bulletin_assigned_user = indexes.CharField(
        default="unassigned",
        model_attr='assigned_user',
        faceted=True,
        null=True
    )
    assigned_user = indexes.CharField()
    most_recent_status_bulletin = indexes.CharField(faceted=True, null=True)
    bulletin_created = indexes.DateTimeField(
        model_attr='bulletin_created', faceted=True, null=True)

    bulletin_modified = indexes.DateTimeField(
        model_attr='bulletin_modified', faceted=True, null=True)

    bulletin_modified_date = indexes.DateField(faceted=True)
    bulletin_created_date = indexes.DateField(faceted=True)
    bulletin_searchable_locations = indexes.MultiValueField(faceted=True, null=True)

    resource_uri = indexes.CharField()
    labels = indexes.MultiValueField()

    sources = indexes.MultiValueField()
    sources_count = indexes.IntegerField(faceted=True)
    bulletin_confidence_bucket = indexes.CharField(faceted=True, null=True)
    """
    times = indexes.MultiValueField()
    bulletin_imported_comments = indexes.MultiValueField()
    bulletin_comments = indexes.MultiValueField()
    ref_bulletins = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    actor_roles_status = indexes.MultiValueField()
    actors = indexes.MultiValueField()
    description_en = indexes.CharField(model_attr='description_en', null=True)
    description_ar = indexes.CharField(model_attr='description_ar', null=True)
    medias = indexes.MultiValueField()
    """
 
    def prepare_actors(self, object):
        """
        Returns an array of tastypi uris related to the Actor's
        associated actors
        """
        return ActorPrepMeta().prepare_actors(object)

    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_actors_role(object)

    def get_model(self):
        return Bulletin
