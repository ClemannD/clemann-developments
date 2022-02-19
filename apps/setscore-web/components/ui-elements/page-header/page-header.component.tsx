import {
    ButtonAppearance,
    Button
} from '@clemann-developments/react/components/interaction/button';
import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import styles from './page-header.module.scss';

export type PageHeaderProps = {
    subHeader?: string;
    header?: string;

    backButtonText?: string;
    backButtonHandler?: () => void;

    actionButtonText?: any;
    actionButtonHandler?: () => void;
    actionButtonAppearance?: ButtonAppearance;
    children?: any;
};

export default function PageHeader({
    subHeader,
    header,
    backButtonText,
    backButtonHandler,
    actionButtonHandler,
    actionButtonText,
    actionButtonAppearance = ButtonAppearance.Primary,
    children
}: PageHeaderProps) {
    const { mediumBelow } = useWindowSize();

    return (
        <div
            className={`${styles.pageHeader} ${
                backButtonText && backButtonHandler ? styles.hasBackButton : ''
            }`}
        >
            <div className={styles.headerLeft}>
                {backButtonText && backButtonHandler && (
                    <Button
                        className={styles.backButton}
                        clickHandler={backButtonHandler}
                        appearance={ButtonAppearance.Transparent}
                    >
                        <ArrowCircleLeftIcon
                            style={{
                                height: '2.4rem',
                                marginRight: '0.5rem'
                            }}
                        ></ArrowCircleLeftIcon>
                        {/* <ChevronLeftIcon
                                style={{
                                    height: '1.4rem',
                                    marginRight: '0.5rem'
                                }}
                            ></ChevronLeftIcon>
                            {backButtonText} */}
                    </Button>
                )}
                <div className={styles.header}>
                    <h6>{subHeader}</h6>
                    <h2>{header}</h2>
                </div>
            </div>
            {children}
            {actionButtonText && actionButtonHandler && (
                <div className={styles.actionButton}>
                    <Button
                        appearance={actionButtonAppearance}
                        clickHandler={actionButtonHandler}
                    >
                        {actionButtonText}
                    </Button>
                </div>
            )}
        </div>
    );
}
