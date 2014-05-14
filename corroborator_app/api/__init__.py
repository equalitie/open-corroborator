"""
api module for the corroborator app
we also declare our signal to create api keys for users on the post_save 
signal
"""
from django.contrib.auth.models import User
from django.db import models
from tastypie.models import create_api_key
from corroborator_app.api.ActorApi import ActorResource
from corroborator_app.api.ActorApi import ActorRoleResource
from corroborator_app.api.ActorApi import ActorRelationshipResource
from corroborator_app.api.ActorConditionApi import ActorConditionResource
from corroborator_app.api.CommentApi import CommentResource
from corroborator_app.api.CrimeCategoryApi import CrimeCategoryResource
from corroborator_app.api.IncidentApi import IncidentResource
from corroborator_app.api.BulletinApi import BulletinResource
from corroborator_app.api.LabelApi import LabelResource
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.MediaApi import MediaResource
from corroborator_app.api.PredefinedSearchApi import PredefinedSearchResource
from corroborator_app.api.SourceApi import SourceResource
from corroborator_app.api.UserApi import UserResource
from corroborator_app.api.SourceTypeApi import SourceTypeResource
from corroborator_app.api.StatusUpdateApi import StatusUpdateResource
from corroborator_app.api.SolrUpdateApi import SolrUpdateResource
from corroborator_app.api.TimeInfoApi import TimeInfoResource
from corroborator_app.api.SolrUpdateApi import SolrUpdateResource
from corroborator_app.api.MonitorUpdateApi import MonitorUpdateResource

models.signals.post_save.connect(create_api_key, sender=User)
