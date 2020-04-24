FROM node:latest
MAINTAINER Harold Thetiot <hthetiot@gmail.com>

RUN npm i npm@latest -g
ENV NO_UPDATE_NOTIFIER 1

ENV APPDIR /usr/src/app
RUN mkdir -p $APPDIR
WORKDIR $APPDIR

ADD package*.json $APPDIR/
RUN npm install

ARG EASYRTC_BRANCH=master
RUN npm install andyferg/open-easyrtc#$EASYRTC_BRANCH
RUN npm install --production

ADD . $APPDIR

VOLUME ['certs', 'static']

RUN sed -i "s|easyrtc = require(\"../\")|easyrtc = require(\"open-easyrtc\")|g" $APPDIR/*.js

RUN chown -R nobody:nogroup $APPDIR && chmod -R a-w $APPDIR && ls -ld
USER nobody

EXPOSE 3000 3000

ENV SYLAPS_ENV all

ENTRYPOINT ["npm"]
CMD ["start"]
