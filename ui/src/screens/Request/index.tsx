import React, { useEffect, useState } from "react";
import { VSCodeButton, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import { css } from "@styled-system/css";
import Columns from "@lib/components/Columns";
import { useRequest } from "@lib/hooks/useRequest";
import UrlSelector from "@lib/components/UrlSelector";
import Tabs, { TabType } from "@lib/components/Tabs";
import { RequestConfig } from "./RequestConfig";
import Response from "./Response";
import RequestConfigProvider from "@lib/providers/RequestConfigProvider";
import Welcome from "@lib/components/Welcome";
import { VsCodeApiProvider } from "@lib/providers/VsCodeApiProvider";
import RequestController from "@lib/providers/RequestController";

export const requestTabs: TabType[] = [
    {
        id: 'query',
        label: 'Query',
    },
    {
        id: 'headers',
        label: 'Headers',
    },
    {
        id: 'body',
        label: 'Body',
    },
]

export function Request() {
    const request = useRequest();

    const [requestTab, setRequestTab] = useState('query');

    return (
        <RequestConfigProvider>
            <RequestController>
                <Columns
                    left={<RequestConfig />}
                    right={<Response />}
                />
            </RequestController>
        </RequestConfigProvider>
    )
}