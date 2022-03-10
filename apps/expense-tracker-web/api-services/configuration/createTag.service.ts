import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { CreateTagRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useCreateTag(): UseMutationResult<
    EmptyResponse,
    any,
    CreateTagRequest
> {
    return useApiMutation<CreateTagRequest, EmptyResponse>(
        'configuration/createTag'
    );
}
