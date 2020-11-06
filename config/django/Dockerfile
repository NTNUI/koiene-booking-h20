FROM python:3.8
ENV PYTHONUNBUFFERED 1

# update package lists, fix broken system packages
RUN apt-get update
RUN apt-get -f install

# install and cache dependencies in /tmp directory.
# doing it this way also installs any newly added dependencies.
RUN pip3 install --upgrade pip
COPY config/django/requirements.txt /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

# create directories
WORKDIR /code

# load project files and set work directory
COPY ./backend/ ./backend/
COPY ./config/ ./config

RUN chmod +x ./config/django/start.sh

WORKDIR ./backend

CMD ["../config/django/start.sh"]
