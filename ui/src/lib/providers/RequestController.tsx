import { useRequest } from "@lib/hooks";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type RequestStatus = 'idle' | 'pending' | 'ws-connected' | 'finished';

export type RequestStateValue = {
    status: RequestStatus,
    send: () => void,
}

export const RequestState = createContext<RequestStateValue>({
    status: 'idle',
    send: () => { },
});

export default function RequestController({ children }: { children: React.ReactNode }) {
    const request = useRequest();
    const vscode = useVsCodeApi();

    const [status, setStatus] = useState<RequestStatus>('idle');

    const send = useCallback(() => {
        setStatus('pending');
        vscode.postMessage({ command: 'request.execute', config: request?.values });
    }, [request?.values]);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const message = event.data;
            if (message.command === 'request.finished') {
                setStatus('finished');
                // TODO: Set response
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    return (
        <RequestState.Provider value={{ status: status, send }}>
            {children}
        </RequestState.Provider>
    )
}