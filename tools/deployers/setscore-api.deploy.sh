#! /bin/bash

echo "Deploying setscore-api"
echo "======================"
echo ""

$APP_NAME=$1
$HEROKU_PROJECT_NAME=$2

cat >~/.netrc <<EOF
machine api.heroku.com
    login $HEROKU_LOGIN_EMAIL
    password $HEROKU_LOGIN_PASSWORD
machine git.heroku.com
    login $HEROKU_LOGIN_EMAIL
    password $HEROKU_LOGIN_PASSWORD
EOF



