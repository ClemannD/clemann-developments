import React from 'react';
import { ScaleLoader } from 'react-spinners';

export default function Refreshing() {
    return (
        <div
            style={{
                paddingTop: '2.5rem',
                paddingBottom: '2rem'
            }}
        >
            <ScaleLoader
                color="#57a773"
                height={'10px'}
                width={'3px'}
            ></ScaleLoader>

            <p className="grayDarker smaller">Refreshing</p>
        </div>
    );
}
