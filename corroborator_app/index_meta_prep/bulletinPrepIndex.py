"""
This file handles the abstract and meta data preparation
for the Bulletin entity. It is consummed by the Solr system
and the Tastypie dehyrdate cycle

Bill Doran 2013/08/08
"""

from corroborator_app.models import Location, Incident, Label


class BulletinPrepMeta():
    def prepare_sources_count(self, object):
        """
        Get count of bulletin sources
        """
        return object.sources.count()

    def prepare_bulletin_modified_date(self, object):
        """
        return date portion of bulletin modified datetime field
        """
        if object.bulletin_modified is not None:
            return object.bulletin_modified.date()
        else:
            return ''

    def prepare_bulletin_created_date(self, object):
        """
        return date portion of bulletin created datetime field
        """
        if object.bulletin_created is not None:
            return object.bulletin_created.date()
        else:
            return ''

    def prepare_actor_roles_status(self, object):
        """
        Returns a full list of the roles played by actors associate
        with this object
        """
        roles = [
            actor_role.role_status for actor_role in
            object.actors_role.all()]
        return roles

    def prepare_assigned_user(self, object):
        if object.assigned_user is not None:
            return '/api/v1/user/{0}/'.format(object.assigned_user.id)
        else:
            return ''

    def prepare_times(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/timeInfo/{0}/'.format(timeinfo.id)
            for timeinfo in object.times.all()]

    def prepare_ref_incidents(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/incident/{0}/'.format(incident.id) for incident in
            Incident.objects.filter(ref_bulletins__id=object.id)
        ]

    def prepare_ref_bulletins(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/bulletin/{0}/'.format(bulletin.id)
            for bulletin in object.ref_bulletins.all()]

    def prepare_locations(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/location/{0}/'.format(location.id)
            for location in object.locations.all()]

    def prepare_bulletin_labels(self, object):
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


    def prepare_bulletin_searchable_locations(self, object):
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

    def prepare_bulletin_confidence_bucket(self, object):
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

    def prepare_labels(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/label/{0}/'.format(label.id)
            for label in object.labels.all()]

    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/actorRole/{0}/'.format(actor_role.id)
            for actor_role in object.actors_role.all()]

    def prepare_sources(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/source/{0}/'.format(source.id)
            for source in object.sources.all()]

    def prepare_bulletin_comments(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/comment/{0}/'.format(comment.id)
            for comment in object.bulletin_comments.all()]

    def prepare_bulletin_imported_comments(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return [
            '/api/v1/comment/{0}/'.format(comment.id)
            for comment in object.bulletin_imported_comments.all()]

    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return '/api/v1/bulletin/{0}/'.format(object.id)

    def prepare_most_recent_status_bulletin(self, object):
        """
        Returns most recently created status update associated with a
        given Bulletin
        """
        status = object.bulletin_comments.values(
            'status__id').order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return '/api/v1/statusUpdate/{0}/'.format(status['status__id'])
        else:
            return ''

    def prepare_bulletin_times(self, object):
        """
        Returns set of time objects associated with a given Bulletin
        """
        return [time.time_from for time in object.times.all()]

    def prepare_medias(self, object):
        """
        Returns set of media objects associated with a given Bulletin
        """
        template = '/api/v1/media/{0}/'
        medias = object.medias.all()
        return [template.format(media.id) for media in medias]
    '''
    def prepare_bulletin_labels(self, object):
        """
        Returns set of label objects associated with a given Bulletin
        """
        template = '/api/v1/label/{0}/'
        labels = object.labels.all()
        return [template.format(label.id) for label in labels]
    '''
    def prepare_count_actors(self, object):
        """
        Returns count of Actor objects associated with a given Bulletin
        """
        return object.actors_role.count()

    def prepare_bulletin_sources(self, object):
        """
        Returns set of Source objects associated with a given Bulletin
        """
        template = '/api/v1/source/{0}/'
        sources = object.sources.all()
        return [template.format(source.id) for source in sources]

    def prepare_bulletin_locations(self, object):
        """
        Returns set of location objects associated with a given Bulletin
        """
        return [location.name_en for location in object.locations.all()]
