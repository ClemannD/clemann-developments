import { createContext } from 'react';

export type ModalContextType = {
    modalContent: JSX.Element;
    setModalContent: (content) => void;
};

const ModalContext = createContext<ModalContextType>({
    modalContent: null,
    setModalContent: (content) => {}
});

export default ModalContext;
