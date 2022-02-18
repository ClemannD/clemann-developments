import { useContext, useState } from 'react';
import { ModalContext } from './modal.context';

export function useModal() {
    const [modalContentState, setModalContentState] =
        useState<JSX.Element | null>(null);

    const { setModalContent } = useContext(ModalContext);

    const showModal = (content: JSX.Element) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return {
        modalContext: {
            modalContent: modalContentState,
            setModalContent: setModalContentState
        },
        showModal,
        closeModal
    };
}
