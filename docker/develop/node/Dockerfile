FROM node:lts-alpine

RUN npm i -g @nestjs/cli \
  && apk update \
  && apk add git

WORKDIR /root/repo/app