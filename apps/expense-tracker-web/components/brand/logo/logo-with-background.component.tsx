type LogoProps = {
    height?: number;
};

const LogoWithBackground = ({ height }: LogoProps) => (
    <img
        height={height}
        src={'/assets/LogoWithBackgroundDark.svg'}
        alt="Spendly"
    />
);

export default LogoWithBackground;
