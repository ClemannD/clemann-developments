import { createContext } from 'react';

export type EventBusContextType = {
    eventBusListeners: {
        [key: string]: Function[];
    };
    setEventBusListeners: (eventBusListeners: any) => void;
};

export const EventBusContext = createContext<EventBusContextType>({
    eventBusListeners: {},
    setEventBusListeners: () => {}
});
