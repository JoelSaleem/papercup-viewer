import os
from json import dumps
from pathlib import Path

from django.core.files.base import ContentFile
from django.http import FileResponse, StreamingHttpResponse
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from .media_util import get_audio_file_list, is_json_file, \
    is_wav_file, get_media_dir, get_media_file_path, save_file_to_media, \
    get_waveform_json, get_audio_wav, InvalidFilenameException, UnknownFileException


def index(request):
    '''Get available audio and waveform files'''
    if request.method == 'GET':
        filenames = get_audio_file_list(get_media_dir())
        return HttpResponse(dumps(filenames))

    return HttpResponse('')


@csrf_exempt
def upload_wav_file(request):
    '''Upload a wav file and generate waveform data'''
    if request.method == 'POST':
        uploaded_file = request.FILES['file']
        if not uploaded_file:
            return HttpResponse('No file provided.', status=400)

        if ' ' in uploaded_file.name:
            return HttpResponse('Filename cannot contain a space in its name.', status=400)

        if not is_wav_file(uploaded_file.name):
            return HttpResponse('You must provide the name of a valid wav file.', status=400)

        save_file_to_media(uploaded_file)

        # Generate and save waveform data
        generate_waveform_data(uploaded_file.name)

    return HttpResponse('')


def generate_waveform_data(filename):
    '''Generates waveform data'''
    file_without_extension, _ = filename.split('.')

    # TODO: write script to output progress. Therefore
    # we can send a response when done (most likely over websockets)
    os.system(
        f'audiowaveform -i media/{filename} ' +
        f'-o media/{file_without_extension}.json -b 8 -z 256'
    )


def get_waveform(request, filename):
    '''Get waveform json data'''
    f = None
    try:
        path = get_media_file_path(filename)
        f = get_waveform_json(filename, path)
    except (IOError, InvalidFilenameException, UnknownFileException):
        return HttpResponse('Could not access the file you requested', status=400)

    return HttpResponse(f)


def get_audio(request, filename):
    '''Gets .wav audio file'''
    f = None
    try:
        path = get_media_file_path(filename)
        f = get_audio_wav(filename, path)
    except IOError:
        return HttpResponse('The file you have requested does not exist', status=400)

    return FileResponse(f)
