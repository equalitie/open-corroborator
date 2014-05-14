"""
Author: Cormac McGuire
Created: 10/10/2013
Test the thumbnail creation on both image and video files
"""
import os
import mimetypes

from django.test import TestCase
from django.core.files.uploadedfile import UploadedFile

from corroborator_app.utilities.imageTools import Thumbnailer, \
    MiniFFMPEGWrapper


class ThumbnailerTestCase(TestCase):
    '''
    test thumbnail creation for both images and videos
    '''

    def setUp(self):
        '''
        initialisation for tests
        '''
        self.thumbnailer = Thumbnailer()

    def tearDown(self):
        '''
        cleanup for tests
        '''
        pass

    def test_image_thumbnail_creation(self):
        '''
        end to end test for thumbnail creation for image files
        '''
        test_file_path = 'corroborator_app/fixtures/images.jpeg'
        test_file = open(test_file_path)
        uploaded_file = UploadedFile(test_file)
        memory_file =\
            self.thumbnailer.construct_thumb_from_image(uploaded_file)
        self.assertEqual(memory_file.content_type, 'image/jpeg')

    def test_offset_calc(self):
        '''
        test the offset is calculated correctly
        '''
        class MockImage():
            size = [100, 100]

        image = MockImage()
        offset_tuple = self.thumbnailer.calculate_offset(image)
        self.assertEqual(offset_tuple, (0, 0))

    def test_file_read(self):
        '''
        test that a file is read correctly
        '''
        test_file_path = 'corroborator_app/fixtures/images.jpeg'
        test_file = open(test_file_path)
        uploaded_file = UploadedFile(test_file)
        image = self.thumbnailer.read_image_from_file(uploaded_file)
        self.assertEqual(image.size, (259, 194))

    def test_name_file(self):
        '''
        test that the thumb gets named correctly
        '''
        test_file_path = 'corroborator_app/fixtures/images.jpeg'
        test_file = open(test_file_path)
        uploaded_file = UploadedFile(test_file)
        filename = self.thumbnailer.name_thumbnail(uploaded_file)
        self.assertEqual('images_thumb.jpg', filename)


class FFMPEGTestCase(TestCase):
    '''
    test the frame grab from ffmpeg
    '''

    def setUp(self):
        '''
        initialisation for tests
        '''
        self.ffmpeg_wrapper = MiniFFMPEGWrapper()

    def tearDown(self):
        '''
        cleanup for tests
        '''
        pass

    def test_image_generation(self):
        '''
        test that the image file gets generated from the video
        '''
        test_file_path = 'corroborator_app/fixtures/auth.m4v'
        self.ffmpeg_wrapper.video_file = test_file_path
        self.ffmpeg_wrapper.create_temp_filename()
        self.ffmpeg_wrapper.create_jpeg_from_video()
        self.assertIn(
            'image/jpeg',
            mimetypes.guess_type(self.ffmpeg_wrapper.out_filename)
        )
        os.remove(self.ffmpeg_wrapper.out_filename)
