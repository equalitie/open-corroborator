from django.http import HttpResponse, HttpResponseGone, \
    Http404
from django.conf import settings
import requests

class SolrAuthProxy():

    def __init__(self):
        self.solr_url = settings.SOLR_URL

    def parse_request(self, query):
        """
        Reroute solr request to local server
        """
        solr_response = self.get_solr_response(query)
        return HttpResponse(solr_response.text)
    
    def get_solr_response(self, query):
        """
        Return solr response to requester
        """
        request_url = settings.SOLR_URL
        
        request_url += '?' + query
        return requests.get(request_url)
