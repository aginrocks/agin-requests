import React, { useEffect, useState } from "react";
import { useRequest } from "@lib/hooks/useRequest";
import UrlSelector from "@lib/components/UrlSelector";
import Tabs, { TabType } from "@lib/components/Tabs";
import { container, tabs, urlSelector } from "./styles";
import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";

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
        <>
            <div className={container}>
                <div className={urlSelector}>
                    <UrlSelector />
                </div>
                <div className={tabs}>
                    <Tabs tabs={requestTabs} active={tab} onChange={setTab} />
                </div>
            </div>
            {tab == 'query' && <ParamsGroup>
                {request?.values.params.map((p, i) => <Param
                    key={i}
                    name={p.name}
                    value={p.value}
                    enabled={p.enabled}
                    onNameChange={(e) => request.setFieldValue(`params.${i}.name`, e.target.value)}
                    onValueChange={(e) => request.setFieldValue(`params.${i}.value`, e.target.value)}
                    onEnabledChange={(e) => request.setFieldValue(`params.${i}.enabled`, e.target.checked)}
                    onRemove={() => request.removeListItem('params', i)}
                />)}
            </ParamsGroup>}
            {tab == 'headers' && <ParamsGroup>
                {request?.values.headers.map((p, i) => <Param
                    key={i}
                    name={p.name}
                    value={p.value}
                    enabled={p.enabled}
                    onNameChange={(e) => request.setFieldValue(`headers.${i}.name`, e.target.value)}
                    onValueChange={(e) => request.setFieldValue(`headers.${i}.value`, e.target.value)}
                    onEnabledChange={(e) => request.setFieldValue(`headers.${i}.enabled`, e.target.checked)}
                    onRemove={() => request.removeListItem('headers', i)}
                />)}
            </ParamsGroup>}
        </>
    )
}