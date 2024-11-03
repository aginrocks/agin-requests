import React, { createContext, useContext, useEffect, useState } from 'react';

export interface VsCodeApi {
    postMessage: (message: any) => void;
    getState: () => any;
    setState: (newState: any) => void;
}

export interface VsCodeApiContextProps {
    vscode: VsCodeApi | undefined;
    state: any;
    setState: (newState: any) => void;
    getState?: () => any;
    postMessage: (message: any) => void;
}

export const VsCodeApiContext = createContext<VsCodeApiContextProps | undefined>(undefined);

const getVsCodeApi = (): VsCodeApi | undefined => {
    return typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : undefined;
};

export const VsCodeApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [vscode] = useState<VsCodeApi | undefined>(getVsCodeApi);
    const [state, setState] = useState<any>(vscode?.getState() || {});

    const updateState = (newState: any) => {
        vscode?.setState(newState);
        setState(newState);
    };

    const postMessage = (message: any) => {
        vscode?.postMessage(message);
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;
            console.log("Message from extension:", message);
            if (message.type === 'updateState') {
                updateState(message.payload);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [vscode]);

    return (
        <VsCodeApiContext.Provider value={{ vscode, state, setState: updateState, getState: vscode?.getState, postMessage }}>
            {children}
        </VsCodeApiContext.Provider>
    );
};
