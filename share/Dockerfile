FROM nginx:alpine

ARG build_env=staging

RUN mkdir -p /var/www

COPY ./misc/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /var/www/dist
