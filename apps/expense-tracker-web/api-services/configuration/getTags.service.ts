import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { GetTagsResponse } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetTags(): UseMutationResult<
    GetTagsResponse,
    any,
    EmptyRequest
> {
    return useApiMutation<EmptyRequest, GetTagsResponse>(
        'configuration/getTags'
    );
}
