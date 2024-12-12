import React, { useState } from "react";
import Columns from "@lib/components/Columns";
import { useRequest } from "@lib/hooks/useRequest";
import { TabType } from "@lib/components/Tabs";
import { RequestConfig } from "./RequestConfig";
import Response from "./Response";
import RequestConfigProvider from "@lib/providers/RequestConfigProvider";
import RequestController from "@lib/providers/RequestController";
import HTTPResponseProvider from "@lib/providers/HTTPResponseProvider";
import EventResponseProvider from "@lib/providers/EventResponseProvider";

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
            <HTTPResponseProvider>
                <EventResponseProvider>
                    <RequestController>
                        <Columns
                            left={<RequestConfig />}
                            right={<Response />}
                        />
                    </RequestController>
                </EventResponseProvider>
            </HTTPResponseProvider>
        </RequestConfigProvider>
    )
}