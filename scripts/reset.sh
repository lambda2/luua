#!/usr/bin/env sh

RAILS_ENV=test rake db:drop db:create db:migrate && \
  RAILS_ENV=development rake db:drop db:create db:migrate db:schema:dump && \
  sleep 2 && \
  rake db:seed
