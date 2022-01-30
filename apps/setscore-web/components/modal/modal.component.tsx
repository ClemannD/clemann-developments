import useModal from '../../hooks/useModal';
import useWindowSize from '../../hooks/useWindowDimensions';
import styles from './modal.module.scss';

export type ModalProps = {
    width?: string;
    onClose?: () => void;
    children?: any;
};

export default function Modal({
    width,
    onClose = () => {},
    children
}: ModalProps) {
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
                style={width && { width }}
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
