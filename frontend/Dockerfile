
FROM mhart/alpine-node:10 AS builder
RUN apk --update add git build-base perl python
WORKDIR /app
ENV NODE_ENV production
ENV BACKEND_URL "http://mashu"
ENV API_URL "https://deliver.mashu.io"
ENV CDN_URL "https://deliver.mashu.io"
ENV ALGOLIA_INDEX "Video_production"
COPY .npmrc .
COPY package.json .
RUN yarn install
COPY . .
ARG SENTRY_RELEASE=untagged
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
RUN yarn add --dev typescript @types/react
RUN yarn build && yarn --production

# Run build
FROM mhart/alpine-node:10
WORKDIR /app
ENV NODE_ENV production
ENV BACKEND_URL "http://mashu"
ENV API_URL "https://api.mashu.io"
ENV CDN_URL "https://deliver.mashu.io"
ENV ALGOLIA_INDEX "Video_production"
COPY --from=builder /app .
ARG SENTRY_RELEASE=untagged
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
EXPOSE 3000
CMD ["node", "server/server.js"]
