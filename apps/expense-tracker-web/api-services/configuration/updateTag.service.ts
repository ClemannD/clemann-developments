import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { UpdateTagRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useUpdateTag(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateTagRequest
> {
    return useApiMutation<UpdateTagRequest, EmptyResponse>(
        'configuration/updateTag'
    );
}
