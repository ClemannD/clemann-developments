import {
    EmptyResponse,
    useApiMutation
} from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';

export class AcceptInviteCodeRequest {
    inviteCode: string;
}

export default function useAcceptInviteCode(): UseMutationResult<
    EmptyResponse,
    any,
    AcceptInviteCodeRequest
> {
    return useApiMutation<AcceptInviteCodeRequest, EmptyResponse>(
        'auth/acceptInviteCode'
    );
}
