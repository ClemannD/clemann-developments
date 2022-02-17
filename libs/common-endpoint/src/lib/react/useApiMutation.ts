import { useAuth0 } from '@auth0/auth0-react';
import * as Sentry from '@sentry/nextjs';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { ApiError } from '../models/api-error';
import { ErrorCodesWhitelist } from '../models/error-code-whitelist';

export function useApiMutation<TRequest = any, TResponse = any>(
    endpoint: string
) {
    const { getAccessTokenSilently } = useAuth0();

    return useMutation<
        TResponse,
        { message: string; statusCode: number },
        TRequest,
        any
    >(async (request) => {
        const accessToken = await getAccessTokenSilently({
            audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/${endpoint}`,
            {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${accessToken}`
                }
            }
        );
        if (!response.ok) {
            if (!ErrorCodesWhitelist.includes(response.status)) {
                toast.error('There was a server error. Please try again.');
                Sentry.captureException(await response.text());
            }
            throw new ApiError(await response.text());
        } else {
            return response.json();
        }
    });
}
