# luua 💃

[![Build Status](https://travis-ci.com/lambda2/luua.svg?branch=master)](https://travis-ci.com/lambda2/luua) [![Coverage Status](https://coveralls.io/repos/github/lambda2/luua/badge.svg?branch=master)](https://coveralls.io/github/lambda2/luua?branch=master) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)


## Disclaimer

This project is a **work in progress**, and is not working yet.


This is the monorepo for Luua, which is made of:

- A REST API (a rails app), located here (under `/`)
- A NextJS (React) web app, located under `/frontend`

## Setup

```bash
# Clone the repo
git clone git@github.com:lambda2/luua.git

cd luua

# Setup
./bin/setup

```

## Deployment

### Tech stack:

- Ruby on Rails powers the REST API and other web pages
- NextJS (React.js) is used for the web app

### Requirements:

- PostgreSQL 10+
- Redis 4+
- Ruby 2.5+
