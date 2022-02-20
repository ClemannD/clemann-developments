import { Auth0Provider } from '@auth0/auth0-react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../page-components/app';
import '../styles/styles.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider
                domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}
                clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
                redirectUri={process.env.NEXT_PUBLIC_BASE_WEB_URL}
                audience={process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}
                useRefreshTokens={true}
                cacheLocation="localstorage"
            >
                <App>
                    <Head>
                        <title>SetScore</title>
                        <link
                            rel="apple-touch-icon"
                            href="branding/apple-touch-icon.png"
                        />
                        <meta
                            name="apple-mobile-web-app-status-bar-style"
                            content="default"
                        />

                        <meta
                            name="apple-mobile-web-app-capable"
                            content="yes"
                        />
                        <link rel="manifest" href="/manifest.json" />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-2048-2732.jpg"
                            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1668-2388.jpg"
                            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1536-2048.jpg"
                            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1668-2224.jpg"
                            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1620-2160.jpg"
                            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1284-2778.jpg"
                            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1170-2532.jpg"
                            media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1125-2436.jpg"
                            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1242-2688.jpg"
                            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-828-1792.jpg"
                            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-1242-2208.jpg"
                            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-750-1334.jpg"
                            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="branding/apple-splash-640-1136.jpg"
                            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                    </Head>
                    <Component {...pageProps} />
                </App>
            </Auth0Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
