#! /bin/bash

echo "Starting expense-tracker-api on remote server"

# ssh $LINUX_SERVER_CIRCLCI_USER@$LINUX_SERVER_HOSTNAME "DOPPLER_TOKEN='$DOPPLER_ACCESS_TOKEN_PROD' bash -s" < tools/deployers/expense-tracker/start-server-with-docker.sh
ssh $EXPENSE_TRACKER_DROPLET_USER@$EXPENSE_TRACKER_DROPLET_HOSTNAME "DOPPLER_TOKEN='$DOPPLER_ACCESS_TOKEN_PROD' bash -s" < tools/deployers/expense-tracker/start-server-with-docker.sh
