#!/usr/bin/env bash

cd /var/www/"$COMPOSE_PROJECT_NAME";npm install;npm run build

echo '------------------[ DONE ]---------------------'

exec "$@"
