import { useAuth0 } from '@auth0/auth0-react';
import {
    useEventBus,
    EventBusContext
} from '@clemann-developments/react/hooks/use-event-bus';
import {
    useModal,
    ModalContext
} from '@clemann-developments/react/hooks/use-modal';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetCurrentUser from '../api-services/auth/getCurrentUser.service';
import Overlay from '../components/modal/overlay/overlay.component';
import CurrentLeagueContext from '../context/currentLeague.context';
import OverlayContext from '../context/overlay.context';
import UserContext from '../context/user.context';
import useOverlay from '../hooks/useOverlay';

export default function App({ children }) {
    const { modalContext } = useModal();
    const { overlayContext } = useOverlay();
    const eventBus = useEventBus();
    const { user, logout } = useAuth0();

    const getCurrentUser = useGetCurrentUser();

    useEffect(() => {
        if (user) {
            getCurrentUser.mutate({});
        }
    }, [user]);

    return (
        <EventBusContext.Provider value={eventBus.eventBusContext}>
            <ModalContext.Provider value={modalContext}>
                <OverlayContext.Provider value={overlayContext}>
                    <UserContext.Provider
                        value={{
                            user: getCurrentUser.data?.user,
                            getCurrentUser
                        }}
                    >
                        <CurrentLeagueContext.Provider
                            value={getCurrentUser.data?.currentLeague}
                        >
                            <div className="set-score-global">
                                <div
                                    style={{
                                        overflow: modalContext.modalContent
                                            ? 'hidden'
                                            : 'initial',
                                        height: modalContext.modalContent
                                            ? '100vh'
                                            : 'auto'
                                    }}
                                >
                                    {children}
                                </div>
                                <ToastContainer
                                    autoClose={5000}
                                ></ToastContainer>
                                {modalContext.modalContent ? (
                                    modalContext.modalContent
                                ) : (
                                    <></>
                                )}
                                {overlayContext.showOverlay && (
                                    <Overlay></Overlay>
                                )}
                            </div>
                        </CurrentLeagueContext.Provider>
                    </UserContext.Provider>
                </OverlayContext.Provider>
            </ModalContext.Provider>
        </EventBusContext.Provider>
    );
}
