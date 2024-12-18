import { useRequest, useRequestController, useVsCodeApi } from "@lib/hooks"
import { container, secondaryActions } from "./styles";
import { TabType } from "@lib/components/Tabs";
import { useRealtimeMessages } from "@lib/hooks/useRealtimeMessages";
import ThemeIcon from "@lib/components/ThemeIcon";
import { IconDeviceFloppy, IconPlus, IconSend2 } from "@tabler/icons-react";
import Tooltip from "@lib/components/Tooltip";
import useMessagesLibrary from "@lib/hooks/useMessagesLibrary";
import useInput from "@lib/hooks/useInput";
import { useCallback, useEffect, useRef } from "react";
import MessageName from "@lib/components/MessageName";
import * as monaco from "monaco-editor";
import Input from "@lib/components/Input";

export const wsMessageTypes: TabType[] = [
    {
        id: 'json',
        label: 'JSON',
    },
    {
        id: 'text',
        label: 'Text',
    },
    // {
    //     id: 'binary',
    //     label: 'Binary',
    // },
];

export default function IOMessageEditor() {
    const msg = useRealtimeMessages();
    const activeMessage = msg?.values?.activeMessage;

    const controller = useRequestController();

    const lib = useMessagesLibrary();

    const request = useRequest();

    const input = useInput();

    const vscode = useVsCodeApi();

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        editorRef.current?.setValue(activeMessage?.data ?? '');
    }, [activeMessage?.label]);

    const saveInLibrary = useCallback(async (mode: 'create' | 'overwrite') => {
        if (!msg || !request) return;
        if (msg.values.activeMessage.data.length == 0 && request.values.type == 'ws') return vscode.postMessage({ command: 'window.showErrorMessage', data: 'The body cannot be empty.' });

        if (mode == 'create') {
            const name = await input.showInputBox({
                placeHolder: 'Name this message...',
                prompt: 'This message will be saved in this request\'s Messages Library',
                value: msg.values.activeMessage.event,
            });

            if (!name) return;
            const alreadyExists = request.values.messages.some(x => x.label == name);
            if (alreadyExists) return vscode.postMessage({ command: 'window.showErrorMessage', data: 'A message with this name already exists. Choose a different name.' });

            msg.setFieldValue('activeMessage.label', name);
            request.insertListItem('messages', { ...msg.values.activeMessage, label: name });
        } else if (mode == 'overwrite') {
            const messageIndex = request.values.messages.findIndex(m => m.label == msg.values.activeMessage.label);
            if (messageIndex == -1) return vscode.postMessage({ command: 'window.showErrorMessage', data: 'Message not found' });

            request.setFieldValue(`messages.${messageIndex}`, msg.values.activeMessage);
            msg.resetDirty();
        }

        lib.open();
    }, [msg, request]);

    return (
        <>
            <div className={container({ full: false })}>
                <Input placeholder="Event name..." rightSection={<>
                    <div className={secondaryActions}>
                        {activeMessage?.label && <>
                            <Tooltip label="Click to Rename">
                                <div>
                                    <MessageName label={activeMessage.label} isUnsaved={msg?.isDirty()} />
                                </div>
                            </Tooltip>
                            <Tooltip label="Save Changes">
                                <div>
                                    <ThemeIcon
                                        icon={IconDeviceFloppy}
                                        clickable
                                        onClick={() => saveInLibrary('overwrite')}
                                    />
                                </div>
                            </Tooltip>
                        </>}
                        <Tooltip label="Add to Library">
                            <div>
                                <ThemeIcon
                                    icon={IconPlus}
                                    clickable
                                    onClick={() => saveInLibrary('create')}
                                />
                            </div>
                        </Tooltip>
                    </div>
                    <Tooltip label="Send">
                        <div>
                            <ThemeIcon
                                icon={IconSend2}
                                iconColor="theme"
                                clickable
                                onClick={() => activeMessage ? controller.sendMessage(activeMessage) : {}}
                            />
                        </div>
                    </Tooltip>
                </>} />
            </div>
        </>
    )
}