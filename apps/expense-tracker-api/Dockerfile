FROM node:14-alpine

# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

WORKDIR /app
COPY dist/apps/expense-tracker-api .
RUN npm i

EXPOSE 8080
ENV NODE_TLS_REJECT_UNAUTHORIZED='0'
ENV PORT=8080

CMD doppler run -- node ./main.js
