FROM node:10-alpine

RUN apk --no-cache add --virtual native-deps tzdata
RUN ln -s /usr/share/zoneinfo/America/Phoenix /etc/localtime
RUN echo "America/Phoenix" > /etc/timezone

RUN addgroup -g 101 -S nextjs
RUN adduser -D --home /home/nextjs -u 101 -S nextjs -G nextjs

RUN mkdir /home/nextjs/app
WORKDIR /home/nextjs/app
COPY . .
RUN npm install

ENV NODE_ENV=production

RUN npm run build

RUN chown -R nextjs. /home/nextjs/app/.next
USER nextjs
EXPOSE 3000
CMD [ "npm", "start" ]
HEALTHCHECK --start-period=15s --interval=1m --timeout=5s CMD ["node", "healthcheck"]
