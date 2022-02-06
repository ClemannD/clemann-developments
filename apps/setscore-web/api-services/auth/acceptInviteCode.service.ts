import { EmptyResponse } from '@clemann-developments/common-endpoint';
import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';

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
