from django.contrib import auth
from django.conf import settings
from django.db.models import signals
from django.utils.http import cookie_date
from django.utils import timezone
import sys


class SessionAuditMiddleware(object):
    def process_request(self, request):
        if request.user.is_authenticated():
            if 'lastRequest' in request.session:
                elapsedTime = timezone.now() - \
                              request.session['lastRequest']
                print >> sys.stderr, "** %s **" % elapsedTime
                if elapsedTime.seconds >= settings.CORROBORATOR_LOGIN_TIMEOUT:
                    auth.logout(request)

            request.session['lastRequest'] = timezone.now()
        else:
            if 'lastRequest' in request.session:
                del request.session['lastRequest'] 

        return None
