from corroborator_app.models import (Comment, VersionStatus, )

from reversion import revisions as reversion


class APIMixin():
    '''
    common functions for Actor, Bulletin and Incident APIs
    '''
    def is_finalized(self, ModelType, pk, status_method):
        func = getattr(ModelType.objects.get(pk=pk), status_method)
        return func() == 'Finalized'

    def create_comment(self, comment, status_id, user):
        '''
        create a status comment to be attached to the user upon save
        '''
        comment = Comment(
            assigned_user_id=user.id,
            comments_en=comment,
            status_id=status_id
        )
        comment.save()
        comment_uri = '/api/v1/comment/{0}/'.format(comment.id)

        return comment_uri

    def id_from_url(self, data):
        '''
        get the id from a uri
        updated id hard coded, should be looked up
        '''
        try:
            return data['status_uri'].split('/')[4]
        except KeyError:
            return 3

    def can_edit(self, user, bundle, ModelType):
        '''
        check if the user may edit this resource
        '''
        user_has_perm = user.has_perms('can_edit_entities')

        # not crazy about multiple ifs, but trying to reduce number of
        # operations if possible
        if user_has_perm is False:
            user_has_perm = self.check_groups_for_permission(
                user.groups.all(), 'can_edit_entities')

        if user_has_perm is False:
            user_has_perm = self.check_entity_assigned(ModelType, bundle, user)

        return user_has_perm

    def check_groups_for_permission(self, groups, perm):
        '''
        does the user have the can edit permission
        '''
        has_perm = False
        for group in groups:
            try:
                has_perm = has_perm or len(
                    group.permissions.filter(codename=perm)) == 1
            except KeyError:
                pass

        return has_perm

    def check_entity_assigned(self, ModelType, bundle, user):
        '''
        does the user have the can_edit_assigned permission and is
        the entity assigned to them
        '''
        has_perm = self.check_groups_for_permission(
            user.groups.all(), 'can_edit_assigned_entities')

        model = ModelType.objects.get(id=bundle.data['id'])
        try:
            return has_perm and int(model.assigned_user.id) == int(user.id)
        except AttributeError:
            return False

    def create_revision(self, bundle, user, status_update):
        with reversion.create_revision():
            reversion.set_user(user)
            reversion.set_comment(bundle.data['comment'])
            reversion.add_meta(
                VersionStatus,
                status=status_update,
                user=user
            )
