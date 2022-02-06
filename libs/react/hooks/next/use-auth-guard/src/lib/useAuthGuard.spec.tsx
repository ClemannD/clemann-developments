import { useAuth0 } from '@auth0/auth0-react';
import { renderHook } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { useAuthGuard } from './useAuthGuard';

jest.mock('@auth0/auth0-react');
jest.mock('next/router');

describe('useAuthGuard', () => {
    const createMockAuth0 = ({
        isLoading,
        isAuthenticated,
        user,
        error
    }: {
        isLoading: boolean;
        isAuthenticated: boolean;
        user?: any;
        error?: any;
    }) => {
        (useAuth0 as jest.Mock<any>).mockReturnValue({
            isLoading,
            isAuthenticated,
            user,
            error,
            loginWithRedirect: jest.fn()
        });
    };

    it('should return the logged in user', () => {
        const mockUser = {
            name: 'Jon Snow'
        };

        createMockAuth0({
            isLoading: false,
            isAuthenticated: true,
            user: mockUser
        });

        const { result } = renderHook(() => useAuthGuard());

        expect(result.current.user).toBe(mockUser);
    });

    it('should route to login if not authenticated and required', () => {
        createMockAuth0({
            isLoading: false,
            isAuthenticated: false
        });

        const mockRouterPush = jest.fn();
        (useRouter as jest.Mock<any>).mockReturnValue({
            push: mockRouterPush
        });

        renderHook(() => useAuthGuard());

        expect(mockRouterPush).toHaveBeenCalledWith('/login');
    });

    it('should not route to login if not authenticated and not required', () => {
        createMockAuth0({
            isLoading: false,
            isAuthenticated: false
        });

        const mockRouterPush = jest.fn();
        (useRouter as jest.Mock<any>).mockReturnValue({
            push: mockRouterPush
        });

        renderHook(() => useAuthGuard(false));

        expect(mockRouterPush).not.toHaveBeenCalledWith('/login');
    });

    it('should route to home if authenticated and not required', () => {
        createMockAuth0({
            isLoading: false,
            isAuthenticated: true
        });

        const mockRouterPush = jest.fn();
        (useRouter as jest.Mock<any>).mockReturnValue({
            push: mockRouterPush
        });

        renderHook(() => useAuthGuard(false));

        expect(mockRouterPush).toHaveBeenCalledWith('/');
    });

    it('should not route anywhere if auth is loading', () => {
        createMockAuth0({
            isLoading: true,
            isAuthenticated: false
        });

        const mockRouterPush = jest.fn();
        (useRouter as jest.Mock<any>).mockReturnValue({
            push: mockRouterPush
        });

        renderHook(() => useAuthGuard(false));

        expect(mockRouterPush).not.toHaveBeenCalled();
    });
});
