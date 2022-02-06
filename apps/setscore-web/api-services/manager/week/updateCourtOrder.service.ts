import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';

export class UpdateCourtOrderRequest {
    courtPositions: {
        courtId: string;
        courtPosition: number;
    }[];
}

export default function useUpdateCourtOrder(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateCourtOrderRequest
> {
    return useApiMutation<UpdateCourtOrderRequest, EmptyResponse>(
        'manager/week/updateCourtOrder'
    );
}
