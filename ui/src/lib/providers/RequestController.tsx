import { useRequest } from "@lib/hooks";
import { useHTTPResponse } from "@lib/hooks/useHTTPResponse";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type RequestStatus = 'idle' | 'pending' | 'ws-connected' | 'finished' | 'canceled';

export type RequestStateValue = {
    status: RequestStatus,
    send: () => void,
    cancel: () => void,
}

export const RequestState = createContext<RequestStateValue>({
    status: 'idle',
    send: () => { },
    cancel: () => { },
});

export default function RequestController({ children }: { children: React.ReactNode }) {
    const request = useRequest();
    const [res, setRes] = useHTTPResponse();
    const vscode = useVsCodeApi();

    const [status, setStatus] = useState<RequestStatus>('idle');

    const send = useCallback(() => {
        setStatus('pending');
        vscode.postMessage({ command: 'request.execute', config: request?.values });
    }, [request?.values]);

    const cancel = useCallback(() => {
        setStatus('canceled');
        vscode.postMessage({ command: 'request.cancel', });
    }, []);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const message = event.data;
            if (message.command === 'request.finished') {
                setStatus('finished');
                setRes(message.data);
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    return (
        <RequestState.Provider value={{ status: status, send, cancel }}>
            {children}
        </RequestState.Provider>
    )
}