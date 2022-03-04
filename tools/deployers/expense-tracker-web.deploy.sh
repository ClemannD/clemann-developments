#! /bin/bash

echo "Deploying setscore-web"
echo "======================"
echo ""

export VERCEL_PROJECT_ID=$EXPENSE_TRACKER_VERCEL_PROJECT_ID

vercel ./ -t $VERCEL_ACCESS_TOKEN --prod --force
