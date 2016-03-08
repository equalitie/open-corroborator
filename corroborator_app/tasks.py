from celery import task
from haystack.management.commands import update_index
from corroborator_app.models import SolrUpdate
from django.contrib.auth.models import User
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@task
def update_object(username):
    options = {}
    options['age']=0.01
    options['remove']=True
    update_index.Command().handle(**options)
    user = User.objects.filter(username=username)
    if user:
        solrUpdateByUser = SolrUpdate.objects.all()
        if len(solrUpdateByUser) == 0:
            newUpdate = SolrUpdate(user=user[0])
            newUpdate.save()
        else:
            solrUpdateByUser[0].user=user[0]
            solrUpdateByUser[0].save()
    else:
        logger.error("Unknown username: {} (SolrUpdate record not updated)".format(username))  #may not matter too much, since search polling seems to be off?
@task
def remove_object(index, instance, using=None):
    index.remove_object(instance, using=using)
