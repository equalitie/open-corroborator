# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corroborator_app', '0002_auto_20160308_1551'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='actorstatus',
            options={'verbose_name_plural': 'actor statuses'},
        ),
        migrations.AlterModelOptions(
            name='crimecategory',
            options={'verbose_name_plural': 'crime categories'},
        ),
        migrations.AlterModelOptions(
            name='media',
            options={'verbose_name_plural': 'media'},
        ),
        migrations.AlterModelOptions(
            name='predefinedsearch',
            options={'verbose_name_plural': 'predefined searches'},
        ),
        migrations.AlterField(
            model_name='source',
            name='reliability_score',
            field=models.IntegerField(null=True, verbose_name=b'reliability score', blank=True),
        ),
    ]
