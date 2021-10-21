FROM node:16

COPY package.json yarn.lock /build/

WORKDIR /build

RUN yarn

COPY . /build/

RUN yarn build

FROM node:16

WORKDIR /app/

ENV NODE_PORT=4000

EXPOSE 4000

COPY --from=0 /build/dist/ /app/

CMD node --enable-source-maps server.cjs
