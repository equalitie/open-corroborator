# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'PredefinedSearch'
        db.create_table(u'corroborator_app_predefinedsearch', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('search_request', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('search_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
        ))
        db.send_create_signal(u'corroborator_app', ['PredefinedSearch'])

        # Adding model 'StatusUpdate'
        db.create_table(u'corroborator_app_statusupdate', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('status_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('status_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['StatusUpdate'])

        # Adding model 'Comment'
        db.create_table(u'corroborator_app_comment', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('assigned_user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('status', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.StatusUpdate'], null=True, blank=True)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comment_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Comment'])

        # Adding model 'TimeInfo'
        db.create_table(u'corroborator_app_timeinfo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('time_from', self.gf('django.db.models.fields.DateTimeField')()),
            ('time_to', self.gf('django.db.models.fields.DateTimeField')()),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('event_name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('event_name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
        ))
        db.send_create_signal(u'corroborator_app', ['TimeInfo'])

        # Adding model 'Location'
        db.create_table(u'corroborator_app_location', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('latitude', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('longitude', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('loc_type', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('parent_text', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('parent_location', self.gf('django.db.models.fields.related.ForeignKey')(max_length=255, to=orm['corroborator_app.Location'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Location'])

        # Adding model 'Label'
        db.create_table(u'corroborator_app_label', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_label', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Label'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Label'])

        # Adding model 'CrimeCategory'
        db.create_table(u'corroborator_app_crimecategory', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('category_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('category_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('level', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_crime', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.CrimeCategory'], null=True, blank=True)),
            ('parent', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['CrimeCategory'])

        # Adding model 'SourceType'
        db.create_table(u'corroborator_app_sourcetype', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('source_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['SourceType'])

        # Adding model 'Source'
        db.create_table(u'corroborator_app_source', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('reliability_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
            ('source_type', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.SourceType'], null=True, blank=True)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_source', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Source'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Source'])

        # Adding model 'Dialect'
        db.create_table(u'corroborator_app_dialect', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Dialect'])

        # Adding model 'Position'
        db.create_table(u'corroborator_app_position', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Position'])

        # Adding model 'Occupation'
        db.create_table(u'corroborator_app_occupation', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Occupation'])

        # Adding model 'Ethnicity'
        db.create_table(u'corroborator_app_ethnicity', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Ethnicity'])

        # Adding model 'Religion'
        db.create_table(u'corroborator_app_religion', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Religion'])

        # Adding model 'Nationality'
        db.create_table(u'corroborator_app_nationality', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Nationality'])

        # Adding model 'Media'
        db.create_table(u'corroborator_app_media', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('media_file', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('media_type', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('media_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Media'])

        # Adding model 'Actor'
        db.create_table(u'corroborator_app_actor', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('fullname_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('fullname_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nickname_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nickname_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('age_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('age_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('sex_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('sex_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('civilian_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('civilian_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('DOB', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('POB', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='POB', null=True, to=orm['corroborator_app.Location'])),
            ('occupation_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('occupation_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nationality_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nationality_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('position_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('position_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('ethnicity_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('ethnicity_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('religion_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('religion_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('spoken_dialect_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('spoken_dialect_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('current_location', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_current', null=True, to=orm['corroborator_app.Location'])),
            ('media', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Media'], null=True, blank=True)),
            ('actor_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Actor'])

        # Adding model 'ActorRelationship'
        db.create_table(u'corroborator_app_actorrelationship', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('relation_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('actor_a', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_a', null=True, to=orm['corroborator_app.Actor'])),
            ('actor_b', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_b', null=True, to=orm['corroborator_app.Actor'])),
        ))
        db.send_create_signal(u'corroborator_app', ['ActorRelationship'])

        # Adding model 'ActorRole'
        db.create_table(u'corroborator_app_actorrole', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('role_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('role_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('role_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('actor', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Actor'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['ActorRole'])

        # Adding model 'Bulletin'
        db.create_table(u'corroborator_app_bulletin', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('assigned_user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('title_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('title_ar', self.gf('django.db.models.fields.CharField')(default='', max_length=255, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(default='', blank=True)),
            ('uri', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')()),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('bulletin_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Bulletin'])

        # Adding M2M table for field bulletin_comments on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_bulletin_comments')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('comment', models.ForeignKey(orm[u'corroborator_app.comment'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'comment_id'])

        # Adding M2M table for field actors_role on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_actors_role')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('actorrole', models.ForeignKey(orm[u'corroborator_app.actorrole'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'actorrole_id'])

        # Adding M2M table for field times on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_times')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('timeinfo', models.ForeignKey(orm[u'corroborator_app.timeinfo'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'timeinfo_id'])

        # Adding M2M table for field medias on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_medias')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('media', models.ForeignKey(orm[u'corroborator_app.media'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'media_id'])

        # Adding M2M table for field locations on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_locations')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('location', models.ForeignKey(orm[u'corroborator_app.location'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'location_id'])

        # Adding M2M table for field labels on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_labels')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('label', models.ForeignKey(orm[u'corroborator_app.label'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'label_id'])

        # Adding M2M table for field sources on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_sources')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('source', models.ForeignKey(orm[u'corroborator_app.source'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'source_id'])

        # Adding M2M table for field ref_bulletins on 'Bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_ref_bulletins')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('from_bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('to_bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False))
        ))
        db.create_unique(m2m_table_name, ['from_bulletin_id', 'to_bulletin_id'])

        # Adding model 'Incident'
        db.create_table(u'corroborator_app_incident', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('incident_details_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('incident_details_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
            ('title_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('title_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('assigned_user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('incident_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Incident'])

        # Adding M2M table for field incident_comments on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_incident_comments')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('comment', models.ForeignKey(orm[u'corroborator_app.comment'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'comment_id'])

        # Adding M2M table for field ref_incidents on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_ref_incidents')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('from_incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('to_incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False))
        ))
        db.create_unique(m2m_table_name, ['from_incident_id', 'to_incident_id'])

        # Adding M2M table for field bulletins on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_bulletins')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'bulletin_id'])

        # Adding M2M table for field actors_role on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_actors_role')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('actorrole', models.ForeignKey(orm[u'corroborator_app.actorrole'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'actorrole_id'])

        # Adding M2M table for field crimes on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_crimes')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('crimecategory', models.ForeignKey(orm[u'corroborator_app.crimecategory'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'crimecategory_id'])

        # Adding M2M table for field labels on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_labels')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('label', models.ForeignKey(orm[u'corroborator_app.label'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'label_id'])

        # Adding M2M table for field times on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_times')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('timeinfo', models.ForeignKey(orm[u'corroborator_app.timeinfo'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'timeinfo_id'])

        # Adding M2M table for field locations on 'Incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_locations')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('location', models.ForeignKey(orm[u'corroborator_app.location'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'location_id'])


    def backwards(self, orm):
        # Deleting model 'PredefinedSearch'
        db.delete_table(u'corroborator_app_predefinedsearch')

        # Deleting model 'StatusUpdate'
        db.delete_table(u'corroborator_app_statusupdate')

        # Deleting model 'Comment'
        db.delete_table(u'corroborator_app_comment')

        # Deleting model 'TimeInfo'
        db.delete_table(u'corroborator_app_timeinfo')

        # Deleting model 'Location'
        db.delete_table(u'corroborator_app_location')

        # Deleting model 'Label'
        db.delete_table(u'corroborator_app_label')

        # Deleting model 'CrimeCategory'
        db.delete_table(u'corroborator_app_crimecategory')

        # Deleting model 'SourceType'
        db.delete_table(u'corroborator_app_sourcetype')

        # Deleting model 'Source'
        db.delete_table(u'corroborator_app_source')

        # Deleting model 'Dialect'
        db.delete_table(u'corroborator_app_dialect')

        # Deleting model 'Position'
        db.delete_table(u'corroborator_app_position')

        # Deleting model 'Occupation'
        db.delete_table(u'corroborator_app_occupation')

        # Deleting model 'Ethnicity'
        db.delete_table(u'corroborator_app_ethnicity')

        # Deleting model 'Religion'
        db.delete_table(u'corroborator_app_religion')

        # Deleting model 'Nationality'
        db.delete_table(u'corroborator_app_nationality')

        # Deleting model 'Media'
        db.delete_table(u'corroborator_app_media')

        # Deleting model 'Actor'
        db.delete_table(u'corroborator_app_actor')

        # Deleting model 'ActorRelationship'
        db.delete_table(u'corroborator_app_actorrelationship')

        # Deleting model 'ActorRole'
        db.delete_table(u'corroborator_app_actorrole')

        # Deleting model 'Bulletin'
        db.delete_table(u'corroborator_app_bulletin')

        # Removing M2M table for field bulletin_comments on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_bulletin_comments'))

        # Removing M2M table for field actors_role on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_actors_role'))

        # Removing M2M table for field times on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_times'))

        # Removing M2M table for field medias on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_medias'))

        # Removing M2M table for field locations on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_locations'))

        # Removing M2M table for field labels on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_labels'))

        # Removing M2M table for field sources on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_sources'))

        # Removing M2M table for field ref_bulletins on 'Bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_ref_bulletins'))

        # Deleting model 'Incident'
        db.delete_table(u'corroborator_app_incident')

        # Removing M2M table for field incident_comments on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_incident_comments'))

        # Removing M2M table for field ref_incidents on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_ref_incidents'))

        # Removing M2M table for field bulletins on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_bulletins'))

        # Removing M2M table for field actors_role on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_actors_role'))

        # Removing M2M table for field crimes on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_crimes'))

        # Removing M2M table for field labels on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_labels'))

        # Removing M2M table for field times on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_times'))

        # Removing M2M table for field locations on 'Incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_locations'))


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'corroborator_app.actor': {
            'DOB': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'Actor'},
            'POB': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'POB'", 'null': 'True', 'to': u"orm['corroborator_app.Location']"}),
            'actor_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'age_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'age_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'civilian_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'civilian_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'current_location': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_current'", 'null': 'True', 'to': u"orm['corroborator_app.Location']"}),
            'ethnicity_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ethnicity_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fullname_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fullname_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Media']", 'null': 'True', 'blank': 'True'}),
            'nationality_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nationality_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nickname_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nickname_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'occupation_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'occupation_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'position_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'position_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'religion_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'religion_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'sex_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'sex_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'spoken_dialect_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'spoken_dialect_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.actorrelationship': {
            'Meta': {'object_name': 'ActorRelationship'},
            'actor_a': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_a'", 'null': 'True', 'to': u"orm['corroborator_app.Actor']"}),
            'actor_b': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_b'", 'null': 'True', 'to': u"orm['corroborator_app.Actor']"}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'relation_status': ('django.db.models.fields.CharField', [], {'max_length': '25'})
        },
        u'corroborator_app.actorrole': {
            'Meta': {'object_name': 'ActorRole'},
            'actor': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Actor']", 'null': 'True', 'blank': 'True'}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'role_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_status': ('django.db.models.fields.CharField', [], {'max_length': '25'})
        },
        u'corroborator_app.bulletin': {
            'Meta': {'object_name': 'Bulletin'},
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.ActorRole']", 'null': 'True', 'blank': 'True'}),
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'bulletin_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Comment']", 'null': 'True', 'blank': 'True'}),
            'bulletin_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {}),
            'description_ar': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'medias': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Media']", 'null': 'True', 'blank': 'True'}),
            'ref_bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_bulletins_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.Bulletin']"}),
            'sources': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Source']", 'null': 'True', 'blank': 'True'}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.TimeInfo']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'blank': 'True'}),
            'title_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'uri': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.comment': {
            'Meta': {'ordering': "['comment_created']", 'object_name': 'Comment'},
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'comment_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.StatusUpdate']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.crimecategory': {
            'Meta': {'object_name': 'CrimeCategory'},
            'category_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'category_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'parent': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ref_crime': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.CrimeCategory']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.dialect': {
            'Meta': {'object_name': 'Dialect'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.ethnicity': {
            'Meta': {'object_name': 'Ethnicity'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.incident': {
            'Meta': {'object_name': 'Incident'},
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.ActorRole']", 'null': 'True', 'blank': 'True'}),
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Bulletin']", 'null': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'crimes': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.CrimeCategory']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'incident_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Comment']", 'null': 'True', 'blank': 'True'}),
            'incident_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'incident_details_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'incident_details_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'ref_incidents': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_incidents_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.Incident']"}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.TimeInfo']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'title_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.label': {
            'Meta': {'object_name': 'Label'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ref_label': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.location': {
            'Meta': {'object_name': 'Location'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'loc_type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'longitude': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'parent_location': ('django.db.models.fields.related.ForeignKey', [], {'max_length': '255', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'parent_text': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.media': {
            'Meta': {'object_name': 'Media'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'media_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'media_type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.nationality': {
            'Meta': {'object_name': 'Nationality'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.occupation': {
            'Meta': {'object_name': 'Occupation'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.position': {
            'Meta': {'object_name': 'Position'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.predefinedsearch': {
            'Meta': {'object_name': 'PredefinedSearch'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'search_request': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'search_type': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.religion': {
            'Meta': {'object_name': 'Religion'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.source': {
            'Meta': {'object_name': 'Source'},
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ref_source': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Source']", 'null': 'True', 'blank': 'True'}),
            'reliability_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'source_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.SourceType']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.sourcetype': {
            'Meta': {'object_name': 'SourceType'},
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'source_type': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        u'corroborator_app.statusupdate': {
            'Meta': {'object_name': 'StatusUpdate'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'status_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.timeinfo': {
            'Meta': {'object_name': 'TimeInfo'},
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'event_name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'event_name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'time_from': ('django.db.models.fields.DateTimeField', [], {}),
            'time_to': ('django.db.models.fields.DateTimeField', [], {})
        }
    }

    complete_apps = ['corroborator_app']