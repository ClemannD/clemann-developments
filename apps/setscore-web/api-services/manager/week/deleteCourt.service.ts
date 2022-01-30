import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

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
