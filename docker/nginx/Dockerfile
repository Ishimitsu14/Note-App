FROM nginx:latest

ARG NGINX_PORT=10050
ARG COMPOSE_PROJECT_NAME=TodoList

ENV NGINX_PORT $NGINX_PORT
ENV COMPOSE_PROJECT_NAME $COMPOSE_PROJECT_NAME

COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
