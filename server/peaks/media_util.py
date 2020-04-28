import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage


class UnknownFileException(Exception):
    '''Raised when an attempt is made to access a file that does not exist'''
    pass


class InvalidFilenameException(Exception):
    '''Raised when an file is requested with an invalid filename'''
    pass


def get_audio_file_list(media_dir):
    '''Get a list of all media files'''
    files_in_dir = os.listdir(media_dir)

    # get extensions of each media file
    filenames = {}
    for file in files_in_dir:
        fname, extension = file.split('.')
        filenames.setdefault(fname, []).append(extension)

    return filenames


def get_waveform_json(filename, filepath):
    '''Get waveform json data'''
    if not filename:
        raise InvalidFilenameException('No filename provided')

    if not is_json_file(filename):
        raise InvalidFilenameException(
            'You must provide a valid json filename')

    # ? Todo: close file
    f = open(filepath, 'r')
    return f


def get_audio_wav(filename, filepath):
    '''Gets .wav audio file'''
    if not filename:
        raise InvalidFilenameException('No filename provided')

    if not is_wav_file(filename):
        raise InvalidFilenameException(' You must provide a valid wav')

    # ? Todo: close file. FileResponse may do this for us
    f = open(filepath, 'rb')
    return f


def save_file_to_media(file):
    '''Save to MEDIA_ROOT (as set in settings.py)'''
    fs = FileSystemStorage()
    fs.save(file.name, file)


def is_valid_filename(filename):
    '''Validates that a filename has a name and extension'''
    file_with_extension = filename.split('.')
    if len(file_with_extension) > 1:
        return True

    return False


def is_json_file(filename):
    return is_file_of_extension(filename, 'json')


def is_wav_file(filename):
    return is_file_of_extension(filename, 'wav')


def is_file_of_extension(filename, target_extension):
    '''Validates that a file has a given extension'''
    if not is_valid_filename(filename):
        return False

    try:
        _, extension = filename.split('.')
    except ValueError:
        return False

    return extension == target_extension


def get_media_dir():
    return os.path.abspath(os.path.join(__file__, settings.MEDIA_ROOT))


def get_media_file_path(filename):
    media_dir = get_media_dir()
    file_path = os.path.join(media_dir, filename)
    return file_path
