import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';
import { SetDto } from '../models';

export class CreateOrUpdateSetRequest {
    set: SetDto;
    courtId: string;
}

export default function useCreateOrUpdateSet(): UseMutationResult<
    EmptyResponse,
    any,
    CreateOrUpdateSetRequest
> {
    return useApiMutation<CreateOrUpdateSetRequest, EmptyResponse>(
        'manager/week/createOrUpdateSet'
    );
}
