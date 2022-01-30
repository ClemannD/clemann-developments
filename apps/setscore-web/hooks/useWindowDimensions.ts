import { useState, useEffect } from 'react';

function getWindowWidth() {
    if (process.browser) {
        const { innerWidth: width } = window;
        return width;
    }
    return 0;
}

export enum WindowSize {
    Small = 576,
    Medium = 768,
    Large = 992,
    ExtraLarge = 1200,
    ExtraExtraLarge = 1600,
    Huge = 9999
}

export default function useWindowSize() {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());
    const [smallBelow, setSmallBelow] = useState(false);
    const [mediumBelow, setMediumBelow] = useState(false);
    const [largeBelow, setLargeBelow] = useState(false);
    const [extraLargeBelow, setExtraLargeBelow] = useState(false);
    const [extraExtraLargeBelow, setExtraExtraLargeBelow] = useState(false);

    useEffect(() => {
        function handleResize() {
            const width = getWindowWidth();
            setWindowWidth(width);

            setSmallBelow(width <= WindowSize.Small);
            setMediumBelow(width <= WindowSize.Medium);
            setLargeBelow(width <= WindowSize.Large);
            setExtraLargeBelow(width <= WindowSize.ExtraLarge);
            setExtraExtraLargeBelow(width <= WindowSize.ExtraExtraLarge);
        }
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        windowWidth,
        smallBelow,
        mediumBelow,
        largeBelow,
        extraLargeBelow,
        extraExtraLargeBelow
    };
}
