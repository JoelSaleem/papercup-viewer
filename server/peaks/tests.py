import io
import os
from pathlib import Path
from django.core.files.uploadedfile import InMemoryUploadedFile

from django.test import TestCase
from .media_util import get_audio_file_list, is_valid_filename, \
    save_file_to_media, is_file_of_extension, get_media_dir, \
    get_media_file_path, get_audio_wav, get_waveform_json, \
    InvalidFilenameException

class TestDir:
    '''
    Temoporarily creates a test directory, in a context manager
    The directory is created on enter, and destroyed on exit
    '''
    def __init__(self, directory_name, files):
        self.dir = directory_name
        self.files = files

    def __enter__(self):
        os.mkdir(self.dir)
        for filename in self.files:
            Path(self.dir + '/' + filename).touch()
            
        return self

    def __exit__(self, *args, **kwargs):
        for filename in self.files:
            os.unlink(self.dir + '/' + filename)
        os.rmdir(self.dir)

class MediaUtilsTestCase(TestCase):
    def setUp(self):
        self.test_path = os.path.abspath(
            os.path.join(__file__, '../testing_dir')
            )
        self.test_dir = TestDir(self.test_path, ['a.json', 'b.json', 'a.wav'])

    def test_get_audio_file_list(self):
        '''Tests whether user can get a list of audio files avaialable'''
        with self.test_dir:
            files_list = get_audio_file_list(self.test_path)

            # files_list can be either of the permutations listed below
            result_perm_a = {'a': ['wav', 'json'], 'b': ['json']}
            result_perm_b = {'a': ['json', 'wav'], 'b': ['json']}
            assert files_list == result_perm_a or files_list == result_perm_b
    
    
    def test_can_upload_file(self):
        '''Tests whether the user can upload a file to the media folder'''
        #! Todo: LOAD IN AN ACTUAL FILE WHEN THERE IS MORE TIME
        try:
            f = InMemoryUploadedFile(name='test.txt',file='abc', content_type='', size=123,\
                 charset='utf-8', content_type_extra=None, field_name='abc')
            save_file_to_media(f)
        except AttributeError:
            '''
            Raised because we are not actually passing in a file, but a string.
            This step will fail because it does not have the required methods
            '''
            pass
        
        files_in_media_dir = os.listdir(get_media_dir())

        assert 'test.txt' in files_in_media_dir
        os.unlink(os.path.join(get_media_dir(), 'test.txt'))

    def test_can_get_audio(self):
        with self.test_dir:
            filepath = os.path.join(self.test_path, 'a.wav')
            
            f = get_audio_wav('a.wav', filepath)
            assert isinstance(f, io.BufferedReader)

    def test_get_audio_invalid_fname(self):
        with self.test_dir:
            filepath = os.path.join(self.test_path, 'a.wav')
            
            with self.assertRaises(InvalidFilenameException):
                # Do not accept filename with space in the name
                get_audio_wav('a wav', filepath)

            with self.assertRaises(InvalidFilenameException):
                # Do not accept other file extensions
                get_audio_wav('a.json', filepath)

    def test_can_get_wavform_data(self):
        with self.test_dir:
            filepath = os.path.join(self.test_path, 'a.json')
            
            f = get_waveform_json('a.json', filepath)
            assert isinstance(f, io.TextIOWrapper)
        

    def test_get_waveform_data_invalid_fname(self):
        with self.test_dir:
            filepath = os.path.join(self.test_path, 'a.wav')
            
            with self.assertRaises(InvalidFilenameException):
                # Do not accept filename with space in the name
                get_waveform_json('a json', filepath)

            with self.assertRaises(InvalidFilenameException):
                # Do not accept other file extensions
                get_waveform_json('a.wav', filepath)

    
