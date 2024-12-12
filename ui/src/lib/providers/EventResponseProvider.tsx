import { ServerEvent } from "@lib/types/ServerEvent";
import React, { createContext, useCallback, useState } from "react";

type EventResponseContextType = {
    events: ServerEvent<any>[],
    setEvents: React.Dispatch<React.SetStateAction<ServerEvent<any>[]>>,
    addEvent: (event: ServerEvent<any>) => void;
};

export const EventResponseContext = createContext<EventResponseContextType>({
    events: [],
    setEvents: () => { },
    addEvent: () => { },
});

export default function EventResponseProvider({ children }: { children: React.ReactNode }) {
    const [events, setEvents] = useState<ServerEvent<any>[]>([]);

    const addEvent = useCallback((event: ServerEvent<any>) => {
        setEvents(r => [...r, event]);
    }, []);

    return (
        <EventResponseContext.Provider value={{ events, setEvents, addEvent }}>
            {children}
        </EventResponseContext.Provider>
    )
}