#! /bin/bash


echo "Running typorm migrations for expense-tracker-api"
echo "======================"
echo ""

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

npm run typeorm migrations:run

echo ""
echo "======================"
echo ""

