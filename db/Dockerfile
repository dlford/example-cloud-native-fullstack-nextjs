FROM mongo:4.2

RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/America/Phoenix /etc/localtime
RUN echo "America/Phoenix" > /etc/timezone
RUN dpkg-reconfigure --frontend noninteractive tzdata

HEALTHCHECK --start-period=15s --interval=1m --timeout=5s CMD [ "echo", "'db.runCommand(\"ping\").ok'", "|", "mongo", "localhost:27017", "--quiet" ]
