#! /bin/bash

APP_NAME=$1
HEROKU_PROJECT_NAME=$2

echo "Deploying $APP_NAME to Heroku"
echo "======================"
echo ""
echo "Heroku Project Name: $HEROKU_PROJECT_NAME"
echo "Heroku Login Email: $HEROKU_LOGIN_EMAIL"
echo "Heroku Login Password: $HEROKU_LOGIN_PASSWORD"
echo ""


cat >~/.netrc <<EOF
machine api.heroku.com
    login $HEROKU_LOGIN_EMAIL
    password $HEROKU_LOGIN_PASSWORD
machine git.heroku.com
    login $HEROKU_LOGIN_EMAIL
    password $HEROKU_LOGIN_PASSWORD
EOF

heroku git:remote -a $HEROKU_PROJECT_NAME
git push --force heroku main
