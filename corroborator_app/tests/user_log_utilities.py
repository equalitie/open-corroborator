"""
Author: Cormac McGuire
Date: 15/01/2014
Helper functions to generate UserLog Data for tests
"""

from datetime import datetime
import time
from corroborator_app.models import (
UserLog, VersionStatus, Actor, Comment, Bulletin,
Incident)
from reversion.models import Revision
from django.db.models import Count, Sum
from itertools import groupby

def generate_start_end_times(user):
    '''
    helper function to generate data for user login times
    '''
    date_time_set = []
    start_time = datetime.strptime(
        'Jun 1 2013  1:33PM', '%b %d %Y %I:%M%p')
    end_time = datetime.strptime(
        'Jun 1 2013  4:33PM', '%b %d %Y %I:%M%p')
    total = int((end_time - start_time).total_seconds()/60)
    timestamp = time.mktime(end_time.date().timetuple())*1e3
    date_time_set.append({
        'x': timestamp,
        'y': total
    })

    create_log_entry_for_user(user, start_time, end_time)
    start_time = datetime.strptime(
        'Jun 2 2013  1:33PM', '%b %d %Y %I:%M%p')
    end_time = datetime.strptime(
        'Jun 2 2013  4:33PM', '%b %d %Y %I:%M%p')
    create_log_entry_for_user(user, start_time, end_time)
    total2 = int((end_time - start_time).total_seconds()/60)
    total += total2 
    timestamp = time.mktime(end_time.date().timetuple())*1e3
    date_time_set.append({
        'x': timestamp,
        'y': total2
    })
        
    return [date_time_set,total]


def create_log_entry_for_user(user, start_time, end_time):
    '''
    this could be moved to a manger for UserLog
    '''
    UserLog.objects.create(
        user=user,
        login=start_time,
        logout=end_time,
        total_seconds=(end_time - start_time).total_seconds()
    )

def average_updates_value(user):

    create_version_status_entries_for_user(user)
    generate_start_end_times(user)

    user_updates = VersionStatus.objects.filter(
        status='edited'
    ).filter(
        user_id=user.id
    ).values(
        'user__username', 
        'user__id'
    ).annotate(
        total_updates=Count('id')
    )

    time = UserLog.objects.filter(
        user_id=user.id
    ).values(
        'user'
    ).annotate(
        val=Sum('total_seconds')
    )
    hours = time[0]['val'] / 3600

    return user_updates[0]['total_updates'] / hours


def create_version_status_entries_for_user(user):
    '''
    Generate version status entries for a given user
    '''
    revision = Revision.objects.create()
    vs_edited = VersionStatus.objects.create(
        user=user,
        status='edited',
        revision=revision
    )
    revision = Revision.objects.create()
    vs_created = VersionStatus.objects.create(
        user=user,
        status='created',
        revision=revision
    )
    revision = Revision.objects.create()
    vs_deleted = VersionStatus.objects.create(
        user=user,
        status='deleted',
        revision=revision
    )
    
    return {
        'deleted': 1,
        'created': 1,
        'edited': 1
    }

def crud_items_by_date(user):
    create_version_status_entries_for_user(user)
    items = {}
    items['deleted'] = crud_items('deleted', user)
    items['created'] = crud_items('created', user)
    items['edited'] = crud_items('edited', user)
    return items

def crud_items(crud_type, user):
    items = VersionStatus.objects.filter(
        status=crud_type
    ).filter(
        user__id=user.id
    ).order_by(
        'version_timestamp'
    ).values('version_timestamp', 'id')

    time_data = []

    for key, values in groupby(items, key=lambda item: item['version_timestamp']):
        timestamp = time.mktime(
            key.date().timetuple()
        )*1e3
        val = 0
        for value in values:
            val += 1
        time_data.append({
            'x': timestamp,
            'y': val
        })

    return time_data

    
