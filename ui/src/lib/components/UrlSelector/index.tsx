import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useRequest, useRequestController } from "@lib/hooks";
import { container, inputGroup, methodSelector, sendButton } from "./styles";
import Input from "@lib/components/Input";
import Select from "../Select";
import type { Option } from "../Select";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { useCallback } from "react";
import { parseParams } from "@lib/util";
import { Param } from "@lib/types";

export const methods: Option[] = [
    {
        label: 'GET',
        value: 'get',
    },
    {
        label: 'POST',
        value: 'post',
    },
    {
        label: 'PATCH',
        value: 'patch',
    },
    {
        label: 'PUT',
        value: 'put',
    },
    {
        label: 'DELETE',
        value: 'delete',
    },
    {
        label: 'HEAD',
        value: 'head',
    },
    {
        label: 'OPTIONS',
        value: 'options',
    },
]

export default function UrlSelector() {
    const request = useRequest();
    const controller = useRequestController();
    const vscode = useVsCodeApi();

    const onUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        request?.setFieldValue('url', e.target.value);

        const rawParams = parseParams(e.target.value);
        const params = rawParams.map(p => ({ ...p, enabled: true }));

        request?.setFieldValue('params', params);
        // TODO: Add support for disabling params
    }, [request]);

    return (
        <div className={container}>
            <div className={inputGroup}>
                <div className={methodSelector}>
                    <Select
                        options={methods}
                        withRightRadius={false}
                        {...request?.getInputProps('method')}
                    />
                </div>
                <Input
                    placeholder="Enter Url..."
                    withRightBorder={false}
                    withLeftRadius={false}
                    withRightRadius={false}
                    {...request?.getInputProps('url')}
                    onChange={onUrlChange}
                />
                <VSCodeButton className={sendButton} onClick={() => controller.send()}>
                    Send
                </VSCodeButton>
            </div>
        </div>
    )
}