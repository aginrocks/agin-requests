import { useEffect, useMemo, useState } from "react";
import { useRequest } from "@lib/hooks/useRequest";
import UrlSelector from "@lib/components/UrlSelector";
import Tabs, { TabType } from "@lib/components/Tabs";
import { container, left, tabs, urlSelector } from "./styles";
import ParamsEditor from "./ParamsEditor";
import HeadersEditor from "./HeadersEditor";
import BodyEditor from "./BodyEditor";
import AuthEditor from "./AuthEditor";
import { RequestBodyType } from "@shared/types";
import WSMessageEditor from "./WSMessageEditor";
import Tooltip from "@lib/components/Tooltip";
import { IconBooks } from "@tabler/icons-react";
import ActionIcon from "@lib/components/ActionIcon";
import useMessagesLibrary from "@lib/hooks/useMessagesLibrary";
import useSynced from "@lib/hooks/useSynced";
import IOMessageEditor from "./IOMessageEditor";
import RequestTypeSelector from "@lib/components/RequestTypeSelector";
import { useHotkeys } from "@mantine/hooks";
import { useRequestController } from "@lib/hooks";

export function RequestConfig() {
    const request = useRequest();

    const lib = useMessagesLibrary();

    const controller = useRequestController();

    const requestTabs = useMemo<TabType[]>(() => [
        {
            id: 'query',
            label: 'Query',
        },
        ...(request?.values.type == 'ws' || request?.values.type == 'socketio' ? [
            {
                id: 'message',
                label: 'Message',
            },
        ] : []),
        {
            id: 'headers',
            label: 'Headers',
        },
        {
            id: 'auth',
            label: 'Authorization',
        },
        ...(request?.values.type != 'sse' && request?.values.type != 'ws' && request?.values.type != 'socketio' ? [
            {
                id: 'body',
                label: 'Body',
            },
        ] : []),
        {
            id: 'settings',
            label: 'Settings',
        },
    ], [request?.values.type]);

    const [tab, setTab] = useState<string>('query');

    useSynced('configTab', tab, setTab);

    // TODO: Optimize last item generation
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

    useEffect(() => {
        // Convert between String and array of FormItems when switching between text editors (JSON, XML, Text) and graphical editors (URL-encoded, Form Data)
        if (!(request?.values.requestBody instanceof Object)) {
            if (['formdata', 'urlencoded'].includes(request?.values.requestBodyType as RequestBodyType)) {
                request?.setFieldValue('requestBody', []);
            }
            return;
        } else {
            if (['json', 'xml', 'text'].includes(request?.values.requestBodyType as RequestBodyType)) {
                request?.setFieldValue('requestBody', '');
                return;
            }
        }
        const last = request?.values.requestBody[request?.values.requestBody.length - 1];
        if (last?.name != '' || last?.value != '') request?.insertListItem('requestBody', {
            enabled: false,
            name: '',
            value: '',
            file: null,
        });
    }, [request?.values.requestBody, request?.values.requestBodyType]);

    useHotkeys([
        ['mod+Enter', () => controller.send()],
    ]);

    return (
        <div className={left}>
            <div className={container}>
                <RequestTypeSelector />
                <div className={urlSelector}>
                    <UrlSelector />
                </div>
                <div className={tabs}>
                    <Tabs tabs={requestTabs} active={tab} onChange={setTab} />
                    {(request?.values.type == 'ws' || request?.values.type == 'socketio') && <Tooltip label="Messages Library">
                        <div>
                            <ActionIcon
                                icon={IconBooks}
                                onClick={lib.toggle}
                            />
                        </div>
                    </Tooltip>}
                </div>
            </div>
            {tab == 'query' && <ParamsEditor />}
            {tab == 'headers' && <HeadersEditor />}
            {tab == 'body' && <BodyEditor />}
            {tab == 'auth' && <AuthEditor />}
            {tab == 'message' && (request?.values.type == 'socketio' ? <IOMessageEditor /> : <WSMessageEditor />)}
        </div>
    )
}