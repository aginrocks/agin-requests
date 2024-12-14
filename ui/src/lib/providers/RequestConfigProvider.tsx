import { createContext, useEffect, useReducer, useState } from "react";
import type { RequestConfig } from "@lib/types";
import { useForm } from "@mantine/form";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";

export type RequestConfigContext = ReturnType<typeof useForm<RequestConfig>>;

export const RequestConfigContext = createContext<RequestConfigContext | null>(null);

export default function RequestConfigProvider({ children }: { children: React.ReactNode }) {
    const vscode = useVsCodeApi();

    const [loadedFromCode, setLoadedFromCode] = useState<boolean>(false);

    const config = useForm<RequestConfig>({
        initialValues: {
            type: 'http',
            url: '',
            method: 'get',
            headers: [
                {
                    enabled: true,
                    name: 'Accept',
                    value: '*/*',
                },
                {
                    enabled: true,
                    name: 'User-Agent',
                    value: 'AginRequests/1.0.0',
                },
                {
                    enabled: true,
                    name: 'Accept-Encoding',
                    value: 'gzip, deflate, br',
                },
                {
                    enabled: true,
                    name: 'Connection',
                    value: 'keep-alive',
                },
            ],
            params: [],
            requestBodyType: 'none',
            authType: 'none',
            messages: [],
            auth: {
                basic: {
                    username: '',
                    password: '',
                },
                bearer: {
                    token: '',
                    prefix: 'Bearer',
                }
            }
        },
    });
    useEffect(() => {
        if (!vscode?.getState) return;
        const savedState = vscode.getState();
        console.log({ savedState });

        config.setValues(savedState?.requestConfig);

        setLoadedFromCode(true);
    }, []);

    useEffect(() => {
        if (!vscode.postMessage || !loadedFromCode) return;

        console.log('listening on initial.get', !!vscode);

        vscode.postMessage({ command: 'initial.get' });

        const onMessage = (event: MessageEvent) => {
            console.log('got event1', event);

            const message = event.data;
            console.log('cmd', message.command, message);

            if (message.command === 'initial') {
                config.setValues(message.data);
                setLoadedFromCode(true);
            }
        };

        window.addEventListener('message', onMessage);
        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [loadedFromCode]);

    useEffect(() => {
        console.log({ saving: config.values });
        if (vscode == null) return;

        vscode.setState({ requestConfig: config.values });
    }, [config.values]);


    return (
        <RequestConfigContext.Provider value={config}>
            {children}
        </RequestConfigContext.Provider>
    )
}