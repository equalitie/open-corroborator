from haystack import indexes
from corroborator_app.models import Incident
from celery_haystack.indexes import CelerySearchIndex

from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta
from corroborator_app.index_meta_prep.incidentPrepIndex import IncidentPrepMeta


class IncidentIndex(CelerySearchIndex, indexes.Indexable, IncidentPrepMeta):
    """
    This document handles the construction of the Incident Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    title_en = indexes.CharField(model_attr='title_en', null=True)
    title_ar = indexes.CharField(model_attr='title_ar', null=True)
    confidence_score = indexes.IntegerField(
        model_attr='confidence_score', null=True, faceted=True)
    incident_times = indexes.MultiValueField(faceted=True)
    locations = indexes.MultiValueField(faceted=True)
    incident_labels = indexes.MultiValueField(faceted=True)
    incident_assigned_user = indexes.CharField(
        default='unassigned',
        model_attr='assigned_user',
        faceted=True,
        null=True
    )


    # prepare functions for these can be found in IncidentPrepMeta
    count_actors = indexes.IntegerField()
    count_bulletins = indexes.IntegerField()
    count_incidents = indexes.IntegerField()

    assigned_user = indexes.CharField()
    most_recent_status_incident = indexes.CharField(faceted=True)
    incident_created = indexes.DateTimeField(
        model_attr='incident_created', faceted=True, null=True)
    incident_modified = indexes.DateTimeField(
        model_attr='incident_modified', faceted=True, null=True)
    incident_modified_date = indexes.DateField(faceted=True)
    incident_created_date = indexes.DateField(faceted=True)

    incident_searchable_locations = indexes.MultiValueField(faceted=True)
    resource_uri = indexes.CharField()

    incident_crimes = indexes.MultiValueField(faceted=True)
    crimes = indexes.MultiValueField()

    labels = indexes.MultiValueField()

    incident_confidence_bucket = indexes.CharField(faceted=True, null=True)

    """
    times = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    actors = indexes.MultiValueField()
    actor_roles_status = indexes.MultiValueField()


    incident_comments = indexes.MultiValueField()
    ref_bulletins = indexes.MultiValueField()
    ref_incidents = indexes.MultiValueField()
    incident_details_en = indexes.CharField(
        model_attr='incident_details_en', null=True)
    incident_details_ar = indexes.CharField(
        model_attr='incident_details_ar', null=True)
    """

    def get_model(self):
        return Incident

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

    def get_updated_field(self):
        return 'incident_modified'
