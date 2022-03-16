import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { CreateCategoryRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useCreateCategory(): UseMutationResult<
    EmptyResponse,
    any,
    CreateCategoryRequest
> {
    return useApiMutation<CreateCategoryRequest, EmptyResponse>(
        'configuration/createCategory'
    );
}
