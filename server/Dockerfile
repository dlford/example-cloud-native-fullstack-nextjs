FROM node:10-alpine as builder

RUN mkdir /app
WORKDIR /app
COPY ./package*.json ./
RUN npm install

FROM node:10-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git tzdata && \
  npm install --quiet node-gyp -g

RUN ln -s /usr/share/zoneinfo/America/Phoenix /etc/localtime
RUN echo "America/Phoenix" > /etc/timezone

RUN addgroup -g 101 -S apollo
RUN adduser -D --home /home/apollo -u 101 -S apollo -G apollo

RUN mkdir /home/apollo/app
WORKDIR /home/apollo/app
COPY --from=builder /app .

ENV NODE_ENV=production

COPY . .

RUN mkdir /home/apollo/app/node_modules/.cache
RUN chown -R apollo. /home/apollo/app/node_modules/.cache
USER apollo
EXPOSE 3000
CMD [ "npm", "start" ]
HEALTHCHECK --start-period=15s --interval=1m --timeout=5s CMD ["node", "healthcheck"]
