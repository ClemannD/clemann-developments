import { UseMutationResult } from 'react-query';
import useApiMutation from '../../hooks/useApiMutation';

export class AcceptInviteCodeRequest {
    inviteCode: string;
}

export class AcceptInviteCodeResponse {}

export default function useAcceptInviteCode(): UseMutationResult<
    AcceptInviteCodeResponse,
    any,
    AcceptInviteCodeRequest
> {
    return useApiMutation<AcceptInviteCodeRequest, AcceptInviteCodeResponse>(
        'auth/acceptInviteCode'
    );
}
