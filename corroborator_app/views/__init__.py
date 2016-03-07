"""
This file handles the core views for th Corroborator application.

Author: Bill Doran
TODO: move the views into separate files and extract common methods into utils
module
2013/02/10
"""
import json
import os
from datetime import datetime, timedelta
from django.utils import translation
from django.shortcuts import render_to_response, render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.template import RequestContext
from django.http import (
    HttpResponseRedirect, Http404, HttpResponse, HttpResponseServerError)

from django.conf import settings
from django.contrib.auth.decorators import login_required


from tastypie.models import ApiKey

from corroborator_app.monitor.monitorDataLoader import MonitorDataLoader
from corroborator_app.multisave import (
    multi_save_actors,
    multi_save_bulletins,
    multi_save_incidents
)
from corroborator_app.models import (
    Bulletin,
    Incident,
    Actor
)

from corroborator_app.views.context import (
    build_js_context, build_data_entry_context)

from corroborator_app.authproxy.awsAuthProxy import AWSAuthProxy
from corroborator_app.authproxy.solrAuthProxy import SolrAuthProxy

from corroborator_app.views.view_utils import is_in_group

from sendfile import sendfile

###############################################################################
# MAIN VIEW METHODS -
###############################################################################


def login_user(request):
    '''
    login view
    '''
    state = "Please log in below..."
    username = password = ''
    if request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username,  password=password)
        if user is not None:
            if user.is_active:
                login(request,  user)
                state = "You're successfully logged in!"
                return HttpResponseRedirect('/corroborator/')
            else:
                state = "Your account is not active,\
                please contact the site admin."
                return render_to_response(
                    'auth.html',
                    {
                        'state': state,
                        'username': username
                    },
                    RequestContext(request)
                )
        else:
            state = "Your username and/or password were incorrect."
            return render_to_response(
                'auth.html',
                {
                    'state': state,
                    'username': username
                },
                RequestContext(request)
            )

    return render_to_response(
        'auth.html',
        {
            'state': state,
            'username': username
        },
        RequestContext(request)
    )


@login_required
def index(request, *args, **kwargs):
    """
    main view method - this renders the production app page and adds all
    bootstrap variables required - this is used at / and /corroborator
    handle formatting of lists outside the view function
    """
    for group in request.user.groups.all():
        if group.name == u'data-entry':
            return redirect('/data-entry/')

    return render(
        request, 'new_search.html', build_js_context(request.user)
    )


@login_required
def data_entry(request, *args, **kwargs):
    '''
    show the data entry view
    '''

    incorrect_groups = [u'data-analyst', u'chief-data-analyst', ]
    for group in request.user.groups.all():
        if group.name in incorrect_groups:
            return redirect('/corroborator/')

    return render(
        request,
        'data-entry.html',
        build_data_entry_context(request.user)
    )


def monitoring_update_conf(request, conf_name):
    """
    Update configuration file for given conf, values presently are:
    importer or scraper
    """
    if request.user.is_authenticated:
        mdl = MonitorDataLoader()
        result = ''
        conf_data = json.loads(request.body)

        if conf_name == 'scraper':
            result = mdl.overwrite_scraper_config(conf_data)
        else:
            result = mdl.overwrite_importer_config(conf_data)

        result_json = json.dumps(result)
        if 'error' in result_json:
            return HttpResponseServerError(
                result_json,
                content_type='application/json'
            )
        else:
            return HttpResponse(result_json, content_type='application/json')
    else:
        return Http404


def monitoring(request, *args, **kwargs):
    """
    monitor view method - this renders the monitor app page and adds all
    bootstrap variables required - this is used at /corroborator/monitor
     handle formatting of lists outside the view function
    """
    if request.user.is_authenticated():
        username = request.user.username
        userid = request.user.id

        #api details
        user = User.objects.get(username=username)
        api = ApiKey.objects.get(user=user)

        mdl = MonitorDataLoader()
        importer_conf_data = json.dumps(mdl.importer_config)
        scraper_conf_data = json.dumps(mdl.scraper_config)
        importer_stats_data = json.dumps(mdl.importer_stats)

        return render(
            request, 'monitoring.html',
            {
                'locale': translation.get_language(),
                'importer_conf_data': importer_conf_data,
                'scraper_conf_data': scraper_conf_data,
                'importer_stats_data': importer_stats_data,
                'username': username,
                'userid': userid,
                'api_key': api.key,
                'is_analyst': is_in_group(user, 'data-analyst'),
                'is_senior_analyst': is_in_group(user, 'senior-data-analyst'),
                'is_chief_analyst': is_in_group(user, 'chief-data-analyst'),
            }
        )
    else:
        return render_to_response('auth.html', RequestContext(request))

###############################################################################
# OBJECT REFRESH
#
##############################################################################


def get_updated_objects():
    """
    Return a set of objects updated during the last window
    """
    date_range = []
    refresh_window = settings.SOLR_REFRESH_WINDOW
    date_range.append(datetime.now() - timedelta(minutes=refresh_window))
    date_range.append(datetime.now())
    bulletins = Bulletin.objects.filter(
        bulletin_modified__range=date_range
    )
    incidents = Incident.objects.filter(
        incident_modified__range=date_range
    )
    actors = Actor.objects.filter(
        actor_modified__range=date_range
    )
    refreshed = {
        'bulletins': [],
        'incidents': [],
        'actors': []
    }
    user_id_tpl = '/api/v1/user/{0}'
    for bulletin in bulletins:
        updated_user_id =\
            int(bulletin.most_recent_update_by()[0]['status__user'])
        user_id = user_id_tpl.format(updated_user_id) \
            if len(bulletin.most_recent_update_by()) > 0 else ''
        refreshed['bulletins'].append({
            'id': bulletin.id,
            'resource_uri': '/api/v1/bulletin/{0}'.format(
                bulletin.id
            ),
            'user_id': user_id,
            'update': str(bulletin.bulletin_modified)
        })
    for incident in incidents:
        updated_user_id =\
            int(incident.most_recent_update_by()[0]['status__user'])
        user_id = user_id_tpl.format(updated_user_id)\
            if len(incident.most_recent_update_by()) > 0 else ''

        refreshed['incidents'].append({
            'id': incident.id,
            'resource_uri': '/api/v1/incident/{0}'.format(
                incident.id
            ),
            'user_id': user_id,
            'update': str(incident.incident_modified)
        })
    for actor in actors:
        updated_user_id =\
            int(actor.most_recent_update_by()[0]['status__user'])
        user_id = user_id_tpl.format(updated_user_id)\
            if len(actor.most_recent_update_by()) > 0 else ''

        refreshed['actors'].append({
            'id': actor.id,
            'resource_uri': '/api/v1/actor/{0}'.format(
                actor.id
            ),
            'user_id': user_id,
            'update': str(actor.actor_modified)
        })
    return refreshed


def entity_refresh(request):
    """
    Retrun JSON representing the most recently updated entities
    """
    if request.user.is_authenticated:
        refreshed_entities = get_updated_objects()
        data = json.dumps(refreshed_entities)
        return HttpResponse(data, content_type='application/json')
    else:
        raise Http404
###############################################################################
# AUTH PROXIES
#
##############################################################################


def aws_proxy(request, media_name):
    """
    This function is responsible for proxying the request for an AWS
    media file and returning the file itself provided the request
    passes auth testing
    On failure return 404 else redirect to AWS file.
    """
    if request.user.is_authenticated:
        if not settings.QUEUED_STORAGE and settings.DEFAULT_FILE_STORAGE == 'django.core.files.storage.FileSystemStorage':
            return sendfile(request, os.path.join(settings.MEDIA_ROOT, media_name))
        else:
            return AWSAuthProxy().get(media_name)
    else:
        raise Http404


def solr_proxy(request, *args, **kwargs):
    """
    This function is responsible for proxying a solr query and
    returning the query results if the provided request passes
    auth testing
    """
    if request.user.is_authenticated():
        query = request.META['QUERY_STRING']
        return SolrAuthProxy().parse_request(query)
    else:
        raise Http404

###############################################################################
# MULTISAVE VIEWS
# TODO: rename to something more sensible
###############################################################################


def lookup_bulletin(request, bulletin_id, mode):
    """
    This method is used to implement mass update for bulletins
    It is a work around for lack of incremental update in tastypie
    """
    return multisave_entity(request, multi_save_bulletins)


def lookup_incident(request, incident_id, mode):
    """
    This method is used to implement mass update for bulletins
    It is a work around for lack of incremental update in tastypie
    """
    return multisave_entity(request, multi_save_incidents)


def lookup_actor(request, actor_id, mode):
    """
    This method is used to implement mass update for bulletins
    It is a work around for lack of incremental update in tastypie
    """
    return multisave_entity(request, multi_save_actors)


def multisave_entity(request, multisave_function):
    entity_data = json.loads(request.body)
    username = entity_data['username']
    return multisave_function(request, entity_data, username)
