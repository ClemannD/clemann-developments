import { createContext } from 'react';
import { UseMutationResult } from 'react-query';
import {
    GetCurrentUserRequest,
    GetCurrentUserResponse
} from '../api-services/auth/getCurrentUser.service';
import { User } from '../api-services/entities/user.entity';

export type UserContextType = {
    user: User;
    getCurrentUser: UseMutationResult<
        GetCurrentUserResponse,
        any,
        GetCurrentUserRequest
    >;
};

const UserContext = createContext<UserContextType>({
    user: null,
    getCurrentUser: null
});
export default UserContext;
