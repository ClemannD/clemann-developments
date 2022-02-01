#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import gradient from 'gradient-string';
import { exec } from 'child_process';

function main() {
    const argv = yargs(hideBin(process.argv)).argv;

    const ENVIRONMENT = argv.environment || 'development';

    console.log(`
        ${gradient.morning('DEPLOYING SETSCORE-WEB')}
        environment: ${ENVIRONMENT}
    `);

    exec(
        `
            export VERCEL_PROJECT_ID=${process.env.SET_SCORE_VERCEL_PROJECT_ID} \
            && export VERCEL_ORG_ID=${process.env.SET_SCORE_VERCEL_ORG_ID} \
            && export VERCEL_ACCESS_TOKEN=${process.env.SET_SCORE_VERCEL_ACCESS_TOKEN} \
            && vercel apps/setscore-web -t ${process.env.VERCEL_ACCESS_TOKEN} --prod
        `,
        reportExecResult
    );
}

const reportExecResult = (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(stdout);
};

main();
