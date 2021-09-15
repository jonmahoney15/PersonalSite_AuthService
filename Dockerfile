FROM node:16-alpine as ts-build

RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY src ./src

RUN yarn build

RUN npm prune --production

##Stage 2
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=ts-build /usr/src/app/dist/tsc .
COPY --from=ts-build /usr/src/app/node_modules ./node_modules

RUN yarn global add pm2

USER 1000

CMD ["pm2-runtime", "index.js"]
