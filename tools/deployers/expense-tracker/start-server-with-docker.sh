#! /bin/bash

echo "\n Pulling latest docker image"
docker pull dclemann/clemann-developments:expense-tracker-api-latest

echo "\n Cleaning up old containers"
docker stop expense-tracker-api
docker rm expense-tracker-api

echo "\n ============================================================ \n"

echo " Starting expense-tracker-api"
doppler run -c prod -- docker run -d -p 8080:8080 --name expense-tracker-api -e DOPPLER_TOKEN=$DOPPLER_TOKEN dclemann/clemann-developments:expense-tracker-api-latest
