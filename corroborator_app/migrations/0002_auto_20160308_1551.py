# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('corroborator_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actor',
            name='actor_comments',
            field=models.ManyToManyField(to='corroborator_app.Comment', blank=True),
        ),
        migrations.AlterField(
            model_name='actor',
            name='actors_role',
            field=models.ManyToManyField(related_name='actors_role', to='corroborator_app.ActorRole', blank=True),
        ),
        migrations.AlterField(
            model_name='actor',
            name='labels',
            field=models.ManyToManyField(to='corroborator_app.Label', blank=True),
        ),
        migrations.AlterField(
            model_name='actor',
            name='sources',
            field=models.ManyToManyField(to='corroborator_app.Source', blank=True),
        ),
        migrations.AlterField(
            model_name='actor',
            name='times',
            field=models.ManyToManyField(to='corroborator_app.TimeInfo', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='actors_role',
            field=models.ManyToManyField(to='corroborator_app.ActorRole', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='bulletin_comments',
            field=models.ManyToManyField(to='corroborator_app.Comment', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='bulletin_imported_comments',
            field=models.ManyToManyField(related_name='bulletin_imported_comments', to='corroborator_app.Comment', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='labels',
            field=models.ManyToManyField(to='corroborator_app.Label', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='locations',
            field=models.ManyToManyField(to='corroborator_app.Location', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='medias',
            field=models.ManyToManyField(to='corroborator_app.Media', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='ref_bulletins',
            field=models.ManyToManyField(related_name='ref_bulletins_rel_+', to='corroborator_app.Bulletin', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='sources',
            field=models.ManyToManyField(to='corroborator_app.Source', blank=True),
        ),
        migrations.AlterField(
            model_name='bulletin',
            name='times',
            field=models.ManyToManyField(to='corroborator_app.TimeInfo', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='actors_role',
            field=models.ManyToManyField(to='corroborator_app.ActorRole', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='confidence_score',
            field=models.IntegerField(null=True, verbose_name=b'confidence score', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='crimes',
            field=models.ManyToManyField(to='corroborator_app.CrimeCategory', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='incident_comments',
            field=models.ManyToManyField(to='corroborator_app.Comment', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='labels',
            field=models.ManyToManyField(to='corroborator_app.Label', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='locations',
            field=models.ManyToManyField(to='corroborator_app.Location', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='ref_bulletins',
            field=models.ManyToManyField(to='corroborator_app.Bulletin', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='ref_incidents',
            field=models.ManyToManyField(related_name='ref_incidents_rel_+', to='corroborator_app.Incident', blank=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='times',
            field=models.ManyToManyField(to='corroborator_app.TimeInfo', blank=True),
        ),
        migrations.AlterField(
            model_name='source',
            name='reliability_score',
            field=models.IntegerField(verbose_name=b'reliability score', blank=True),
        ),
        migrations.AlterField(
            model_name='timeinfo',
            name='confidence_score',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
