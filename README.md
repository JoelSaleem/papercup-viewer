# papercup-viewer
View Audio Waveform data  
An application in which audio data can be played, and its waveform data viewed.  
  
https://client-silk.now.sh   
(Note: the hosted link is a client-only instance)


# Start Client
1. ensure nodejs is installed locally on your machine (https://nodejs.org/en/download/)
2. ensure npm is installed locally on your machine (https://www.npmjs.com/get-npm)
3. from a terminal: change directory into the client directory ("cd ./client" from root directory)
4. run the command "npm install"
5. run the command "npm start"


# Start Server 
1. make sure audiowaveform is installed (https://github.com/bbc/audiowaveform).
2. make python3 is installed (https://www.python.org/downloads/).
3. yake note of the path variable created (e.g. python3 or python), to enable the command line interface to be used.
4. ensure pip is installed (https://pip.pypa.io/en/stable/reference/pip_download/).
5. change directory into the server directory ("cd ./server" from root directory).
6. run "pip install -r requirements.txt"
7. run "python3 manage.py runserver" (if your path variable is python3, otherwise use the path variable for your machine).

# Running client tests
There are a few tests on the client, specifically centered around Peaks.js and the client's interaction with the library.
To run:
1. from the client directory, run "npm test"


# Running server tests
1. from the server directory, run "python3 manage.py test"


# Notes on current release
1. the client can use audio and waveform files stored in the public folder of the client.
2. the client can also be configured to use the server to store and retrieve audio and waveform files (see below).
3. the audio files can be played, paused, and the user can jump to timestamps when the client is used in a client-only instance
4. the audio files can be played, paused, and wav files can be uploaded, when the client is used in conjunction with the server.
 

# Changing the client configuration
To remain platfom independent, flags can be changed within App.js, in the root directory of the client.
The flag USE_SERVER, can be changed so that it can run, using audio from the server. 
By default, it runs as a client-only instance.

If the address or port on which the server is running changes, the SERVER_BASE_ADDR flag should also be changed if USE_SERVER is true.


# Changes to be made if given more time
1. When using the server, the audio cannot currently be skipped due to the way files are being served from Django. The fix may involve looking at the FileResponse http wrapper used on the server in /peaks/views.py
2. Make the list a vertical list to allow easy viewing if there are many files to choose from.
3. Error handling! For example, if the client fails to connect to the server, the messages are output in the logs. It would be better if the error was displayed to the user.
4. Both the server and clients should be run in docker containers. This will enable env variables to be set in the command line, to avoid using flags, and will allow the server to avoid the prerequisite that audiowaveform must be installed on the running machine. Thus far I haven't been able to make audiowaveform to play nicely with docker.
5. Production versions, builds and hosting.
6. More unit test on the client, centered around testing the components (https://enzymejs.github.io/enzyme/docs/api/)
7. Client-side unit tests centered around testing upload and download of files (https://github.com/axios/moxios)
8. More unit tests on the server, centered around the handling of files.
9. Add zoom functionality for waveform data.
