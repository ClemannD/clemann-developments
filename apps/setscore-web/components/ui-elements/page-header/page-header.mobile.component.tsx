import styles from './page-header.mobile.module.scss';

export type PageHeaderMobileProps = {
    subHeader?: string;
    header?: string;

    backButtonText?: string;
    backButtonHandler?: () => void;
    collapsed?: boolean;
    expanded?: boolean;
    clickHandler?: () => void;
    overlayClickHandler?: () => void;

    height?: string;
    children?: any;
};

export default function PageHeaderMobile({
    subHeader,
    header,
    backButtonText,
    backButtonHandler,
    collapsed = false,
    expanded = false,
    clickHandler,
    overlayClickHandler,
    height = 'auto',
    children
}: PageHeaderMobileProps) {
    return (
        <>
            {expanded && (
                <div
                    className={styles.overlay}
                    onClick={() => {
                        if (overlayClickHandler) {
                            overlayClickHandler();
                        }
                    }}
                ></div>
            )}
            <div
                style={{ height }}
                className={`
                ${styles.pageHeaderMobile} 
                ${collapsed ? styles.collapsed : ''}
                ${clickHandler ? styles.clickable : ''}
            `}
                onClick={() => {
                    if (clickHandler) {
                        clickHandler();
                    }
                }}
            >
                <h2>{header}</h2>
                {subHeader && <p className="body thin spaced">{subHeader}</p>}
                {children}
            </div>
        </>
    );
}
