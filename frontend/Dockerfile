
FROM mhart/alpine-node:10 AS builder

RUN apk --update add git build-base perl python
WORKDIR /app
ENV NODE_ENV production
ENV BACKEND_URL "http://luua"
ENV API_URL "https://deliver.luua.io"
ENV CDN_URL "https://deliver.luua.io"
COPY .npmrc .
COPY package.json .
RUN yarn install
COPY . .
ARG SENTRY_RELEASE=untagged
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
ARG SENTRY_DSN=""
ENV SENTRY_DSN=${SENTRY_DSN}
RUN yarn add --dev typescript @types/react
RUN yarn build && yarn --production

# Run build
FROM mhart/alpine-node:10

LABEL maintainer="andre@luua.io"
LABEL description="The luua.io frontend app docker image"

WORKDIR /app
ENV NODE_ENV production
ENV BACKEND_URL "http://luua"
ENV API_URL "https://api.luua.io"
ENV CDN_URL "https://deliver.luua.io"
COPY --from=builder /app .
ARG SENTRY_RELEASE=untagged
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
EXPOSE 3000
CMD ["node", "server/server.js"]
