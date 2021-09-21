FROM node:16-alpine as ts-build

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./yarn.lock ./

RUN yarn install 

COPY src ./src

RUN yarn build

##Stage 2
FROM node:16-alpine@sha256:a2b99f95311def1095e5b9604a81956f4109d9a512a44c86fc382f472cad1d91

WORKDIR /usr/src/app

COPY --from=ts-build /usr/src/app/dist/tsc .
COPY --from=ts-build /usr/src/app/package.json .
COPY --from=ts-build /usr/src/app/yarn.lock .

RUN yarn install --production=true

USER 1000

EXPOSE 8080

CMD ["node","index.js"]
