FROM node:14.16.1-alpine

USER root
WORKDIR /usr/src/app

RUN npm install -g react-scripts@3.4.4