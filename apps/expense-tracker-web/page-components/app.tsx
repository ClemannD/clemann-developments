import { useAuth0 } from '@auth0/auth0-react';
import {
    EventBusContext,
    useEventBus
} from '@clemann-developments/react/hooks/use-event-bus';
import {
    ModalContext,
    useModal
} from '@clemann-developments/react/hooks/use-modal';
import React, { useEffect } from 'react';
import 'react-color-palette/lib/css/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetCurrentUser from '../api-services/auth/getCurrentUser.service';
import UserContext from '../context/user.context';

export default function App({ children }) {
    const { modalContext } = useModal();
    const eventBus = useEventBus();
    const { user } = useAuth0();

    const getCurrentUser = useGetCurrentUser();

    useEffect(() => {
        if (user) {
            getCurrentUser.mutate({});
        }
    }, [user]);

    return (
        <EventBusContext.Provider value={eventBus.eventBusContext}>
            <ModalContext.Provider value={modalContext}>
                <UserContext.Provider
                    value={{
                        user: getCurrentUser.data?.user,
                        getCurrentUser
                    }}
                >
                    <div className="expense-tracker-global">
                        <div
                            style={{
                                overflow: modalContext.modalContent
                                    ? 'hidden'
                                    : 'initial'
                            }}
                        >
                            {children}
                        </div>
                        <ToastContainer autoClose={5000}></ToastContainer>
                        {modalContext.modalContent ? (
                            modalContext.modalContent
                        ) : (
                            <></>
                        )}
                    </div>
                </UserContext.Provider>
            </ModalContext.Provider>
        </EventBusContext.Provider>
    );
}
