import { EmptyRequest } from '@clemann-developments/common-endpoint';
import {
    CurrentUserDto,
    GetCurrentUserResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { createContext } from 'react';
import { UseMutationResult } from 'react-query';

export type UserContextType = {
    user: CurrentUserDto;
    getCurrentUser: UseMutationResult<
        GetCurrentUserResponse,
        any,
        EmptyRequest
    >;
};

const UserContext = createContext<UserContextType>({
    user: null,
    getCurrentUser: null
});
export default UserContext;
