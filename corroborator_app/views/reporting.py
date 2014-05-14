"""
Author: Cormac McGuire
Date: 31/12/2013
View to display the reporting functionality, graphs, etc
Contains views that send the relevant json data back for the graphs
reporting_view displays the reports page
"""
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import Http404, HttpResponse

from corroborator_app.views.view_utils import is_user_in_groups
from corroborator_app.views.context import build_js_context

from corroborator_app.reporting.user_reporting import UserReportingApi

from corroborator_app.views.context import build_js_context

# groups a user must be in to view the reports page
REPORT_GROUPS = ['senior-data-analyst', 'chief-data-analyst', ]


@login_required
def reporting_view(request, *arg, **kwargs):
    '''
    display the reports page
    show a 404 if the user is not authorised to see the view
    '''
    if is_user_in_groups(REPORT_GROUPS, request.user) is False:
        raise Http404

    return render(
        request, 'reporting.html', build_js_context(request.user)
    )


@login_required
def request_graph_data(request, graph_code, user_id=None):
    ura = UserReportingApi()
    if user_id is None:
        graph_function_map = {
            'user_login_time': ura.total_user_login_time,
            'user_login_per_day': ura.total_user_login_per_day,
            'user_average_updates': ura.user_average_updates_per_hour,
            'user_deleted_items': total_deleted_items,
            'user_created_items': total_created_items,
            'user_edited_items': total_edited_items,
        }
        graph_function = graph_function_map[graph_code]
        json_result = graph_function()
    else:
        graph_function_map = {
            'user_login_per_day': ura.total_user_login_per_day,
            'user_assigned_items_by_status': ura.user_assigned_items_by_status,
            'user_deleted_edited_created': ura.crud_per_day,
        }
        graph_function = graph_function_map[graph_code]
        json_result = graph_function_map[graph_code](user_id)

    return HttpResponse(json_result, mimetype='application/json')


def total_edited_items():
    ura = UserReportingApi()
    return ura.total_user_items_by_crud('edited')


def total_created_items():
    ura = UserReportingApi()
    return ura.total_user_items_by_crud('created')


def total_deleted_items():
    ura = UserReportingApi()
    return ura.total_user_items_by_crud('deleted')
