import { VSCodeButton, VSCodeDropdown, VSCodeOption, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { useRequest } from "@lib/components/hooks";
import { container, input, inputGroup, methodSelector, sendButton } from "./styles";
import Input from "@lib/components/Input";
import Divider from "../Divider";
import Select from "../Select";
import type { Option } from "../Select";

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
                />
                <VSCodeButton className={sendButton}>
                    Send
                </VSCodeButton>
            </div>
        </div>
    )
}