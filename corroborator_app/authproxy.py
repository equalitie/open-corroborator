from boto.s3.connection import S3Connection
from django.contrib.auth.models import User
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponseGone, \
    Http404
import requests

class AWSAuthProxy:

    def get_redirect_url(self, **kwargs):
        s3 = S3Connection(settings.AWS_ACCESS_KEY_ID,
                            settings.AWS_SECRET_ACCESS_KEY,
                            is_secure=True)
        # Create a URL valid for 60 seconds.
        return s3.generate_url(60, 'GET',
                            bucket=settings.AWS_STORAGE_BUCKET_NAME,
                            key=kwargs['filepath'],
                            force_http=True)

    def get(self, media_name):
        filepath = settings.MEDIA_DIRECTORY + m.private_file
        url = self.get_redirect_url(filepath=filepath)
            # The below is taken straight from RedirectView.
        if url:
            return HttpResponseRedirect(url)
        else:
            return http.HttpResponseGone()

class SolrAuthProxy:

    def __init__(self):
        self.solr_url = ''

    def get_solr_response(self, kwargs):
        request_url = settings.SOLR_URL
        request_url += '?' + kwargs['QUERY_STRING']
        return requests.get(request_url)

    def parse_request(self, kwargs):
        print kwargs
        solr_response = self.get_solr_response(kwargs)
        return HttpResponse(solr_response.text)
