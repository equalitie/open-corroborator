"""
This utility class generates and augments image using
the PIL library.

Bill Doran
2013/08/09

Updated: 13/10/2013
Cormac McGuire
Split Thumbnailer class into methods to facilitate easier testing,
Created FFMPEGWrapper class to create images from video frames
"""

__all__ = ('Thumbnailer', 'FFMPEGWrapper')

import StringIO
import time
from subprocess import Popen, PIPE, STDOUT

from PIL import Image

from django.core.files.uploadedfile import InMemoryUploadedFile


class Thumbnailer():
    '''
    create thumbnails from jpegs, letterbox them if the aspect ration differs
    from output aspect ratio
    '''
    def __init__(self):
        self._size = (90, 90)
        self._suffix = '_thumb.jpg'

    @property
    def size(self):
        ''' size of the thumbnail '''
        return self._size

    @size.setter
    def size(self, value):
        self._size = value

    @property
    def suffix(self):
        ''' size of the thumbnail '''
        return self._suffix

    @suffix.setter
    def suffix(self, value):
        self._suffix = value

    def calculate_offset(self, image):
        '''
        calculate the size of the letterboxing
        '''
        image_size = image.size
        offset_x = max((self.size[0] - image_size[0]) / 2, 0)
        offset_y = max((self.size[1] - image_size[1]) / 2, 0)
        offset_tuple = (offset_x, offset_y)
        return offset_tuple

    def read_image_from_file(self, inbound_file):
        '''
        read the image in from a file stream
        '''
        string_data = ""
        for chunk in inbound_file.chunks():
            string_data += chunk

        stream = StringIO.StringIO(string_data)
        image = Image.open(stream)
        return image

    def name_thumbnail(self, uploaded_file):
        '''
        assign a name
        '''
        filename_parts = uploaded_file.name.split('.')
        filename_parts.pop(len(filename_parts)-1)
        filename = reduce(name_concatenator, filename_parts, '')
        return filename + self.suffix

    def create_thumbnail_file_string(self, image, offset_tuple):
        '''
        take the PIL image, thumbnail it and write it to a string
        '''
        image.thumbnail(self.size, Image.ANTIALIAS)
        background = Image.new('RGBA', self.size, (208, 208, 208, 1))
        background.paste(
            image,
            offset_tuple
        )
        tempfile_io = StringIO.StringIO()
        background.save(tempfile_io, format='JPEG')
        return tempfile_io

    def construct_thumb_from_video(self, inbound_file):
        pass

    def construct_thumb_from_image(self, inbound_file):
        """
        This function return a thumbnail version of the original file
        to be saved for later display
        """
        image = self.read_image_from_file(inbound_file)
        offset_tuple = self.calculate_offset(image)
        thumb_name = self.name_thumbnail(inbound_file)
        tempfile_io = self.create_thumbnail_file_string(image, offset_tuple)

        media_thumb_file = InMemoryUploadedFile(
            tempfile_io,
            None,
            thumb_name,
            'image/jpeg',
            tempfile_io.len,
            None
        )
        return media_thumb_file


class MiniFFMPEGWrapper():
    '''
    wrap the functionality to grab a video as a jpeg for thumbnail creation
    '''
    def __init__(self):
        '''set defaults'''
        self.position = 1
        self.create_temp_filename()

    @property
    def position(self):
        '''position in the clip we want to take our thumbnamil from'''
        return self._position

    @position.setter
    def position(self, value):
        self._position = value

    @property
    def video_file(self):
        '''video file, should be a django uploaded file object'''
        return self._video_file

    @video_file.setter
    def video_file(self, value):
        self._video_file = value

    @property
    def out_filename(self):
        '''filename to write our temp jpeg to'''
        return self._out_filename

    @out_filename.setter
    def out_filename(self, value):
        self._out_filename = value

    def create_temp_filename(self):
        '''create a temp filename using a timestamp'''
        mylist = str(time.time()).split('.')
        timestamp_string = reduce(name_concatenator, mylist, '')
        self.out_filename = '/tmp/{}.jpg'.format(timestamp_string)
        return self.out_filename

    def create_jpeg_from_video(self):
        '''
        Try to load a frame of the given video with ffmpeg, ignoring all errors
        '''
        data = Popen([
            'ffmpeg',
            '-ss', str(self.position),
            '-i', self.video_file,
            '-vframes', '1',
            self.out_filename
            ],
            stdout=PIPE,
            stderr=STDOUT
        )
        out, err = data.communicate()
        if not data:
            return


def name_concatenator(name, part):
    return name + part
