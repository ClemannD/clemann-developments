import { useContext, useState } from 'react';
import EventBusContext from '../context/eventBus.context';

export default function useEventBus() {
    const [eventBusListenersState, setEventBusListenersState] = useState<{
        [key: string]: Function[];
    }>({});

    const { setEventBusListeners } = useContext(EventBusContext);

    const addEventListener = (
        eventName: EventBusActionTypes,
        callback: Function
    ) => {
        setEventBusListeners((previousEventListeners) => {
            if (!previousEventListeners[eventName]) {
                previousEventListeners[eventName] = [];
            }
            previousEventListeners[eventName].push(callback);
            return previousEventListeners;
        });
    };

    const removeEventListener = (
        eventName: EventBusActionTypes,
        callback: Function
    ) => {
        setEventBusListeners((previousEventListeners) => {
            if (previousEventListeners[eventName]) {
                const index =
                    previousEventListeners[eventName].indexOf(callback);
                if (index > -1) {
                    previousEventListeners[eventName].splice(index, 1);
                }
            }
            return previousEventListeners;
        });
    };

    const dispatchEvent = (eventName: EventBusActionTypes, data?: any) => {
        setEventBusListeners((previousEventListeners) => {
            if (previousEventListeners[eventName]) {
                previousEventListeners[eventName].forEach((callback) =>
                    callback(data)
                );
            }
            return previousEventListeners;
        });
    };

    return {
        addEventListener,
        removeEventListener,
        dispatchEvent,
        eventBusContext: {
            eventBusListeners: eventBusListenersState,
            setEventBusListeners: setEventBusListenersState
        }
    };
}

export enum EventBusActionTypes {
    SCORE_SUBMITTED = 'SCORE_SUBMITTED'
}
