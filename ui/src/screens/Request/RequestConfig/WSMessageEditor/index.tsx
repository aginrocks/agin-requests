import { useRequestController } from "@lib/hooks"
import { container, editor } from "./styles";
import { TabType } from "@lib/components/Tabs";
import { WSType } from "@lib/types";
import EditorContainer from "@lib/components/EditorContainer";
import SecondaryTabs from "@lib/components/SecondaryTabs";
import ThemedEditor from "@lib/components/ThemedEditor";
import { useRealtimeMessages } from "@lib/hooks/useRealtimeMessages";
import ThemeIcon from "@lib/components/ThemeIcon";
import { IconPlus, IconSend2 } from "@tabler/icons-react";
import Tooltip from "@lib/components/Tooltip";

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

    return (
        <>
            <div className={container({ full: true })}>
                <SecondaryTabs
                    tabs={wsMessageTypes}
                    active={activeMessage?.type ?? ''}
                    onChange={(tab) => msg?.setFieldValue('activeMessage.type', tab as WSType)}
                    connected={true}
                    rightSection={<>
                        <Tooltip label="Save in Request">
                            <div>
                                <ThemeIcon
                                    icon={IconPlus}
                                    clickable
                                />
                            </div>
                        </Tooltip>
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
                        path={activeMessage?.type}
                        defaultValue={activeMessage?.data}
                        onChange={(value) => msg?.setFieldValue('activeMessage.data', value ?? '')}
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