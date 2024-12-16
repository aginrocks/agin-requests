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
import RealtimeMessagesProvider from "@lib/providers/RealtimeMessagesProvider";
import MessagesLibraryProvider from "@lib/providers/MessagesLibraryProvider";
import SyncedStateProvider from "@lib/providers/SycnedStateProvider";

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

    const [drawer, setDrawer] = useState(true);

    return (
        <SyncedStateProvider>
            <RequestConfigProvider>
                <HTTPResponseProvider>
                    <EventResponseProvider>
                        <RealtimeMessagesProvider>
                            <RequestController>
                                <MessagesLibraryProvider>
                                    <Columns
                                        left={<RequestConfig />}
                                        right={<Response />}
                                    />
                                </MessagesLibraryProvider>
                            </RequestController>
                        </RealtimeMessagesProvider>
                    </EventResponseProvider>
                </HTTPResponseProvider>
            </RequestConfigProvider>
        </SyncedStateProvider>
    )
}