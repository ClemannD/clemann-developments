#! /bin/bash

npx nx run expense-tracker-api:build:production

docker build -t dclemann/clemann-developments:expense-tracker-api-latest -f ./apps/expense-tracker-api/Dockerfile .

docker push dclemann/clemann-developments:expense-tracker-api-latest

ssh -i ~/.ssh/digital_ocean root@161.35.7.130 "DOPPLER_TOKEN='$DOPPLER_TOKEN' bash -s" < tools/deployers/expense-tracker/start-server-with-docker.sh
