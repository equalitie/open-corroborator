from haystack import indexes
from corroborator_app.models import Actor
from celery_haystack.indexes import CelerySearchIndex

from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta



class ActorIndex(CelerySearchIndex, indexes.Indexable, ActorPrepMeta):
    """
    This class manages the construction of the Actor Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    dob = indexes.DateField(model_attr='DOB', null=True, faceted=True)
    #Field removed to reduce size of solr index
    """
    description_en = indexes.CharField(model_attr='description_en', null=True)
    description_ar = indexes.CharField(model_attr='description_ar', null=True)
    actor_comments = indexes.MultiValueField()
    actor_entity_role = indexes.MultiValueField(faceted=True)
    actor_entity_relation = indexes.MultiValueField(faceted=True)
    roles = indexes.MultiValueField()
    actor_roles_status = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    actors = indexes.MultiValueField()
    media = indexes.CharField()
    related_bulletins = indexes.MultiValueField()
    related_incidents = indexes.MultiValueField()
    """
    fullname_en = indexes.CharField(model_attr='fullname_en', null=True)
    fullname_ar = indexes.CharField(model_attr='fullname_ar', null=True)
    nickname_en = indexes.CharField(model_attr='nickname_en', null=True)
    nickname_ar = indexes.CharField(model_attr='nickname_ar', null=True)
    age = indexes.CharField(model_attr='age', faceted=True, null=True)
    sex = indexes.CharField(model_attr='sex', faceted=True, null=True)
    civilian = indexes.CharField(
        model_attr='civilian', faceted=True, null=True)

    occupation_en = indexes.CharField(
        model_attr='occupation_en', null=True, faceted=True)
    occupation_ar = indexes.CharField(
        model_attr='occupation_ar', null=True, faceted=True)
    nationality_en = indexes.CharField(
        model_attr='nationality_en', faceted=True, null=True)
    nationality_ar = indexes.CharField(
        model_attr='nationality_ar', null=True, faceted=True)
    position_en = indexes.CharField(
        model_attr='position_en', null=True, faceted=True)
    position_ar = indexes.CharField(
        model_attr='position_ar', null=True, faceted=True)
    ethnicity_en = indexes.CharField(
        model_attr='ethnicity_en', null=True, faceted=True)
    ethnicity_ar = indexes.CharField(
        model_attr='ethnicity_ar', null=True, faceted=True)
    religion_en = indexes.CharField(
        model_attr='religion_en', null=True, faceted=True)
    religion_ar = indexes.CharField(
        model_attr='religion_ar', null=True, faceted=True)
    spoken_dialect_en = indexes.CharField(
        model_attr='spoken_dialect_en', null=True, faceted=True)
    spoken_dialect_ar = indexes.CharField(
        model_attr='spoken_dialect_ar', null=True, faceted=True)
    count_incidents = indexes.IntegerField()
    count_bulletins = indexes.IntegerField()
    actor_created = indexes.DateTimeField(
        model_attr='actor_created', faceted=True, null=True)
    actor_modified = indexes.DateTimeField(
        model_attr='actor_modified',
        faceted=True,
        null=True
    )
    most_recent_status_actor = indexes.CharField(faceted=True)
    actor_modified_date = indexes.DateField(faceted=True)
    actor_created_date = indexes.DateField(faceted=True)
    actor_assigned_user = indexes.CharField(
        default="unassigned",
        model_attr='assigned_user',
        faceted=True,
        null=True
    )

    resource_uri = indexes.CharField()
    POB = indexes.CharField(faceted=True)
    current_location = indexes.CharField(faceted=True)
    thumbnail_url = indexes.CharField()

    actor_searchable_pob = indexes.MultiValueField(faceted=True)
    actor_searchable_current = indexes.MultiValueField(faceted=True)

    def get_model(self):
        return Actor
    
    def get_updated_field(self):
        return 'actor_modified'
