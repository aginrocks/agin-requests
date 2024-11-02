import React, { useEffect, useState } from "react";
import Columns from "@lib/components/Columns";
import { useRequest } from "@lib/hooks/useRequest";
import UrlSelector from "@lib/components/UrlSelector";
import Tabs, { TabType } from "@lib/components/Tabs";
import { container, tabs, urlSelector } from "./styles";
import Param from "@lib/components/Param";
import ParamsGroup from "@lib/components/ParamsGroup";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

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

    useEffect(() => {
        const last = request?.values.params[request?.values.params.length - 1];
        if (last?.name != '' || last?.value != '') request?.insertListItem('params', {
            enabled: false,
            name: '',
            value: '',
        });
    }, [request?.values.params]);

    return (
        <>
            <div className={container}>
                <div className={urlSelector}>
                    <UrlSelector />
                </div>
                <div className={tabs}>
                    <Tabs tabs={requestTabs} active={requestTab} onChange={setRequestTab} />
                </div>
            </div>
            <ParamsGroup>
                {request?.values.params.map((p, i) => <Param
                    name={p.name}
                    value={p.value}
                    enabled={p.enabled}
                    onNameChange={(e) => request.setFieldValue(`params.${i}.name`, e.target.value)}
                    onValueChange={(e) => request.setFieldValue(`params.${i}.value`, e.target.value)}
                    onEnabledChange={(e) => request.setFieldValue(`params.${i}.enabled`, e.target.checked)}
                />)}
            </ParamsGroup>
        </>
    )
}