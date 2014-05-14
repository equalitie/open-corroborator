"""
This file handles the abstract and meta data preparation
for the Actor entity. It is consummed by the Solr system
and the Tastypie dehyrdate cycle

Bill Doran 2013/08/08
"""

from corroborator_app.models import Location, Label


class IncidentPrepMeta():

    def prepare_incident_created_date(self, object):
        """
        return date portion of incident created datetime field
        """
        if object.incident_created is not None:
            return object.incident_created.date()
        else:
            return ''

    def prepare_incident_modified_date(self, object):
        """
        return date portion of incident modified datetime field
        """
        if object.incident_modified is not None:
            return object.incident_modified.date()
        else:
            return ''

    def prepare_actors(self, object):
        """
        Returns array of tastypie uris for the given Actor object's associated
        actors
        """
        actors = [
            '/api/v1/actor/{0}/'.format(actor_role.actor.id)
            for actor_role in object.actors_role.all()]
        return actors

    #def prepare_actor_roles(self, incident_object):
    def prepare_actor_roles_status(self, incident_object):
        """
        Returns a full list of the roles played by actors associate
        with this object
        """
        roles = [
            actor_role.role_status for actor_role in
            incident_object.actors_role.all()
        ]
        return roles

    def prepare_incident_confidence_bucket(self, object):
        bins = [
            '0-9',
            '10-19',
            '20-29',
            '30-39',
            '40-49',
            '50-59',
            '60-69',
            '70-79',
            '80-89',
            '90-100',
        ]
        confidence = object.confidence_score
        if confidence is not None:
            if confidence == 100:
                bin_number = (confidence / 10) - 1
            else:
                bin_number = confidence / 10
            return bins[bin_number]
        else:
            return ''

    def prepare_assigned_user(self, object):
        if object.assigned_user is not None:
            return '/api/v1/user/{0}/'.format(object.assigned_user.id)
        else:
            return ''

    def prepare_times(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/timeInfo/{0}/'.format(timeinfo.id) for timeinfo in
            object.times.all()]

    def prepare_ref_incidents(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/incident/{0}/'.format(incident.id) for incident in
            object.ref_incidents.all()]

    def prepare_incident_labels(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        labels = []
        for label in object.labels.all():
            labels.append(
                '/api/v1/label/{0}/'.format(label.id)
            )
            if label.ref_label is not None:
                labels += self.get_labels_recursively(
                    label.ref_label.id
                )

        return list(set(labels))

    def get_labels_recursively(self, label_id):
        """
        Recurse upwards through all parent locations and return a list of
        uri formatted locations.
        """
        labels = []
        label = Label.objects.get(pk=label_id)
        if label.ref_label is not None:
            parent_id = label.ref_label.id
            labels += self.get_labels_recursively(parent_id)
            labels.append('/api/v1/label/{0}/'.format(label.id))
            return labels

        else:
            return ['/api/v1/label/{0}/'.format(label.id)]

    def prepare_incident_searchable_locations(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        locations = []
        for location in object.locations.all():
            locations.append(
                '/api/v1/location/{0}/'.format(location.id)
            )
            if location.parent_location is not None:
                locations += self.get_locations_recursively(
                    location.parent_location.id
                )

        return list(set(locations))

    def get_locations_recursively(self, location_id):
        """
        Recurse upwards through all parent locations and return a list of
        uri formatted locations.
        """
        locations = []
        location = Location.objects.get(pk=location_id)
        if location.parent_location is not None:
            parent_id = location.parent_location.id
            locations += self.get_locations_recursively(parent_id)
            locations.append('/api/v1/location/{0}/'.format(location.id))
            return locations

        else:
            return ['/api/v1/location/{0}/'.format(location.id)]

    def prepare_locations(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/location/{0}/'.format(location.id)
            for location in object.locations.all()]

    def prepare_labels(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/label/{0}/'.format(label.id)
            for label in object.labels.all()]

    def prepare_ref_bulletins(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/bulletin/{0}/'.format(bulletin.id)
            for bulletin in object.ref_bulletins.all()]

    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/actorRole/{0}/'.format(actor_role.id)
            for actor_role in object.actors_role.all()]

    def prepare_crimes(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/crimeCategory/{0}/'.format(crime.id)
            for crime in object.crimes.all()]

    def prepare_incident_comments(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/comment/{0}/'.format(comment.id)
                for comment in object.incident_comments.all()]

    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return '/api/v1/incident/{0}/'.format(object.id)

    def prepare_most_recent_status_incident(self, object):
        """
        Returns moste recent status associated with a given Incident
        """
        status = object.incident_comments.values(
            'status__id').order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return '/api/v1/statusUpdate/{0}/'.format(status['status__id'])
        else:
            return ''
    '''
    def prepare_incident_labels(self, object):
        """
        Returns set of label objects associated with a given Incident
        """
        return [
            '/api/v1/label/{0}/'.format(label.id)
            for label in object.labels.all()]
    '''
    def prepare_count_actors(self, object):
        """
        Returns count of Actor objects associated with a given Incident
        """
        return object.actors_role.count()

    def prepare_count_incidents(self, object):
        """
        Returns count of Incident objects associated with a given Incident
        """
        return object.ref_incidents.count()

    def prepare_count_bulletins(self, object):
        """
        Returns count of Bulletin objects associated with a given Incident
        """
        return object.ref_bulletins.count()

    def prepare_incident_locations(self, object):
        """
        Returns set of location objects associated with a given Incident
        """
        return [location.name_en for location in object.locations.all()]

    def prepare_incident_times(self, object):
        """
        Returns set of time objects associated with a given Incident
        """
        return [time.time_from for time in object.times.all()]

    def prepare_incident_crimes(self, object):
        """
        Returns set of crime objects associated with a given incident
        """
        return [
            '/api/v1/crimeCategory/{0}/'.format(crime.id) for crime in
            object.crimes.all()]
