#! /bin/bash

ENVIRONMENT=$1

echo "Deploying setscore-web"
echo "======================"
echo ""

export VERCEL_ORG_ID=$SET_SCORE_VERCEL_ORG_ID
export VERCEL_PROJECT_ID=$SET_SCORE_VERCEL_PROJECT_ID

vercel ./ -t $VERCEL_ACCESS_TOKEN --prod
