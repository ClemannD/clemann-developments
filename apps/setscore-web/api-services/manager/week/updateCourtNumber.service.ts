import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';
export class UpdateCourtNumberRequest {
    courtId: string;
    courtNumber: number;
}

export default function useUpdateCourtNumber(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateCourtNumberRequest
> {
    return useApiMutation<UpdateCourtNumberRequest, EmptyResponse>(
        'manager/week/updateCourtNumber'
    );
}
