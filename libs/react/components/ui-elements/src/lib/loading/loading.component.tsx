import ScaleLoader from 'react-spinners/ScaleLoader';

export function Loading({ color = '#57a773' }: { color?: string }) {
    return (
        <div
            style={{
                paddingTop: '5rem',
                paddingBottom: '5rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <ScaleLoader color={color}></ScaleLoader>
        </div>
    );
}
