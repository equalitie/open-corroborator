from corroborator_app.models import Actor
from model_report.report import reports, ReportAdmin


class ActorModelReport(ReportAdmin):
    title = ('Actor Report')
    model = Actor
    fields = [
        'actor_modified',
        'fullname_en',
        'fullname_ar',
        'nickname_en',
        'nickname_ar',
        'age_en',
        'age_ar',
        'sex_en',
        'sex_ar',
        'civilian_en',
        'civilian_ar',
        'DOB',
        'date_of_death',
        'date_of_disappearance',
        'date_of_return',
        'date_of_detention',
        'occupation_en',
        'occupation_ar',
        'nationality_en',
        'nationality_ar',
        'position_en',
        'position_ar',
        'ethnicity_en',
        'ethnicity_ar',
        'religion_en',
        'religion_ar',
        'spoken_dialect_en',
        'spoken_dialect_ar',
        'origin_id',
        'age_numeric',
        'family_name_en',
        'family_name_ar',
        'national_id_card',
        'national_number',
        'legal_status_en',
        'legal_status_ar',
        'health_status_en',
        'health_status_ar',
        'family_status_en',
        'family_status_ar',
        'cause_of_death_en',
        'cause_of_death_ar',
        'POB',
        'current_location',
    ]
    list_order_by = ('actor_modified',)
    type = 'report'

reports.register('actor-report', ActorModelReport)
