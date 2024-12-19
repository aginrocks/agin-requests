import { createContext, useEffect, useReducer, useState } from "react";
import type { RequestConfig } from "@shared/types";
import { useForm } from "@mantine/form";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { HTTPResponse } from "@shared/types/HTTPResponse";
import useSynced from "@lib/hooks/useSynced";

type HTTPResponseContextType = [
    HTTPResponse<any>,
    React.Dispatch<React.SetStateAction<HTTPResponse<any>>>
];

const defaultResponse: HTTPResponse = {
    headers: {},
    data: {},
    status: 0,
    metrics: {
        bodySize: 0,
        headersSize: 0,
        totalSize: 0,
        time: 0,
    }
}

export const HTTPResponseContext = createContext<HTTPResponseContextType>([defaultResponse, () => { }]);

export default function HTTPResponseProvider({ children }: { children: React.ReactNode }) {
    const vscode = useVsCodeApi();

    const [res, setRes] = useState<HTTPResponse<any>>(defaultResponse);

    useSynced('httpResponse', res, setRes);

    // useEffect(() => {
    //     if (!vscode?.getState) return;
    //     const savedState = vscode.getState();
    //     console.log({ savedState });

    //     config.setValues(savedState?.requestConfig);
    // }, []);

    // useEffect(() => {
    //     console.log({ saving: config.values });
    //     if (vscode == null) return;

    //     vscode.setState({ requestConfig: config.values });
    // }, [config.values]);


    return (
        <HTTPResponseContext.Provider value={[res, setRes]}>
            {children}
        </HTTPResponseContext.Provider>
    )
}