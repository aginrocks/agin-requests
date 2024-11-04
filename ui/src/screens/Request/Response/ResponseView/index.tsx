import ResponseMetrics from "@lib/components/ResponseMetrics";
import Metric from "@lib/components/ResponseMetrics/Metric";
import Tabs, { TabType } from "@lib/components/Tabs";
import { useRequestController } from "@lib/hooks"
import { useHTTPResponse } from "@lib/hooks/useHTTPResponse";
import { useMemo, useRef, useState } from "react";
import { container } from "./styles";
import * as monaco from 'monaco-editor';
import { mapContentType } from '@lib/util';
import { v4 } from 'uuid';
import ResponseContent from "./ResponseContent";

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
    {
        id: 'tests',
        label: 'Tests',
    },
];

export default function ResponseView() {
    const { status, cancel } = useRequestController();
    const [response] = useHTTPResponse();

    const [tab, setTab] = useState<string>('body');

    const statusColor = response.status < 400 ? 'green' : 'red';

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    const requestId = useMemo(() => {
        return v4();
    }, [response.data]);

    const model = useMemo(() => {
        console.log(response.headers['content-type'])
        return mapContentType(response.headers['content-type']?.split(';')[0]);
    }, [response.data]);

    return (
        <div className={container}>
            <ResponseMetrics rightSection={<Tabs tabs={responseTabs} active={tab} onChange={setTab} />}>
                <Metric
                    label="Status:"
                    value={`${response.status} ${response.statusText ?? ''}`}
                    color={statusColor}
                />
                <Metric
                    label="Size:"
                    value="TODO"
                    color={statusColor}
                />
                <Metric
                    label="Time:"
                    value="TODO"
                    color={statusColor}
                />
            </ResponseMetrics>
            <ResponseContent />
        </div>
    )
}