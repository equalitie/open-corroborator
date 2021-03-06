from django.contrib import admin
from django.http import HttpResponse
import csv
from corroborator_app.models import (
    Incident,
    CrimeCategory,
    Actor,
    Bulletin,
    TimeInfo,
    Location,
    Source,
    StatusUpdate,
    ActorRole,
    Label,
    SourceType,
    Comment,
    Media,
    PredefinedSearch,
    ActorCondition,
    ActorStatus,
    EventType,
)

from reversion.admin import VersionAdmin


def export_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename={}.csv'.format(modeladmin.model._meta.model_name)
    writer = csv.writer(response, csv.excel)
    response.write(u'\ufeff'.encode('utf8')) # BOM (optional...Excel needs it to open UTF-8 file properly)
    writer.writerow([unicode(f.name)
                     for f in modeladmin.model._meta.fields
                    ])
    for obj in queryset:
        writer.writerow([unicode(getattr(obj, f.name)).encode('utf-8')
                         for f in modeladmin.model._meta.fields
                        ])
    return response
export_csv.short_description = u"Export to CSV"


#todo set raw_id_fields for large datasets


class CommentsInlineIn(admin.TabularInline):
    model = Incident.incident_comments.through
    extra = 1


class LocationInlineIn(admin.TabularInline):
    model = Incident.locations.through
    extra = 1


class TimeInfoInlineIn(admin.StackedInline):
    model = Incident.times.through
    extra = 1


class ActorsRoleInlineIn(admin.TabularInline):
    model = Incident.actors_role.through
    extra = 1


class LabelInlineIn(admin.TabularInline):
    model = Incident.labels.through
    extra = 1


class CrimesInlineIn(admin.TabularInline):
    model = Incident.crimes.through
    extra = 1


class CorrobAdminIn(admin.ModelAdmin):
    """
    inlines = [
        TimeInfoInlineIn, CommentsInlineIn, LocationInlineIn,
        ActorsRoleInlineIn, LabelInlineIn, CrimesInlineIn
    ]
    list_display = ('title_en',  'incident_details_en', )
    exclude = ('times', 'locations', 'actors_role', 'incident_comments', 'labels', 'crimes')
    """

class LocationInline(admin.TabularInline):
    model = Bulletin.locations.through
    extra = 1


class TimeInfoInline(admin.StackedInline):
    model = Bulletin.times.through
    extra = 1


class SourceInline(admin.TabularInline):
    model = Bulletin.sources.through
    extra = 1


class ActorsRoleInline(admin.TabularInline):
    model = Bulletin.actors_role.through
    extra = 1


class LabelInline(admin.TabularInline):
    model = Bulletin.labels.through


class CorrobAdmin(admin.ModelAdmin):
    """
    inlines = [
        TimeInfoInline, LocationInline, SourceInline,
        ActorsRoleInline, LabelInline,
    ]
    list_display = ('title_en', 'description_en', )
    exclude = ('times', 'locations', 'sources', 'actors_role', 'labels')
    """


class StatusAdmin(admin.ModelAdmin):
    list_display = ('status_en', 'description_en', )
    readonly_fields = ('user', )

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'user', None) is None:
            obj.user = request.user
        obj.save()


class TimeInfoAdmin(admin.ModelAdmin):
    list_display = ('time_from', 'time_to', 'comments_en', )


class ActorAdmin(VersionAdmin):
    list_display = ('fullname_en', 'sex', 'DOB', 'deleted', 'actor_created',)
    list_filter = ('deleted',)
    actions = [export_csv]

class ActorConditionAdmin(VersionAdmin):
    list_display = ('name_en', 'key',)


class ActorRoleAdmin(VersionAdmin):
    actions = [export_csv]

class EventTypeAdmin(VersionAdmin):
    pass


class StatusUpdateAdmin(VersionAdmin):
    pass


class LocationAdmin(VersionAdmin):
    list_display = ('name_en', 'latitude', 'longitude', 'loc_type')
    list_filter = ('loc_type',)
    actions = [export_csv]


class SourceAdmin(VersionAdmin):
    pass


class SourceTypeAdmin(VersionAdmin):
    pass


class LabelAdmin(VersionAdmin):
    pass


class CrimeCategoryAdmin(VersionAdmin):
    pass


class MediaAdmin(VersionAdmin):
    list_display = ('name_en', 'media_file', 'media_type', 'media_created')
    list_filter = ('media_type',)
    actions = [export_csv]

class CommentAdmin(VersionAdmin):
    list_display = ('assigned_user', 'status', 'comments_en', 'comment_created')
    list_filter = ('status',)
    actions = [export_csv]

class PredefinedSearchAdmin(VersionAdmin):
    list_display = ('user', 'search_title', 'search_string', 'make_global')


class CorrobAdminRev(VersionAdmin, CorrobAdmin):
    list_display = ('title_en', 'type', 'bulletin_created', 'deleted')
    list_filter = ('type', 'deleted',)
    actions = [export_csv]

class CorrobAdminInRev(VersionAdmin, CorrobAdminIn):
    list_display = ('title_en', 'incident_created',)
    list_filter = ('deleted',)
    actions = [export_csv]

class TimeInfoAdminRev(VersionAdmin, TimeInfoAdmin):
    pass
#class test(LockableAdmin, CorrobAdminInRev):
    #list_display = ('get_lock_for_admin',)

class ActorStatusAdmin(VersionAdmin):
    pass


admin.site.register(Actor, ActorAdmin)
admin.site.register(ActorCondition, ActorConditionAdmin)
admin.site.register(ActorRole, ActorRoleAdmin)
admin.site.register(EventType, EventTypeAdmin)
admin.site.register(Bulletin, CorrobAdminRev)
admin.site.register(StatusUpdate, StatusUpdateAdmin)
admin.site.register(TimeInfo, TimeInfoAdminRev)
admin.site.register(Location, LocationAdmin)
admin.site.register(Source, SourceAdmin)
admin.site.register(SourceType, SourceTypeAdmin)
admin.site.register(Label, LabelAdmin)
admin.site.register(CrimeCategory, CrimeCategoryAdmin)
admin.site.register(Media, MediaAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(PredefinedSearch, PredefinedSearchAdmin)
admin.site.register(Incident, CorrobAdminInRev)
#admin.site.register(Incident, test)

admin.site.register(ActorStatus, ActorStatusAdmin)
