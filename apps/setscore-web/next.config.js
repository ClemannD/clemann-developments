// // This file sets a custom webpack configuration to use your Next.js app
// // with Sentry.
// // https://nextjs.org/docs/api-reference/next.config.js/introduction
// // https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa');

const pwaConfig = {
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development'
    }
};

const SentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

const nxConfig = {
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false
    }
};

module.exports = withSentryConfig(
    withPWA(withNx(nxConfig), pwaConfig),
    SentryWebpackPluginOptions
);
