import { useEffect, useState } from 'react';
import { UseMutationResult } from 'react-query';
import { ListRequest } from '../api-services/common/list-request';
import { ListResponse } from '../api-services/common/list-response';
import { SortDirection } from '../api-services/common/pagination-and-sort';
import useApiMutation from './useApiMutation';

export type UseApiListResults<
    RequestType extends ListRequest = ListRequest,
    ResponseType extends ListResponse = ListResponse,
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
    ResponseType extends ListResponse = ListResponse,
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
