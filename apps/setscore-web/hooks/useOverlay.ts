import { useContext, useState } from 'react';
import OverlayContext from '../context/overlay.context';

export default function useOverlay() {
    const [showOverlayState, setShowOverlayState] = useState<boolean>(false);

    const { setShowOverlay } = useContext(OverlayContext);

    const showOverlay = () => {
        setShowOverlay(true);
    };

    const hideOverlay = () => {
        setShowOverlay(false);
    };

    return {
        overlayContext: {
            showOverlay: showOverlayState,
            setShowOverlay: setShowOverlayState
        },
        showOverlay,
        hideOverlay
    };
}
