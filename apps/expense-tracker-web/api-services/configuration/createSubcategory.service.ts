import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { CreateSubcategoryRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useCreateSubcategory(): UseMutationResult<
    EmptyResponse,
    any,
    CreateSubcategoryRequest
> {
    return useApiMutation<CreateSubcategoryRequest, EmptyResponse>(
        'configuration/createSubcategory'
    );
}
