type LogoProps = {
    height?: number;
};

const Logo = ({ height }: LogoProps) => (
    <img height={height} src={'/assets/logo.svg'} alt="Spendly" />
);

export default Logo;
