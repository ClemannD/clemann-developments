import { Auth0Provider } from '@auth0/auth0-react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../page-components/app';
import '../styles/styles.scss';

const queryClient = new QueryClient();

function Spendly({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider
                domain={
                    process.env
                        .NEXT_PUBLIC_EXPENSE_TRACKER_AUTH0_ISSUER_BASE_URL
                }
                clientId={
                    process.env.NEXT_PUBLIC_EXPENSE_TRACKER_AUTH0_CLIENT_ID
                }
                redirectUri={
                    process.env.NEXT_PUBLIC_EXPENSE_TRACKER_BASE_WEB_URL
                }
                audience={
                    process.env.NEXT_PUBLIC_EXPENSE_TRACKER_AUTH0_API_AUDIENCE
                }
                useRefreshTokens={true}
                cacheLocation="localstorage"
            >
                <App>
                    <Head>
                        <title>Spendly</title>
                        <link rel="shortcut icon" href="/favicon.ico" />
                    </Head>
                    <main className="app expense-tracker-global">
                        <Component {...pageProps} />
                    </main>
                </App>
            </Auth0Provider>
        </QueryClientProvider>
    );
}

export default Spendly;
