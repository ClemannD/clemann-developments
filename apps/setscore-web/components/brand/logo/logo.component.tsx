type LogoProps = {
    height?: number;
    white?: boolean;
};

const Logo = ({ height, white }: LogoProps) => (
    <img
        height={height}
        src={white ? '/assets/SetScore-white.svg' : '/assets/SetScore.svg'}
        alt="SetScore"
    />
);

export default Logo;
