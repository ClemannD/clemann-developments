#! /bin/bash


echo "Generating typorm migration for expense-tracker-api"
echo "======================"
echo ""

MIGRATION_NAME=$1

rm -f ormconfig.json

cat >./ormconfig.json <<EOF
    {
        "type": "postgres",
        "host": "${EXPENSE_TRACKER_API_DB_HOST}",
        "port": ${EXPENSE_TRACKER_API_DB_PORT},
        "username": "${EXPENSE_TRACKER_API_DB_USER}",
        "password": "${EXPENSE_TRACKER_API_DB_PASSWORD}",
        "database": "${EXPENSE_TRACKER_API_DB_NAME}",
        "entities": ["apps/expense-tracker-api/src/entities/*.entity.ts"],
        "migrations": ["apps/expense-tracker-api/migration/*.ts"],
        "ssl": true,
        "options": { "trustServerCertificate": true },
        "cli": {
            "migrationsDir": "apps/expense-tracker-api/migration"
        }
    }
EOF

npx typeorm migration:create -n $MIGRATION_NAME

echo ""
echo "======================"
echo ""

