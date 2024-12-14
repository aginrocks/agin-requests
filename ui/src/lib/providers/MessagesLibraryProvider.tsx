import MessagesLibrary from "@lib/drawers/MessagesLibrary";
import { useDisclosure } from "@mantine/hooks";
import React, { createContext, useState } from "react";

export type MessagesLibraryContextType = ReturnType<typeof useDisclosure>;

export const MessagesLibraryContext = createContext<MessagesLibraryContextType[1]>({
    close: () => { },
    open: () => { },
    toggle: () => { },
});

export default function MessagesLibraryProvider({ children }: { children: React.ReactNode }) {
    const [opened, lib] = useDisclosure(false);

    return (
        <MessagesLibraryContext.Provider value={lib}>
            <MessagesLibrary
                opened={opened}
                onClose={lib.close}
            />
            {children}
        </MessagesLibraryContext.Provider>
    )
}