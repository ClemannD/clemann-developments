import { createContext } from 'react';

export type EventBusContextType = {
    eventBusListeners: {
        [key: string]: Function[];
    };
    setEventBusListeners: (eventBusListeners) => void;
};

const EventBusContext = createContext<EventBusContextType>({
    eventBusListeners: {},
    setEventBusListeners: () => {}
});
export default EventBusContext;
