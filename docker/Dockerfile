FROM node:16-alpine3.15 as node-angular-cli

RUN apk --no-cache add  bash shadow su-exec git

ENV CONTAINER_NAME="docker"

ADD prompt.sh /etc/profile.d/prompt.sh
ADD aliases.sh /etc/profile.d/aliases.sh

RUN set -xe;\
    npm uninstall -g @angular/cli;\
    npm cache verify;\
    npm install -g @angular/cli@latest;\
    npm cache clean --force;



WORKDIR /app
EXPOSE 4200

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]


CMD ["bash", "-l"]