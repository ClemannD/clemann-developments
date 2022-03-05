#! /bin/bash


echo "Generating typorm migration for setscore-api"
echo "======================"
echo ""

MIGRATION_NAME=$1

rm -f ormconfig.json

cat >./ormconfig.json <<EOF
    {
        "type": "postgres",
        "host": "${SETSCORE_API_DB_HOST}",
        "port": ${SETSCORE_API_DB_PORT},
        "username": "${SETSCORE_API_DB_USER}",
        "password": "${SETSCORE_API_DB_PASSWORD}",
        "database": "${SETSCORE_API_DB_NAME}",
        "entities": ["apps/setscore-api/src/entities/*.entity.ts"],
        "migrations": ["apps/setscore-api/migration/*.ts"],
        "ssl": true,
        "options": { "trustServerCertificate": true },
        "cli": {
            "migrationsDir": "apps/setscore-api/migration"
        }
    }
EOF

npx typeorm migration:create -n $MIGRATION_NAME

echo ""
echo "======================"
echo ""

