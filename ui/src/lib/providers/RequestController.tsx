import { useRequest } from "@lib/hooks";
import { useEventResponse } from "@lib/hooks/useEventResponse";
import { useHTTPResponse } from "@lib/hooks/useHTTPResponse";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { RealtimeMessage } from "./RealtimeMessagesProvider";

export type RequestStatus = 'idle' | 'pending' | 'realtime' | 'finished' | 'canceled';

export type RequestStateValue = {
    status: RequestStatus,
    send: () => void,
    cancel: () => void,
    sendMessage: (message: RealtimeMessage) => void,
}

export const RequestState = createContext<RequestStateValue>({
    status: 'idle',
    send: () => { },
    cancel: () => { },
    sendMessage: () => { },
});

export default function RequestController({ children }: { children: React.ReactNode }) {
    const request = useRequest();
    const [res, setRes] = useHTTPResponse();
    const eventResponse = useEventResponse();
    const vscode = useVsCodeApi();

    const [status, setStatus] = useState<RequestStatus>('idle');

    const send = useCallback(() => {
        if (request?.values.type == 'http') {
            setStatus('pending');
            vscode.postMessage({ command: 'request.execute', config: request?.values });
        } else if (request?.values.type == 'sse') {
            setStatus('realtime');
            vscode.postMessage({ command: 'sse.connect', config: request?.values });
        } else if (request?.values.type == 'ws') {
            setStatus('realtime');
            vscode.postMessage({ command: 'ws.connect', config: request?.values });
        } else if (request?.values.type == 'socketio') {
            setStatus('realtime');
            vscode.postMessage({ command: 'io.connect', config: request?.values });
        }
    }, [request?.values]);

    const sendMessage = useCallback((message: RealtimeMessage) => {
        console.log('sending', message);

        if (request?.values.type == 'ws') {
            vscode.postMessage({ command: 'ws.send', data: message });
        } else if (request?.values.type == 'socketio') {
            vscode.postMessage({ command: 'io.send', data: message });
        }
    }, [request]);

    const cancel = useCallback(() => {
        if (request?.values.type == 'http') {
            setStatus('canceled');
            vscode.postMessage({ command: 'request.cancel' });
        } else if (request?.values.type == 'sse') {
            vscode.postMessage({ command: 'sse.disconnect' });
        } else if (request?.values.type == 'ws') {
            vscode.postMessage({ command: 'ws.disconnect' });
        } else if (request?.values.type == 'socketio') {
            vscode.postMessage({ command: 'io.disconnect' });
        }
    }, [request?.values]);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const message = event.data;
            if (message.command === 'request.finished') {
                setStatus('finished');
                setRes(message.data);
            } else if (message.command === 'realtime.message') {
                eventResponse.addEvent({ ...message.data, receivedAt: new Date(message.data.receivedAt) });
            } else if (message.command === 'realtime.connected') {
                eventResponse.setConnected(!!message.data);
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    return (
        <RequestState.Provider value={{ status: status, send, sendMessage, cancel }}>
            {children}
        </RequestState.Provider>
    )
}