import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import type { RequestConfig, VSCodeMessage } from '@shared/types';
import { useForm } from '@mantine/form';
import { useVsCodeApi } from '@lib/hooks/useVsCodeApi';
import useSynced from '@lib/hooks/useSynced';
import { SyncedStateContext } from './SycnedStateProvider';
import { v4 } from 'uuid';

export type RequestConfigContext = ReturnType<typeof useForm<RequestConfig>>;

export const RequestConfigContext = createContext<RequestConfigContext | null>(null);

export default function RequestConfigProvider({ children }: { children: React.ReactNode }) {
    const vscode = useVsCodeApi();

    const config = useForm<RequestConfig>({
        initialValues: {
            id: v4(),
            label: '',
            isDraft: true,
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
    // useEffect(() => {
    //     if (!vscode?.getState) return;
    //     const savedState = vscode.getState();
    //     console.log({ savedState });

    //     config.setValues(savedState?.requestConfig);

    //     setLoadedFromCode(true);
    // }, []);

    useSynced('requestConfig', config.values, config.setValues);

    useEffect(() => {
        const icon = config.values.type === 'http' ? config.values.method : config.values.type;
        if (!icon) return;
        vscode.postMessage({ command: 'panel.setIcon', data: icon });

        if (!config.values.label) return;
        vscode.postMessage({ command: 'panel.setTitle', data: `${config.values.label}${config.values.isDraft ? ' (Draft)' : ''}` });
    }, [vscode.postMessage, config.values.label, config.values.isDraft, config.values.method]);

    const synced = useContext(SyncedStateContext);

    useEffect(() => {
        if (!vscode.postMessage || !synced.isLoaded) return;

        console.log('listening on initial.get', !!vscode);

        vscode.postMessage({ command: 'initial.get' });

        const onMessage = (event: { data: VSCodeMessage }) => {
            console.log('got event1', event);

            const message = event.data;
            console.log('cmd', message.command, message);

            if (message.command === 'initial') {
                config.setValues(message.data);
            }
        };

        window.addEventListener('message', onMessage);
        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [synced.isLoaded]);

    // useEffect(() => {
    //     console.log({ saving: config.values });
    //     if (vscode == null) return;

    //     vscode.setState({ requestConfig: config.values });
    // }, [config.values]);


    return (
        <RequestConfigContext.Provider value={config}>
            {children}
        </RequestConfigContext.Provider>
    )
}