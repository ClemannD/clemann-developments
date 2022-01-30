type TennisCourtProps = {
    height?: number;
};

const TennisCourt = ({ height }: TennisCourtProps) => (
    <img
        height={height}
        src="/assets/tennisCourt.svg"
        alt="Tennis court icon"
    />
);
export default TennisCourt;
