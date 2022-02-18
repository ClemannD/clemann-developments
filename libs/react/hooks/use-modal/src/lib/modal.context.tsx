import { createContext } from 'react';

export type ModalContextType = {
    modalContent: JSX.Element | null;
    setModalContent: (content: any) => void;
};

export const ModalContext = createContext<ModalContextType>({
    modalContent: null,
    setModalContent: (content) => {}
});
