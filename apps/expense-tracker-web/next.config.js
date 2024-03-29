// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false
    }
};

module.exports = withNx(nextConfig);

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withNx = require('@nrwl/next/plugins/with-nx');
// const withPWA = require('next-pwa');

// const pwaConfig = {
//     pwa: {
//         dest: 'public',
//         disable: process.env.NODE_ENV === 'development'
//     }
// };

// /**
//  * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
//  **/
// const nextConfig = {
//     nx: {
//         // Set this to true if you would like to to use SVGR
//         // See: https://github.com/gregberge/svgr
//         svgr: false
//     }
// };

// module.exports = withPWA(withNx(nextConfig), pwaConfig);
