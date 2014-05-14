"""
Author: Cormac McGuire
Date: 31/12/2013
Utilities for views
"""


def can_edit_assigned_entities(user):
    permission = 'can_edit_assigned_entities'
    return has_permission(user, permission)


def can_edit_entities(user):
    permission = 'can_edit_entities'
    return has_permission(user, permission)


def can_delete(user):
    permission = 'can_delete_entities'
    return has_permission(user, permission)


def can_finalize(user):
    permission = 'can_update_to_finalized'
    return has_permission(user, permission)


def can_assign_users(user):
    '''
    can this user assign users to entities
    '''
    permission = 'can_assign_users'
    return has_permission(user, permission)


def has_permission(user, permission):
    '''
    does the user or their  group have the permission
    '''
    perms = get_all_user_perm_codenames(user)
    perm_set = set([permission])
    return len(perms.intersection(perm_set)) > 0


def is_in_group(user, group_name):
    return group_name in map(lambda group: group.name, user.groups.all())


def get_all_user_perm_codenames(user):
    '''
    combine a user and their group perms into a list
    '''
    def get_perm_codenames(perm):
        return perm.codename

    user_perms = map(get_perm_codenames, user.user_permissions.all())
    group_perms = []
    for group in user.groups.all():
        group_perms += map(get_perm_codenames, group.permissions.all())

    return set(user_perms + group_perms)


def is_user_in_groups(group_list, user):
    '''
    check if a user is in a specified group list
    '''
    user_groups = map((lambda group: group.name), user.groups.all())
    return len(intersect(user_groups, group_list)) > 0


def intersect(list_a, list_b):
    '''
    get the intersection of two lists
    '''
    return list(set(list_a) & set(list_b))
