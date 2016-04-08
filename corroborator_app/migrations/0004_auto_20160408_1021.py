# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corroborator_app', '0003_auto_20160324_1455'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actorcondition',
            name='name_ar',
            field=models.CharField(max_length=25, null=True, blank=True),
        ),
    ]
