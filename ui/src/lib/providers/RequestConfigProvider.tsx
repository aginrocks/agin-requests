import { createContext, useEffect, useReducer } from "react";
import type { RequestConfig } from "@lib/types";
import { useForm } from "@mantine/form";
import { useVscode } from "@lib/hooks";

export type RequestConfigContext = ReturnType<typeof useForm<RequestConfig>>;

export const RequestConfigContext = createContext<RequestConfigContext | null>(null);

export default function RequestConfigProvider({ children }: { children: React.ReactNode }) {
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

    const vscode = useVscode();

    useEffect(() => {
        if (!vscode) return;
        vscode.setState({ requestConfig: config.values });
    }, [config.values, vscode]);

    useEffect(() => {
        if (vscode == null) return;
        const savedState = vscode.getState();
        config.setValues(savedState?.requestConfig);
    }, [vscode == null]);

    return (
        <RequestConfigContext.Provider value={config}>
            {children}
        </RequestConfigContext.Provider>
    )
}