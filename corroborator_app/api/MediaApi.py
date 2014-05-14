"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for media model, requires apikey auth
tests in tests/api/tests.py
"""
from django.conf import settings
from django.core.files.uploadedfile import UploadedFile

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.tasks import update_object

from corroborator_app.models import Media
from corroborator_app.utilities.imageTools import Thumbnailer,\
    MiniFFMPEGWrapper
__all__ = ('MediaResource', )


class MultipartResource(object):
    def deserialize(self, request, data, format=None):

        if not format:
            format = request.META.get('CONTENT_TYPE', 'application/json')

        if format == 'application/x-www-form-urlencoded':
            return request.POST

        if format.startswith('multipart'):
            data = request.POST.copy()
            data.update(request.FILES)
            return data

        return super(MultipartResource, self)\
            .deserialize(request, data, format)


class MediaResource(MultipartResource, ModelResource):
    """
    tastypie api implementation for media model
    """
    media_file = fields.FileField(
        attribute='media_file',
        null=True,
        blank=True
    )
    media_thumb_file = fields.FileField(
        attribute='media_thumb_file',
        null=True,
        blank=True
    )

    class Meta:
        queryset = Media.objects.all()
        resource_name = 'media'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def dehydrate(self, bundle):
        '''
        formatting for media_files
        '''
        try:
            bundle.data['media_file'] = \
                settings.S3_PROXY_URL + '' + bundle.obj.media_file.name
            bundle.data['media_thumb_file'] = \
                settings.S3_PROXY_URL + '' + bundle.obj.media_thumb_file.name
        except:
            pass
        return bundle

    def obj_create(self, bundle, **kwargs):
        username = bundle.request.GET['username']
        media_file = bundle.data['media_file']
        bundle.data['media_type'] = 'Document'

        if 'video' in bundle.data['media_file'].content_type:
            bundle.data['media_type'] = 'Video'
            #ffmpeg_wrapper = MiniFFMPEGWrapper()
            #ffmpeg_wrapper.video_file = media_file.temporary_file_path()
            #ffmpeg_wrapper.create_jpeg_from_video()
            #thumb_source_file = UploadedFile(ffmpeg_wrapper.out_filename)
            #thumbnailer = Thumbnailer()
            #bundle.data['media_thumb_file'] =\
                #thumbnailer.construct_thumb_from_image(
                    #thumb_source_file
                #)

        if 'image' in bundle.data['media_file'].content_type:
            bundle.data['media_type'] = 'Picture'
            media_thumb_file = Thumbnailer()\
                .construct_thumb_from_image(media_file)
            bundle.data['media_thumb_file'] = media_thumb_file

        if 'pdf' in bundle.data['media_file'].content_type:
            bundle.data['media_type'] = 'Pdf'

        parts = media_file.name.split('.')
        media_file_type = parts[len(parts)-1]
        bundle.data['media_file_type'] = media_file_type
        bundle = super(MediaResource, self).obj_create(bundle, **kwargs)
        update_object.delay(username)
        return bundle
