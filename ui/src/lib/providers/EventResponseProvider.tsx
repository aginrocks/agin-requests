import { ServerEvent } from "@shared/types/ServerEvent";
import React, { createContext, useCallback, useState } from "react";

type EventResponseContextType = {
    events: ServerEvent<any>[],
    setEvents: React.Dispatch<React.SetStateAction<ServerEvent<any>[]>>,
    addEvent: (event: ServerEvent<any>) => void;
    connected: boolean;
    setConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EventResponseContext = createContext<EventResponseContextType>({
    events: [],
    setEvents: () => { },
    addEvent: () => { },
    connected: false,
    setConnected: () => { },
});

export default function EventResponseProvider({ children }: { children: React.ReactNode }) {
    const [events, setEvents] = useState<ServerEvent<any>[]>([]);

    const [connected, setConnected] = useState(false);

    // TODO: Add syncing with main (to also include messages that were sent while the tab was inactive)

    const addEvent = useCallback((event: ServerEvent<any>) => {
        setEvents(r => [...r, event]);
    }, []);

    return (
        <EventResponseContext.Provider value={{ events, setEvents, addEvent, connected, setConnected }}>
            {children}
        </EventResponseContext.Provider>
    )
}