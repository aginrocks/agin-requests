import React, { useEffect, useState } from "react";
import Columns from "@lib/components/Columns";
import { useRequest } from "@lib/hooks/useRequest";
import UrlSelector from "@lib/components/UrlSelector";
import Tabs, { TabType } from "@lib/components/Tabs";
import { container, urlSelector } from "./styles";

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

export function RequestConfig() {
    const request = useRequest();

    const [requestTab, setRequestTab] = useState('query');

    return (
        <div className={container}>
            <div className={urlSelector}>
                <UrlSelector />
            </div>
            <Tabs tabs={requestTabs} active={requestTab} onChange={setRequestTab} />
        </div>
    )
}