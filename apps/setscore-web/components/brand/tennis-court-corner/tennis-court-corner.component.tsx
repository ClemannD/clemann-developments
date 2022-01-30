type TennisCourtProps = {
    height?: number;
    className?: string;
};

const TennisCourtCorner = ({ height, className }: TennisCourtProps) => (
    <img
        height={height}
        className={className || ''}
        src="assets/tennisCourtCorner.svg"
        alt="Tennis court corner icon"
    />
);
export default TennisCourtCorner;
