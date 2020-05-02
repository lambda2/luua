

# Luua Frontend 


## Setup


**Note: ** You will need an API server to run, see [the API README](https://github.com/lambda2/luua/blob/master/README.md)

```bash
# Clone the repo
git clone git@github.com:lambda2/luua.git

cd luua/frontend

# Setup
yarn

# Start development server
yarn run dev

# Navigate to http://localhost:3000

```

## Configuration

Default values should works well for development environment, but feel free to verride theses environment variables:

- `BACKEND_URL` (defaults to 'http://localhost:3232')
- `API_URL` (defaults to 'http://localhost:3232')
- `CDN_URL` (defaults to 'http://localhost:3232')
- `SENTRY_RELEASE` (defaults to '')
- `SENTRY_DSN` (defaults to '')
- `RELEASE` (defaults to '')

For example, if you want to run your fontend application over another Luua API instance:

```bash
API_URL="https://api.another.luua.io" yarn run dev
```

