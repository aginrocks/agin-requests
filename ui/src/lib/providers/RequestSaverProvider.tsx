import { useInput, useRequest } from '@lib/hooks';
import { createContext, useCallback } from 'react';

type RequestSaverContextType = {
    renameRequest: () => Promise<void>;
}

const initialData: RequestSaverContextType = {
    renameRequest: async () => { }
};

export const RequestSaverContext = createContext<RequestSaverContextType>(initialData);

export default function RequestSaverProvider({ children }: { children: React.ReactNode }) {
    const input = useInput();
    const request = useRequest();

    const renameRequest = useCallback(async () => {
        if (!request) return;
        const newName = await input.showInputBox({
            placeHolder: 'Name this request...',
            prompt: 'Choose a name for this request',
            value: request.values.label,
        });
        if (newName === '' || !newName) return;

        request.setFieldValue('label', newName);
    }, [input, request]);

    return (
        <RequestSaverContext.Provider value={{ renameRequest }}>
            {children}
        </RequestSaverContext.Provider>
    )
}