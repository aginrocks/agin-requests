import { createContext, useReducer } from "react";
import type { RequestConfig } from "@lib/types";
import { useForm } from "@mantine/form";

export type RequestConfigContext = ReturnType<typeof useForm<RequestConfig>>;

export const RequestConfigContext = createContext<RequestConfigContext | null>(null);

export default function RequestConfigProvider({ children }: { children: React.ReactNode }) {
    const config = useForm<RequestConfig>({
        initialValues: {
            type: 'http',
            url: '',
            method: 'get',
            headers: [],
            params: [],
            requestBodyType: 'none',
        },
    });

    return (
        <RequestConfigContext.Provider value={config}>
            {children}
        </RequestConfigContext.Provider>
    )
}