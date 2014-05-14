from corroborator_app.models import VersionStatus, UserLog
from django.contrib.auth.models import User
from django.db.models import Count, Sum
from itertools import groupby
import json
import time
from django.utils.translation import ugettext as _


class UserReportingApi(object):

    def __init__(self):
        """
        """
        pass

    def total_user_login_time(self):
        """
        Return total user login time
        """
        graph_title = _('Total login time by User')

        user_items = UserLog.objects.values('user__username')\
            .annotate(value=Sum('total_seconds'))

        for item in user_items:
            item['value'] = int(item['value'] / 60)
        if user_items == []:
            return '{"error": "No data elements found."}'

        return self.bar_format_json(user_items, graph_title)

    def total_user_login_per_day(self, user_id):
        """
        Return total user login time per day
        for a given user.
        """
        graph_title = _('Total user login time per day')

        user = User.objects.filter(pk=user_id)[0]

        items = UserLog.objects.filter(
            user__id=user_id
        ).order_by(
            'logout'
        ).values('logout', 'total_seconds')
        result_data = []
        time_data = []
        for key, values in groupby(items, key=lambda item: item['logout'].date()):

            timestamp = str(key)
            val = 0
            for value in values:
                val += value['total_seconds']
            val = int(val / 60)    
            time_data.append({
                'label': timestamp,
                'value': val,
                'yAxisLable': user.username
            })
        """
        result_data.append({
            'values': time_data,
            'label': user.username
        })
        """
        result_data.append( time_data )
        if time_data == []:
            return '{"error": "No data elements found."}'

        return self.trend_format_json(time_data, graph_title)

    def user_average_updates_per_hour(self):
        """
        Return average updates per hour of login for
        a given user.
        """
        graph_title = _('Average user updates per hour')
        user_updates = VersionStatus.objects.filter(
            status='edited'
        ).values(
            'user__username',
            'user__id'
        ).annotate(total_updates=Count('id'))

        average_updates = []
        for update in user_updates:
            total_hours = self.total_user_login_in_hours(
                update['user__id']
            )
            average = update['total_updates'] / total_hours
            average_updates.append({
                'user__username': update['user__username'],
                'value': average
            })

        if average_updates == []:
            return '{"error": "No data elements found."}'

        return self.bar_format_json(average_updates, graph_title)

    def total_user_login_in_hours(self, user_id):
        """
        Return the total logged in time for a user in hours
        """
        time = UserLog.objects.filter(
            user_id=user_id
        ).values(
            'user'
        ).annotate(
            val=Sum('total_seconds')
        )
        return time[0]['val'] / 3600

    def user_assigned_items_by_status(self, user_id):
        """
        Return number of items assigned to a given user
        in terms of status.
        """
        graph_title = _('User assigned items by status')

        user = User.objects.get(pk=user_id)
        statuses = {}

        bulletin_set = user.bulletin_set.all()
        incident_set = user.incident_set.all()
        actor_set = user.actor_set.all()

        statuses = self.get_entity_statuses(
            bulletin_set,
            statuses,
            'bulletin'
        )
        statuses = self.get_entity_statuses(
            incident_set,
            statuses,
            'incident'
        )
        statuses = self.get_entity_statuses(
            actor_set,
            statuses,
            'actor'
        )

        status_set = []
        if len(statuses) > 0:
            for key in statuses:
                status_set.append({
                    'label': key,
                    'value': statuses[key]
                })
        if status_set == []:
            return '{"error": "No data elements found."}'

        return self.bar_format_json_per_user(status_set, graph_title)

    def get_entity_statuses(self, entity_set, statuses, entity_type):
        for entity in entity_set:
            entity_status = self.get_entity_status(entity_type, entity)
            if entity_status is not '':
                if entity_status in statuses:
                    statuses[entity_status] += 1
                else:
                    statuses[entity_status] = 1

        return statuses

    def get_entity_status(self, entity_type, entity):
        if 'bulletin' == entity_type:
            return entity.most_recent_status_bulletin()
        elif 'incident' == entity_type:
            return entity.most_recent_status_incident()
        else:
            return entity.most_recent_status_actor()

    def total_user_items_by_crud(self, crud_type):
        """
        Return JSON object containing set of deleted items
        """
        graph_title =\
            _('Total %(type)s items by User') % {'type': crud_type, }

        user_items = VersionStatus.objects.filter(
            status=crud_type
        ).values('user__username').annotate(value=Count('status'))

        if user_items == []:
            return '{"error": "No data elements found."}'

        return self.bar_format_json(user_items, graph_title)

    def crud_per_day(self, user_id):
        """
        CRUD opperations total per day
        """
        graph_title = _('Deleted, created and edited items by date')
        items = []

        items.append({
            'values': self.get_items_by_crud_date('deleted', user_id),
            'key': _('Deleted items by date')
        })
        items.append({
            'values': self.get_items_by_crud_date('created', user_id),
            'key': _('Created items by date')
        })
        items.append({
            'values': self.get_items_by_crud_date('edited', user_id),
            'key': _('Edited items by date')
        })

        if items == []:
            return '{"error": "No data elements found."}'
        return self.trend_format_json(items, graph_title)

    def get_items_by_crud_date(self, crud_type, user_id):
        items = VersionStatus.objects.filter(
            status=crud_type
        ).filter(
            user__id=user_id
        ).order_by(
            'version_timestamp'
        ).values('version_timestamp', 'id')

        time_data = []
        for key, values in groupby(
            items,
            key=lambda item: item['version_timestamp'].date()
        ):
            timestamp = time.mktime(key.timetuple())*1e3
            val = 0
            for value in values:
                val += 1
            time_data.append({
                'x': timestamp,
                'y': val
            })

        return time_data

    def trend_format_json(self, objects, graph_title):
        """
        Convert the given set of user objects to
        the correct format for trend graphs
        """
        trend_json = {
            'title': graph_title,
            'values': objects
        }
        return json.dumps(trend_json)

    def bar_format_json_per_user(self, objects, graph_title):
        """
        Convert the given set of user objects to the
        correct format for trend graphs
        """
        bar_json = {
            'title': graph_title,
            'values': objects
        }

        return json.dumps(bar_json)

    def bar_format_json(self, objects, graph_title):
        """
        Convert the given set of user objects to the
        correct format for trend graphs
        """
        bar_json = {
            'title': graph_title,
            'values': self.get_object_values(objects)
        }

        return json.dumps(bar_json)

    def get_object_values(self, objects):
        values = []
        for object in objects:
            item = {
                'value': object['value'],
                'label': object['user__username']
            }
            values.append(item)

        return values
