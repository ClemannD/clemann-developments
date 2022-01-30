import Logo from '../logo/logo.component';
import TennisCourt from '../tennis-court/tennis-court.component';

type TennisCourtProps = {
    height?: number;
    className?: string;
};

const TennisCourtWithLogo = ({ height, className }: TennisCourtProps) => (
    <div
        style={{ display: 'flex', alignItems: 'center' }}
        className={className || ''}
    >
        <div
            style={{ marginRight: `${height / 40}rem`, height: `${height}px` }}
        >
            <TennisCourt height={height}></TennisCourt>
        </div>
        <div style={{ height: `${height - 15}px` }}>
            <Logo height={height - 15}></Logo>
        </div>
    </div>
);

export default TennisCourtWithLogo;
