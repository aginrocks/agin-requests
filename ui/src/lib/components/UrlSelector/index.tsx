import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useEditMode, useRequest, useRequestController } from "@lib/hooks";
import { container, inputGroup, methodSelector, sendButton } from "./styles";
import Input from "@lib/components/Input";
import Select from "../Select";
import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { useCallback } from "react";
import { parseParams } from "@lib/util";
import { useEventResponse } from "@lib/hooks/useEventResponse";
import { OptionProps } from "../Menu/Option";
import { getHotkeyHandler } from "@mantine/hooks";

export const methods: OptionProps[] = [
    {
        label: 'GET',
        value: 'get',
        optionColor: 'methods.get.foreground',
    },
    {
        label: 'POST',
        value: 'post',
        optionColor: 'methods.post.foreground',
    },
    {
        label: 'PATCH',
        value: 'patch',
        optionColor: 'methods.patch.foreground',
    },
    {
        label: 'PUT',
        value: 'put',
        optionColor: 'methods.put.foreground',
    },
    {
        label: 'DELETE',
        value: 'delete',
        optionColor: 'methods.delete.foreground',
    },
    {
        label: 'HEAD',
        value: 'head',
        optionColor: 'methods.head.foreground',
    },
    {
        label: 'OPTIONS',
        value: 'options',
        optionColor: 'methods.options.foreground',
    },
]

export default function UrlSelector() {
    const request = useRequest();
    const controller = useRequestController();
    const eventResponse = useEventResponse();
    const vscode = useVsCodeApi();

    const onUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        request?.setFieldValue('url', e.target.value);

        const params = parseParams(e.target.value, request?.values.params);
        console.log({ params });

        request?.setFieldValue('params', params);
        // TODO: Add support for disabling params
    }, [request, request?.values.params]);

    const isRealtime = request?.values.type == 'sse' || request?.values.type == 'ws' || request?.values.type == 'socketio';

    const [editMode] = useEditMode();

    return (
        <div className={container}>
            <div className={inputGroup}>
                {request?.values.type != 'ws' && request?.values.type != 'socketio' && <div className={methodSelector}>
                    {/* 
                    TODO: Remove ts-ignore
                    // @ts-ignore */}
                    <Select
                        options={methods}
                        withRightRadius={false}
                        {...request?.getInputProps('method')}
                    />
                </div>}
                <Input
                    placeholder="Enter Url..."
                    withRightBorder={editMode != 'test'}
                    withLeftRadius={!(request?.values.type != 'ws' && request?.values.type != 'socketio')}
                    withRightRadius={editMode != 'test'}
                    {...request?.getInputProps('url')}
                    onChange={onUrlChange}
                    onKeyDown={getHotkeyHandler([
                        ['Enter', () => controller.send()],
                    ])}
                />
                {editMode == 'test' && <VSCodeButton className={sendButton} onClick={() => (isRealtime && eventResponse.connected) ? controller.cancel() : controller.send()}>
                    {isRealtime ? eventResponse.connected ? 'Disconnect' : 'Connect' : 'Send'}
                </VSCodeButton>}
            </div>
        </div>
    )
}