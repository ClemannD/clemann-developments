import {
    EmptyRequest,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { GetCategoriesResponse } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useGetCategories(): UseMutationResult<
    GetCategoriesResponse,
    any,
    EmptyRequest
> {
    return useApiMutation<EmptyRequest, GetCategoriesResponse>(
        'configuration/getCategories'
    );
}
