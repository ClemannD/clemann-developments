import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { UpdateCategoryRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useUpdateCategory(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateCategoryRequest
> {
    return useApiMutation<UpdateCategoryRequest, EmptyResponse>(
        'configuration/updateCategory'
    );
}
