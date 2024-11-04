import { createContext, useEffect, useReducer, useState } from "react";
import type { RequestConfig } from "@lib/types";
import { useForm } from "@mantine/form";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { HTTPResponse } from "@lib/types/HTTPResponse";

type HTTPResponseContextType = [
    HTTPResponse<any>,
    React.Dispatch<React.SetStateAction<HTTPResponse<any>>>
];

const defaultResponse = {
    headers: {},
    data: {},
    status: 0,
}

export const HTTPResponseContext = createContext<HTTPResponseContextType>([defaultResponse, () => { }]);

export default function HTTPResponseProvider({ children }: { children: React.ReactNode }) {
    const vscode = useVsCodeApi();

    const [res, setRes] = useState<HTTPResponse<any>>(defaultResponse);

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