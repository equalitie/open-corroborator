from celery import task
from haystack.management.commands import update_index
from corroborator_app.models import SolrUpdate
from django.contrib.auth.models import User

@task
def update_object(username):
    options = {}
    options['age']=0.01
    options['remove']=True
    update_index.Command().handle(**options)
    solrUpdateByUser = SolrUpdate.objects.all()
    user = User.objects.filter(username=username)
    if len(solrUpdateByUser) == 0:
        newUpdate = SolrUpdate(user=user[0])
        newUpdate.save()
    else:
        solrUpdateByUser[0].user=user[0]
        solrUpdateByUser[0].save()
@task
def remove_object(index, instance, using=None):
    index.remove_object(instance, using=using)
