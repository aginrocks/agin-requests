import { useRequest, useRequestController, useVsCodeApi } from "@lib/hooks"
import { container, editor, secondaryActions } from "./styles";
import { TabType } from "@lib/components/Tabs";
import { WSType } from "@lib/types";
import EditorContainer from "@lib/components/EditorContainer";
import SecondaryTabs from "@lib/components/SecondaryTabs";
import ThemedEditor from "@lib/components/ThemedEditor";
import { useRealtimeMessages } from "@lib/hooks/useRealtimeMessages";
import ThemeIcon from "@lib/components/ThemeIcon";
import { IconBooks, IconDeviceFloppy, IconEdit, IconLayoutGrid, IconPencil, IconPlus, IconSend2, IconTrash } from "@tabler/icons-react";
import Tooltip from "@lib/components/Tooltip";
import useMessagesLibrary from "@lib/hooks/useMessagesLibrary";
import useInput from "@lib/hooks/useInput";
import { useCallback, useEffect, useRef } from "react";
import MessageName from "@lib/components/MessageName";
import * as monaco from "monaco-editor";

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

export default function WSMessageEditor() {
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

    const saveInLibrary = useCallback(async () => {
        if (!msg || !request) return;
        if (msg.values.activeMessage.data.length == 0 && request.values.type == 'ws') return vscode.postMessage({ command: 'window.showErrorMessage', data: 'The body cannot be empty.' });

        const name = await input.showInputBox({
            placeHolder: 'Name this message...',
            prompt: 'This message will be saved in this request\'s Messages Library'
        });

        if (!name) return;
        const alreadyExists = request.values.messages.some(x => x.label == name);
        if (alreadyExists) return vscode.postMessage({ command: 'window.showErrorMessage', data: 'A message with this name already exists. Choose a different name.' });

        msg.setFieldValue('activeMessage.label', name);
        request.insertListItem('messages', { ...msg.values.activeMessage, label: name });
        lib.open();
    }, [msg, request]);

    return (
        <>
            <div className={container({ full: true })}>
                <SecondaryTabs
                    tabs={wsMessageTypes}
                    active={activeMessage?.type ?? ''}
                    onChange={(tab) => msg?.setFieldValue('activeMessage.type', tab as WSType)}
                    connected={true}
                    rightSection={<>
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
                                        />
                                    </div>
                                </Tooltip>
                            </>}
                            <Tooltip label="Add to Library">
                                <div>
                                    <ThemeIcon
                                        icon={IconPlus}
                                        clickable
                                        onClick={saveInLibrary}
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
                    </>}
                />
                <EditorContainer>
                    <ThemedEditor
                        height="100%"
                        className={editor}
                        defaultLanguage={activeMessage?.type}
                        path={`${activeMessage?.label}/${activeMessage?.type}`}
                        defaultValue={activeMessage?.data}
                        onChange={(value) => msg?.setFieldValue('activeMessage.data', value ?? '')}
                        onMount={(editor, monaco) => {
                            editorRef.current = editor;
                        }}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            scrollBeyondLastLine: false,
                        }}
                    />
                </EditorContainer>
            </div>
        </>
    )
}