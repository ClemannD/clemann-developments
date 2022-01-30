import useModal from '../../../hooks/useModal';
import useWindowSize from '../../../hooks/useWindowDimensions';
import Button, {
    ButtonAppearance,
    ButtonSize
} from '../../buttons/button.component';
import styles from './modal-footer.module.scss';

export type ModalFooterProps = {
    okButtonText?: string;
    cancelButtonText?: string;
    onOkClick?: () => void;
    onCancelClick?: () => void;
    okButtonType?: 'button' | 'submit';
    hideOkButton?: boolean;
    isDangerButton?: boolean;
    isSubmitting?: boolean;
    okButtonDisabled?: boolean;
};

export default function ModalFooter({
    okButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
    onOkClick = () => {},
    onCancelClick,
    okButtonType = 'button',
    hideOkButton = false,
    isDangerButton = false,
    isSubmitting = false,
    okButtonDisabled = false
}: ModalFooterProps) {
    const { closeModal } = useModal();
    const { mediumBelow } = useWindowSize();

    return (
        <div className={styles.modalFooter}>
            <div
                style={{
                    marginRight: hideOkButton ? '0' : '2rem',
                    width: hideOkButton ? '100%' : 'auto'
                }}
            >
                <Button
                    size={
                        hideOkButton
                            ? ButtonSize.Block
                            : mediumBelow
                            ? ButtonSize.Small
                            : ButtonSize.Medium
                    }
                    appearance={ButtonAppearance.Secondary}
                    clickHandler={onCancelClick || closeModal}
                >
                    {cancelButtonText}
                </Button>
            </div>

            {!hideOkButton && (
                <Button
                    appearance={
                        isDangerButton
                            ? ButtonAppearance.Danger
                            : ButtonAppearance.Primary
                    }
                    type={okButtonType}
                    isDisabled={okButtonDisabled}
                    isSubmitting={isSubmitting}
                    size={ButtonSize.Block}
                    clickHandler={onOkClick}
                >
                    {okButtonText}
                </Button>
            )}
        </div>
    );
}
