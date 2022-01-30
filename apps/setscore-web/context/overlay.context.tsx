import { createContext } from 'react';

export type OverlayContextType = {
    showOverlay: boolean;
    setShowOverlay: (show) => void;
};

const OverlayContext = createContext<OverlayContextType>({
    showOverlay: null,
    setShowOverlay: (show) => {}
});

export default OverlayContext;
