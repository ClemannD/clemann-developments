import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, UseQueryResult } from 'react-query';
import { toast } from 'react-toastify';

export function useApiQuery<TRequest = any, TResponse = any>(
    endpoint: string,
    request: TRequest,
    enabled: boolean = true
): UseQueryResult<TResponse> {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery<TResponse>(
        [endpoint, request],
        async () => {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE
            });

            try {
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
                    toast.error('There was a server error. Please try again.');
                    throw new Error(response.statusText);
                }
                return response.json();
            } catch (error) {
                console.log(error);
            }
        },
        { enabled, refetchOnWindowFocus: false, refetchInterval: 60000 }
    );
}
