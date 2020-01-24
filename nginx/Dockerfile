FROM golang:alpine AS builder_go
WORKDIR $GOPATH
COPY ./healthcheck.go .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/healthcheck

FROM nginx:alpine
COPY --from=builder_go --chown=nginx:nginx /go/bin/healthcheck /usr/local/bin/healthcheck
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /var/cache/nginx

RUN apk --no-cache add --virtual native-deps tzdata
RUN ln -s /usr/share/zoneinfo/America/Phoenix /etc/localtime
RUN echo "America/Phoenix" > /etc/timezone

ENV HEALTHCHECK_PORT=3000
USER nginx
EXPOSE 3000
HEALTHCHECK --start-period=15s --interval=1m --timeout=5s CMD ["/usr/local/bin/healthcheck"]
