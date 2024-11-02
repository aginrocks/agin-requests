import React, { useEffect, useState } from "react";
import { useRequest } from "@lib/hooks/useRequest";
import UrlSelector from "@lib/components/UrlSelector";
import Tabs, { TabType } from "@lib/components/Tabs";
import { container, left, tabs, urlSelector } from "./styles";
import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import ParamsEditor from "./ParamsEditor";
import HeadersEditor from "./HeadersEditor";
import BodyEditor from "./BodyEditor";

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

    const [tab, setTab] = useState<string>('query');

    useEffect(() => {
        const last = request?.values.params[request?.values.params.length - 1];
        if (last?.name != '' || last?.value != '') request?.insertListItem('params', {
            enabled: false,
            name: '',
            value: '',
        });
    }, [request?.values.params]);

    useEffect(() => {
        const last = request?.values.headers[request?.values.headers.length - 1];
        if (last?.name != '' || last?.value != '') request?.insertListItem('headers', {
            enabled: false,
            name: '',
            value: '',
        });
    }, [request?.values.headers]);

    return (
        <div className={left}>
            <div className={container}>
                <div className={urlSelector}>
                    <UrlSelector />
                </div>
                <div className={tabs}>
                    <Tabs tabs={requestTabs} active={tab} onChange={setTab} />
                </div>
            </div>
            {tab == 'query' && <ParamsEditor />}
            {tab == 'headers' && <HeadersEditor />}
            {tab == 'body' && <BodyEditor />}
        </div>
    )
}