import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';

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
