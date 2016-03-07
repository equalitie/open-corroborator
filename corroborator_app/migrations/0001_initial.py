# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('reversion', '0002_auto_20141216_1509'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(default=b'', blank=True)),
                ('seq_order', models.IntegerField(null=True, blank=True)),
                ('fullname_en', models.CharField(max_length=255)),
                ('fullname_ar', models.CharField(max_length=255, blank=True)),
                ('nickname_en', models.CharField(max_length=255, null=True, blank=True)),
                ('nickname_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('age', models.CharField(blank=True, max_length=255, db_column=b'age_en', choices=[(b'Adult', 'adult'), (b'Child', 'child')])),
                ('sex', models.CharField(blank=True, max_length=255, db_column=b'sex_en', choices=[(b'Female', 'female'), (b'Male', 'male')])),
                ('civilian', models.CharField(blank=True, max_length=255, db_column=b'civilian_en', choices=[(b'Civilian', 'Civilian'), (b'Non-civilian', 'Non-civilian'), (b'Police', 'Police')])),
                ('occupation_en', models.CharField(max_length=255, null=True, blank=True)),
                ('occupation_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('nationality_en', models.CharField(max_length=255, null=True, blank=True)),
                ('nationality_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('position_en', models.CharField(max_length=255, null=True, blank=True)),
                ('position_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('ethnicity_en', models.CharField(max_length=255, null=True, blank=True)),
                ('ethnicity_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('religion_en', models.CharField(max_length=255, null=True, blank=True)),
                ('religion_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('spoken_dialect_en', models.CharField(max_length=255, null=True, blank=True)),
                ('spoken_dialect_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('family_status_en', models.CharField(max_length=255, null=True, blank=True)),
                ('family_status_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('cause_of_death_en', models.CharField(max_length=255, null=True, blank=True)),
                ('cause_of_death_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('legal_status_en', models.CharField(max_length=255, null=True, blank=True)),
                ('legal_status_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('health_status_en', models.CharField(max_length=255, null=True, blank=True)),
                ('health_status_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('DOB', models.DateField(null=True, verbose_name=b'date of birth', blank=True)),
                ('date_of_death', models.DateField(null=True, verbose_name=b'date of death', blank=True)),
                ('date_of_disappearance', models.DateField(null=True, verbose_name=b'date of disappearance', blank=True)),
                ('date_of_return', models.DateField(null=True, verbose_name=b'date of return', blank=True)),
                ('date_of_detention', models.DateField(null=True, verbose_name=b'date of detention', blank=True)),
                ('origin_id', models.CharField(max_length=255, null=True, blank=True)),
                ('age_numeric', models.IntegerField(null=True, blank=True)),
                ('family_name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('family_name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('national_id_card', models.CharField(max_length=255, null=True, blank=True)),
                ('national_number', models.CharField(max_length=255, null=True, blank=True)),
                ('deleted', models.BooleanField(default=False)),
                ('actor_created', models.DateTimeField(auto_now_add=True)),
                ('actor_modified', models.DateTimeField(auto_now=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ActorCondition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=25)),
                ('name_ar', models.CharField(max_length=25)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(null=True, blank=True)),
                ('key', models.CharField(unique=True, max_length=8)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ActorRelationship',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('relation_status', models.CharField(max_length=25, verbose_name=b'status', choices=[(b'Parent', b'parent'), (b'Sibling', b'sibling'), (b'Family member', b'family member'), (b'Superior officer', b'superior officer'), (b'Subordinate officer', b'subordiante officer')])),
                ('comments_en', models.TextField(null=True, blank=True)),
                ('comments_ar', models.TextField(null=True, blank=True)),
                ('actor', models.ForeignKey(related_name=b'actor_b', blank=True, to='corroborator_app.Actor', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ActorRole',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role_en', models.CharField(max_length=255, null=True, blank=True)),
                ('role_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('role_status', models.CharField(blank=True, max_length=25, null=True, verbose_name=b'status', choices=[(b'V', b'Victim'), (b'WN', b'Witness'), (b'P', b'Perpetrator'), (b'A', b'Appeared'), (b'O', b'Other')])),
                ('relation_status', models.CharField(blank=True, max_length=25, null=True, verbose_name=b'status', choices=[(b'P', b'Parent'), (b'S', b'Sibling'), (b'FM', b'Family member'), (b'SPO', b'Superior officer'), (b'SBO', b'Subordinate officer')])),
                ('comments_en', models.TextField(null=True, blank=True)),
                ('comments_ar', models.TextField(null=True, blank=True)),
                ('actor', models.ForeignKey(blank=True, to='corroborator_app.Actor', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ActorStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('status_en', models.CharField(max_length=255)),
                ('status_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Bulletin',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('seq_order', models.IntegerField(null=True, blank=True)),
                ('title_en', models.CharField(max_length=255)),
                ('title_ar', models.CharField(max_length=255, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(default=b'', blank=True)),
                ('uri', models.CharField(max_length=255, null=True, verbose_name=b'Media Link', blank=True)),
                ('confidence_score', models.IntegerField(null=True, verbose_name=b'confidence score', blank=True)),
                ('type', models.CharField(blank=True, max_length=25, verbose_name=b'type', choices=[(b'Video', b'video'), (b'Picture', b'picture'), (b'Report', b'report'), (b'News', b'news')])),
                ('bulletin_created', models.DateTimeField(auto_now_add=True)),
                ('bulletin_modified', models.DateTimeField(auto_now=True)),
                ('origin_id', models.CharField(max_length=255, null=True, blank=True)),
                ('deleted', models.BooleanField(default=False)),
                ('actors_role', models.ManyToManyField(to='corroborator_app.ActorRole', null=True, blank=True)),
                ('assigned_user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comments_en', models.TextField(blank=True)),
                ('comments_ar', models.TextField(null=True, blank=True)),
                ('comment_created', models.DateTimeField(auto_now_add=True)),
                ('assigned_user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['comment_created'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CrimeCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('level', models.IntegerField(null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(null=True, blank=True)),
                ('parent', models.CharField(max_length=255, null=True, blank=True)),
                ('ref_crime', models.ForeignKey(blank=True, to='corroborator_app.CrimeCategory', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Dialect',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Ethnicity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EventType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('incident_details_en', models.TextField(null=True, blank=True)),
                ('incident_details_ar', models.TextField(null=True, blank=True)),
                ('confidence_score', models.IntegerField(max_length=3, null=True, verbose_name=b'confidence score', blank=True)),
                ('title_en', models.TextField()),
                ('title_ar', models.TextField(blank=True)),
                ('incident_created', models.DateTimeField(auto_now_add=True)),
                ('incident_modified', models.DateTimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('actors_role', models.ManyToManyField(to='corroborator_app.ActorRole', null=True, blank=True)),
                ('assigned_user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('crimes', models.ManyToManyField(to='corroborator_app.CrimeCategory', null=True, blank=True)),
                ('incident_comments', models.ManyToManyField(to='corroborator_app.Comment', null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(null=True, blank=True)),
                ('ref_label', models.ForeignKey(blank=True, to='corroborator_app.Label', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('latitude', models.FloatField(null=True, blank=True)),
                ('longitude', models.FloatField(null=True, blank=True)),
                ('loc_type', models.CharField(max_length=25, verbose_name=b'location type', choices=[(b'G', b'Governates'), (b'D', b'Districts'), (b'S', b'Subdistricts')])),
                ('parent_text', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(null=True, blank=True)),
                ('location_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('location_modified', models.DateTimeField(auto_now=True, null=True)),
                ('parent_location', models.ForeignKey(blank=True, to='corroborator_app.Location', max_length=255, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('media_file', models.FileField(upload_to=b'media')),
                ('media_thumb_file', models.FileField(null=True, upload_to=b'media')),
                ('media_type', models.CharField(max_length=25, verbose_name=b'type', choices=[(b'Video', b'video'), (b'Picture', b'picture'), (b'Document', b'document')])),
                ('media_file_type', models.CharField(max_length=255, null=True, blank=True)),
                ('media_created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MonitorUpdate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('update_timestamp', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Nationality',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PredefinedSearch',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('search_title', models.TextField(null=True, blank=True)),
                ('search_string', models.TextField(null=True, blank=True)),
                ('actor_filters', models.TextField(null=True, blank=True)),
                ('incident_filters', models.TextField(null=True, blank=True)),
                ('bulletin_filters', models.TextField(null=True, blank=True)),
                ('make_global', models.BooleanField(default=False)),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RelationType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Religion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RoleType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.CharField(max_length=255, null=True, blank=True)),
                ('description_ar', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SolrUpdate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('update_timestamp', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name_en', models.CharField(max_length=255, null=True, blank=True)),
                ('name_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('reliability_score', models.IntegerField(max_length=3, verbose_name=b'reliability score', blank=True)),
                ('comments_en', models.TextField(null=True, blank=True)),
                ('comments_ar', models.TextField(null=True, blank=True)),
                ('ref_source', models.ForeignKey(blank=True, to='corroborator_app.Source', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SourceType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('source_type', models.CharField(max_length=255, verbose_name=b'source type')),
                ('description', models.TextField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='StatusUpdate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('key', models.CharField(max_length=20)),
                ('status_en', models.CharField(max_length=255)),
                ('status_ar', models.CharField(max_length=255, null=True, blank=True)),
                ('description_en', models.TextField(null=True, blank=True)),
                ('description_ar', models.TextField(null=True, blank=True)),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'permissions': (('can_update_to_finalized', 'Can finalize an entity'), ('can_update', 'Can update'), ('can_update_to_reviewed', 'Can review and entity')),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TimeInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time_from', models.DateTimeField(null=True, blank=True)),
                ('time_to', models.DateTimeField(null=True, blank=True)),
                ('comments_en', models.TextField(null=True, blank=True)),
                ('comments_ar', models.TextField(null=True, blank=True)),
                ('event_name_en', models.CharField(max_length=255, null=True, verbose_name=b'event name en', blank=True)),
                ('event_name_ar', models.CharField(max_length=255, null=True, verbose_name=b'event name ar', blank=True)),
                ('confidence_score', models.IntegerField(max_length=3, null=True, blank=True)),
                ('event_location', models.ForeignKey(blank=True, to='corroborator_app.Location', null=True)),
                ('event_type', models.ForeignKey(blank=True, to='corroborator_app.EventType', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserLog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('login', models.DateTimeField(null=True, blank=True)),
                ('logout', models.DateTimeField(null=True, blank=True)),
                ('total_seconds', models.FloatField(null=True, blank=True)),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='VersionStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('status', models.CharField(max_length=255)),
                ('version_timestamp', models.DateTimeField(auto_now=True)),
                ('revision', models.OneToOneField(to='reversion.Revision')),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='source',
            name='source_type',
            field=models.ForeignKey(blank=True, to='corroborator_app.SourceType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='incident',
            name='labels',
            field=models.ManyToManyField(to='corroborator_app.Label', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='incident',
            name='locations',
            field=models.ManyToManyField(to='corroborator_app.Location', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='incident',
            name='ref_bulletins',
            field=models.ManyToManyField(to='corroborator_app.Bulletin', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='incident',
            name='ref_incidents',
            field=models.ManyToManyField(related_name='ref_incidents_rel_+', null=True, to='corroborator_app.Incident', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='incident',
            name='times',
            field=models.ManyToManyField(to='corroborator_app.TimeInfo', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='comment',
            name='status',
            field=models.ForeignKey(blank=True, to='corroborator_app.StatusUpdate', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='bulletin_comments',
            field=models.ManyToManyField(to='corroborator_app.Comment', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='bulletin_imported_comments',
            field=models.ManyToManyField(related_name=b'bulletin_imported_comments', null=True, to='corroborator_app.Comment', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='labels',
            field=models.ManyToManyField(to='corroborator_app.Label', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='locations',
            field=models.ManyToManyField(to='corroborator_app.Location', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='medias',
            field=models.ManyToManyField(to='corroborator_app.Media', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='ref_bulletins',
            field=models.ManyToManyField(related_name='ref_bulletins_rel_+', null=True, to='corroborator_app.Bulletin', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='sources',
            field=models.ManyToManyField(to='corroborator_app.Source', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bulletin',
            name='times',
            field=models.ManyToManyField(to='corroborator_app.TimeInfo', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actorrole',
            name='relation',
            field=models.ForeignKey(blank=True, to='corroborator_app.RelationType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actorrole',
            name='role',
            field=models.ForeignKey(blank=True, to='corroborator_app.RoleType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='POB',
            field=models.ForeignKey(related_name=b'POB', blank=True, to='corroborator_app.Location', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='actor_comments',
            field=models.ManyToManyField(to='corroborator_app.Comment', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='actors_role',
            field=models.ManyToManyField(related_name=b'actors_role', null=True, to='corroborator_app.ActorRole', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='assigned_user',
            field=models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='condition',
            field=models.ForeignKey(blank=True, to='corroborator_app.ActorCondition', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='current_location',
            field=models.ForeignKey(related_name=b'actor_current', blank=True, to='corroborator_app.Location', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='disappearance_location',
            field=models.ForeignKey(blank=True, to='corroborator_app.Location', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='labels',
            field=models.ManyToManyField(to='corroborator_app.Label', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='media',
            field=models.ForeignKey(blank=True, to='corroborator_app.Media', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='place_of_death',
            field=models.ForeignKey(related_name=b'place_of_death', blank=True, to='corroborator_app.Location', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='sources',
            field=models.ManyToManyField(to='corroborator_app.Source', null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='actor',
            name='times',
            field=models.ManyToManyField(to='corroborator_app.TimeInfo', null=True, blank=True),
            preserve_default=True,
        ),
    ]
