import { UseMutationResult } from 'react-query';
import { useApiMutation } from '@clemann-developments/common-endpoint';

export class SubDto {
    subUserId: string;
    subName: string;
}

export class ListSubsRequest {}

export class ListSubsResponse {
    subs: SubDto[];
}

export default function useListSubs(): UseMutationResult<
    ListSubsResponse,
    any,
    ListSubsRequest
> {
    return useApiMutation<ListSubsRequest, ListSubsResponse>(
        'manager/lineup/listSubs'
    );
}
