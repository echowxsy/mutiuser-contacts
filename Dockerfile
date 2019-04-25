FROM node:10.15.3

MAINTAINER echowxsy

ADD . /mutiuser-contacts

RUN cd /mutiuser-contacts && npm install
