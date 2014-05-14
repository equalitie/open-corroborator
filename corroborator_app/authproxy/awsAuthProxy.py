from boto.s3.connection import S3Connection
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponseGone, \
    Http404

class AWSAuthProxy:

    def get_redirect_url(self, media_name):
        s3 = S3Connection(settings.AWS_ACCESS_KEY_ID,
                            settings.AWS_SECRET_ACCESS_KEY,
                            is_secure=True)
        # Create a URL valid for 60 seconds.
        return s3.generate_url(60, 'GET',
                            bucket=settings.AWS_STORAGE_BUCKET_NAME,
                            key=media_name,
                            force_http=True)

    def get(self, media_name):
        url = self.get_redirect_url(media_name)
            # The below is taken straight from RedirectView.
        if url:
            return HttpResponseRedirect(url)
        else:
            return http.HttpResponseGone()

