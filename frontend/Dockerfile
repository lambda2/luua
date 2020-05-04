
FROM mhart/alpine-node:10 AS builder

RUN apk --update add git build-base perl python
WORKDIR /app
ENV BACKEND_URL "http://luua"
ENV API_URL "https://api.luua.io"
ENV CDN_URL "https://luua.fra1.digitaloceanspaces.com"
# COPY .npmrc .
COPY package.json .
RUN yarn
RUN yarn add --dev strip-ansi typescript @types/react @types/node @types/lodash
COPY . .
ARG SENTRY_RELEASE=untagged
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
ARG SENTRY_DSN=""
ENV SENTRY_DSN=${SENTRY_DSN}
RUN yarn build
RUN yarn --production

# Run build
FROM mhart/alpine-node:10

LABEL maintainer="andre@luua.io"
LABEL description="The luua.io frontend app docker image"

WORKDIR /app
ENV NODE_ENV production
ENV BACKEND_URL "http://luua"
ENV API_URL "https://api.luua.io"
ENV CDN_URL "https://luua.fra1.digitaloceanspaces.com/"
COPY --from=builder /app .
ARG SENTRY_RELEASE=untagged
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
EXPOSE 3000
CMD ["node", "server/server.js"]
