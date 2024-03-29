import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class DeleteCourtRequest {
    courtId: string;
}

export default function useDeleteCourt(): UseMutationResult<
    EmptyResponse,
    any,
    DeleteCourtRequest
> {
    return useApiMutation<DeleteCourtRequest, EmptyResponse>(
        'manager/week/deleteCourt'
    );
}
