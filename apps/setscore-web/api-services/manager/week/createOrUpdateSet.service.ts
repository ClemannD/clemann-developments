import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { EmptyResponse } from '../../common/empty-response';
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
