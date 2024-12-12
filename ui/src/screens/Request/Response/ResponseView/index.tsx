import ResponseMetrics from "@lib/components/ResponseMetrics";
import Metric from "@lib/components/ResponseMetrics/Metric";
import Tabs, { TabType } from "@lib/components/Tabs";
import { useHTTPResponse } from "@lib/hooks/useHTTPResponse";
import { useState } from "react";
import { container } from "./styles";
import ResponseContent from "./ResponseContent";
import Welcome from "@lib/components/Welcome";
import { IconExclamationCircle } from "@tabler/icons-react";
import ResponseHeaders from "./ResponseHeaders";
import { formatSize, formatTime } from "@lib/util";
import { useRequest } from "@lib/hooks";
import EventResponseContent from "./EventResponseContent";

export const responseTabs: TabType[] = [
    {
        id: 'body',
        label: 'Response',
    },
    {
        id: 'headers',
        label: 'Headers',
    },
    {
        id: 'cookies',
        label: 'Cookies',
    },
    // {
    //     id: 'tests',
    //     label: 'Tests',
    // },
];

export default function ResponseView() {
    const request = useRequest();
    const type = request?.values.type;

    const [response] = useHTTPResponse();

    const [tab, setTab] = useState<string>('body');

    const statusColor = response?.type == 'error' ? 'red' : response.status < 400 ? 'green' : 'red';

    return (
        <div className={container}>
            <ResponseMetrics rightSection={<Tabs tabs={responseTabs} active={tab} onChange={setTab} />}>
                <Metric
                    label="Status:"
                    value={`${response.status == -1 ? '' : `${response.status} `}${response.statusText ?? ''}`}
                    color={statusColor}
                />
                {type != 'sse' && <>
                    <Metric
                        label="Size:"
                        value={formatSize(response.metrics.bodySize)}
                        color={statusColor}
                    />
                    <Metric
                        label="Time:"
                        value={formatTime(response.metrics.time)}
                        color={statusColor}
                    />
                </>}
            </ResponseMetrics>
            {tab == 'body' && <>
                {type == 'sse' ? <EventResponseContent /> : <ResponseContent />}
            </>}
            {tab == 'headers' && <>
                <ResponseHeaders />
            </>}
        </div>
    )
}