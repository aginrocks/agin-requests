import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useRequest, useRequestController } from "@lib/hooks";
import { container, inputGroup, methodSelector, sendButton } from "./styles";
import Input from "@lib/components/Input";
import Select from "../Select";
import type { Option } from "../Select";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";

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
                />
                <VSCodeButton className={sendButton} onClick={() => controller.send()}>
                    Send
                </VSCodeButton>
            </div>
        </div>
    )
}