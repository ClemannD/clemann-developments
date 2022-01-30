import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Loading() {
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
            <ScaleLoader color="#57a773"></ScaleLoader>
        </div>
    );
}
