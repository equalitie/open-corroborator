from django.db import models
from django.db.models import Min,  Max
from corroborator_app.models import Actor

class ActorRelationship(models.Model):
    """
    The Actor Relationship model captures the interrelation between actors.
    This can include shared events,  familial connections,  insititutional 
    relationships or rank.
    """
    RELATION = (
        ('Parent', 'parent'),
        ('Sibling', 'sibling'),
        ('Family member', 'family member'),
        ('Superior officer', 'superior officer'),
        ('Subordinate officer', 'subordiante officer'),
    )
    relation_status = models.CharField('status', max_length=25, choices=RELATION)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    actor = models.ForeignKey(Actor, blank=True, null=True,
        related_name='actor_b')
    def __unicode__(self):
        return self.actor.fullname_en + ': ' + self.relation_status


