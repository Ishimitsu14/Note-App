FROM node:13.5.0

ARG COMPOSE_PROJECT_NAME=TodoList

ENV COMPOSE_PROJECT_NAME $COMPOSE_PROJECT_NAME

COPY docker-entrypoint.sh /usr/local/bin/

WORKDIR /var/www/"$COMPOSE_PROJECT_NAME"

ENTRYPOINT ["bash", "docker-entrypoint.sh"]
