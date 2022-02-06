import { useContext, useState } from 'react';
import { EventBusContext } from './eventBus.context';

export function useEventBus<TEventActionTypes = any>() {
    const [eventBusListenersState, setEventBusListenersState] = useState<{
        [key: string]: Function[];
    }>({});

    const { setEventBusListeners } = useContext(EventBusContext);

    const addEventListener = (
        eventName: TEventActionTypes,
        callback: Function
    ) => {
        setEventBusListeners((previousEventListeners: any) => {
            if (!previousEventListeners[eventName]) {
                previousEventListeners[eventName] = [];
            }
            previousEventListeners[eventName].push(callback);
            return previousEventListeners;
        });
    };

    const removeEventListener = (
        eventName: TEventActionTypes,
        callback: Function
    ) => {
        setEventBusListeners((previousEventListeners: any) => {
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

    const dispatchEvent = (eventName: TEventActionTypes, data?: any) => {
        setEventBusListeners((previousEventListeners: any) => {
            if (previousEventListeners[eventName]) {
                previousEventListeners[eventName].forEach((callback: any) =>
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
