import { createContext } from 'react';

export type ScrollContextType = {
    scrollY: number;
};
const ScrollContext = createContext<ScrollContextType>({
    scrollY: 0
});

export default ScrollContext;
