import { useVsCodeApi } from '@lib/hooks';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type SyncedStateType = Record<string, any>;

type SyncedStateContextType = {
    values: SyncedStateType;
    set: (key: string, value: string) => void;
    isLoaded: boolean;
};

const initialValue: SyncedStateContextType = {
    values: {},
    set: (key: string, value: string) => { },
    isLoaded: false,
};

export const SyncedStateContext = createContext<SyncedStateContextType>(initialValue);

export default function SyncedStateProvider({ children }: { children: React.ReactNode }) {
    const vscode = useVsCodeApi();

    const [syncedState, setSyncedState] = useState<SyncedStateType>({});

    const [isLoaded, setIsLoaded] = useState(false);

    const set = useCallback((key: string, value: string) => {
        setSyncedState(s => ({
            ...s,
            [key]: value,
        }));
    }, [setSyncedState]);

    useEffect(() => {
        if (!vscode?.getState) return;
        const savedState = vscode.getState();
        console.log({ savedState });

        setSyncedState(savedState);
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        vscode.setState(syncedState);
    }, [syncedState]);

    return (
        <SyncedStateContext.Provider value={{ values: syncedState, set, isLoaded }}>
            {children}
        </SyncedStateContext.Provider>
    );
}
