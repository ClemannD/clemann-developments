import { createContext } from 'react';

export enum ToastType {
    Success = 'Success',
    Error = 'Error'
}

export type ToastContextType = {
    toastInstance: {
        message: string;
        type: ToastType;
    };
    setToastInstance;
};

const ToastContext = createContext<ToastContextType>({
    toastInstance: null,
    setToastInstance: (content) => {}
});
