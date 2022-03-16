import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { UpdateSubcategoryRequest } from '@clemann-developments/dtos/expense-tracker-dtos';
import { UseMutationResult } from 'react-query';

export default function useUpdateSubcategory(): UseMutationResult<
    EmptyResponse,
    any,
    UpdateSubcategoryRequest
> {
    return useApiMutation<UpdateSubcategoryRequest, EmptyResponse>(
        'configuration/updateSubcategory'
    );
}
