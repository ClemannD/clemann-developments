import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { SetCategoryActiveRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useSetCategoryActive(): UseMutationResult<
    EmptyResponse,
    any,
    SetCategoryActiveRequest
> {
    return useApiMutation<SetCategoryActiveRequest, EmptyResponse>(
        'configuration/SetCategoryActive'
    );
}
