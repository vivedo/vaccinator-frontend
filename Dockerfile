FROM node:14.16.1-buster

USER root
WORKDIR /usr/src/app

RUN npm install -g react-scripts