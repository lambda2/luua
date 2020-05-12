# luua 💃

[![Build Status](https://travis-ci.com/lambda2/luua.svg?branch=master)](https://travis-ci.com/lambda2/luua) [![Coverage Status](https://coveralls.io/repos/github/lambda2/luua/badge.svg?branch=master)](https://coveralls.io/github/lambda2/luua?branch=master) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)


This is the monorepo for Luua, which is made of:

- A REST API (a rails app), located here (under `/`)
- A NextJS (React) web app, located under `/frontend`


## 🚧 Disclaimer

This project is a **work in progress**, and is not working yet.


## How to run the API locally

```bash
# Clone the repo
git clone git@github.com:lambda2/luua.git

cd luua

# Copy the config file
cp .env.local.example .env.local

# EDIT THE config file with your database credentials & cie

# Setup the database and seed the initial data
./bin/setup

```

### Tech stack:

- Ruby on Rails powers the REST API and other web pages
- NextJS (React.js) is used for the web app

### Requirements:

- PostgreSQL 10+
- Redis 4+
- Ruby 2.5+

## Privacy and security

### Cookies

Luua uses cookies to store the user token when logged in, and to store the prefered language.

### Analytics

Luua tracks analytics with [ahoy](https://github.com/ankane/ahoy), an open source solution that doesn't relies or shares your data with a third party provider.
In order to respect the GDPR compliance, we
- Don't store IP addresses
- Track same users with [anonymity sets](https://privacypatterns.org/patterns/Anonymity-set) instead of cookies
