import styles from './modal.module.scss';
import { useModal } from './useModal';

export type ModalProps = {
    width?: string;
    onClose?: () => void;
    children?: any;
};

export function Modal({ width, onClose = () => {}, children }: ModalProps) {
    const { closeModal } = useModal();

    return (
        <div
            className={styles.overlay}
            onClick={() => {
                closeModal();
                onClose();
            }}
        >
            <div
                style={width ? { width } : {}}
                className={styles.modalContainer}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
}
