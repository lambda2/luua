# luua 💃

[![Build Status](https://travis-ci.com/lambda2/luua.svg?token=zsj9q6JjpQd8brNcmt9S&branch=master)](https://travis-ci.com/lambda2/luua)

[![Coverage Status](https://coveralls.io/repos/github/lambda2/luua/badge.svg?branch=master)](https://coveralls.io/github/lambda2/luua?branch=master)

This is the monorepo for Luua, which is made of:

- A REST API (a rails app), located here (under `/`)
- Soon, A NextJS (React) web app, located under `/frontend`

# Setup

```bash
# Clone the repo
git clone git@github.com:lambda2/luua.git

cd luua

# Setup
./bin/setup

```

# Deployment

## Tech stack:

- Ruby on Rails powers the REST API and other web pages
- NextJS (React.js) is used for the web app

## Requirements:

- PostgreSQL 10+
- Redis 4+
- Ruby 2.5+

# Notes

## i18n

All strings in database are stored in english for now.
Future could be:
- Translates server side, in database. Slow down queries and add more management to translate everything
- (Current solution) Translates client side, very error prone
