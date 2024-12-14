import MessagesLibrary from "@lib/drawers/MessagesLibrary";
import React, { createContext, useState } from "react";

export type MessagesLibraryContextType = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
]

export const MessagesLibraryContext = createContext<MessagesLibraryContextType>([
    false,
    () => { },
]);

export default function MessagesLibraryProvider({ children }: { children: React.ReactNode }) {
    const [opened, setOpened] = useState(false);

    return (
        <MessagesLibraryContext.Provider value={[opened, setOpened]}>
            <MessagesLibrary
                opened={opened}
                onClose={() => setOpened(false)}
            />
            {children}
        </MessagesLibraryContext.Provider>
    )
}