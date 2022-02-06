import {
    ListRequest,
    ListResponse,
    SortDirection
} from '@clemann-developments/common-endpoint';
import { useEffect, useState } from 'react';
import { UseMutationResult } from 'react-query';
import useApiMutation from './useApiMutation';

export type UseApiListResults<
    RequestType extends ListRequest = ListRequest,
    ResponseType extends ListResponse<any> = ListResponse<any>,
    RowType = any
> = {
    request: RequestType;
    setRequest: (request: RequestType) => void;
    dispatch: () => void;
    apiService: UseMutationResult<ResponseType>;
    rows: RowType[];
    handleSort: (sortDirection: SortDirection, sortColumn: string) => void;
    handleFilter: (filters: any) => void;
};

export default function useApiList<
    RequestType extends ListRequest = ListRequest,
    ResponseType extends ListResponse<any> = ListResponse<any>,
    RowType = any
>(
    initialRequest: RequestType,
    url: string
): UseApiListResults<RequestType, ResponseType, RowType> {
    const [request, setRequest] = useState<RequestType>();
    const apiService = useApiMutation<RequestType, ResponseType>(url);

    useEffect(() => {
        dispatch();
    }, [request]);

    useEffect(() => {
        setRequest(initialRequest);
    }, []);

    const dispatch = () => {
        apiService.mutate(request);
    };

    const handleSort = (sortDirection: SortDirection, sortColumn: string) => {
        setRequest((currentRequest) => ({
            ...currentRequest,
            paginationAndSort: {
                ...currentRequest.paginationAndSort,
                sortColumn,
                sortDirection
            }
        }));
    };

    const handleFilter = (filters: any) => {
        setRequest((currentRequest) => ({
            ...currentRequest,
            filters
        }));
    };

    return {
        request,
        setRequest,
        dispatch,
        apiService,
        rows: apiService?.data?.rows,
        handleSort,
        handleFilter
    };
}
