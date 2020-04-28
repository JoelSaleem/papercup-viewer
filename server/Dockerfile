FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

#FROM vimagick/audiowaveform
#RUN alias awf='docker run --rm -v `pwd`:/work -w /work vimagick/audiowaveform'
