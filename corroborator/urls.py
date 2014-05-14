from django.conf.urls import patterns, include, url

# reporting
#from model_report import report
#report.autodiscover()

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    '',
    # Examples:
    # url(r'^$', 'corroborator.views.home', name='home'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^logout/$',
        'django.contrib.auth.views.logout',
        {'next_page': '/login'}),
    url(r'^login/$', 'corroborator_app.views.login_user'),
    url(r'^accounts/login/$', 'corroborator_app.views.login_user'),
    url(r'^admin/', include(admin.site.urls)),


    url(r'^$', 'corroborator_app.views.index'),
    url(r'^data-entry/$', 'corroborator_app.views.data_entry'),
    #url(r'^/$', 'corroborator_app.views.index'),
    url(r'^corroborator/$', 'corroborator_app.views.index'),
    (r'^i18n/', include('django.conf.urls.i18n')),

    url(r'^corroborator/monitoring$', 'corroborator_app.views.monitoring'),

    url(r'^corroborator/reporting/$',
        'corroborator_app.views.reporting.reporting_view'),

    url(r'^corroborator/graphs/user/(?P<graph_code>[a-z_]+)/$',
        'corroborator_app.views.reporting.request_graph_data'),
    url(r'^corroborator/graphs/user/(?P<graph_code>[a-z_]+)/(?P<user_id>[0-9]+)/',
        'corroborator_app.views.reporting.request_graph_data'),

    url(
        r'^corroborator/monitoring/update/(?P<conf_name>\w+)/$',
        'corroborator_app.views.monitoring_update_conf'),

    url(r'^new_corroborator/$', 'corroborator_app.views.index'),
    url(r'^corroborator/bulletin/(?P<bulletin_id>\d+)/(?P<mode>\w+)/$',
        'corroborator_app.views.lookup_bulletin'),
    url(r'^corroborator/incident/(?P<incident_id>\d+)/(?P<mode>\w+)/$',
        'corroborator_app.views.lookup_incident'),
    url(r'^corroborator/actor/(?P<actor_id>\d+)/(?P<mode>\w+)/$',
        'corroborator_app.views.lookup_actor'),

    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r'^corroborator/solrrefresh/$',
        'corroborator_app.views.entity_refresh'),
    url(r'^corroborator/aws/(?P<media_name>.+\.[a-zA-Z0-9]{3})$',
        'corroborator_app.views.aws_proxy'),
    url(r'^corroborator/solrproxy/',
        'corroborator_app.views.solr_proxy'),

)

#locking
#urlpatterns += patterns('',
#    (r'^admin/ajax/', include('locking.urls')),
#)

# API Resources
from tastypie.api import Api
from corroborator_app.api import (
    ActorResource, ActorRoleResource, ActorRelationshipResource,
    ActorConditionResource,
    CommentResource, CrimeCategoryResource, IncidentResource,
    BulletinResource, LabelResource, MediaResource, PredefinedSearchResource,
    SourceResource, SourceTypeResource, LocationResource, StatusUpdateResource,
    TimeInfoResource, UserResource, SolrUpdateResource, MonitorUpdateResource
)

v1_api = Api(api_name='v1')
v1_api.register(ActorResource())
v1_api.register(ActorRoleResource())
v1_api.register(ActorRelationshipResource())
v1_api.register(ActorConditionResource())
v1_api.register(CommentResource())
v1_api.register(CrimeCategoryResource())
v1_api.register(IncidentResource())
v1_api.register(BulletinResource())
v1_api.register(LabelResource())
v1_api.register(MediaResource())
v1_api.register(PredefinedSearchResource())
v1_api.register(SourceResource())
v1_api.register(SourceTypeResource())
v1_api.register(LocationResource())
v1_api.register(StatusUpdateResource())
v1_api.register(TimeInfoResource())
v1_api.register(UserResource())
v1_api.register(SolrUpdateResource())
v1_api.register(MonitorUpdateResource())

urlpatterns += patterns(
    '',
    (r'^api/', include(v1_api.urls)),
)
