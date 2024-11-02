import React, { createContext, useContext, useRef, useEffect } from 'react';

export const VscodeContext = createContext<any>(null);

declare const acquireVsCodeApi: () => {
    postMessage: (message: { command: string }) => void;
};

const VscodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const vscode = useRef<any>(null);

    useEffect(() => {
        // Only acquire the VS Code API once
        if (!vscode.current) {
            vscode.current = acquireVsCodeApi(); // Obtain the vscode API
            console.log('VSCode API acquired:', vscode.current);
        }
    }, []);

    return (
        <VscodeContext.Provider value={vscode.current}>
            {children}
        </VscodeContext.Provider>
    );
};

export default VscodeProvider;
