import Drawer from "@lib/components/Drawer";
import { useRealtimeMessages } from "@lib/hooks/useRealtimeMessages";
import { messagesList } from "./styles";
import SavedMessage from "@lib/components/SavedMessage";
import Input from "@lib/components/Input";
import Welcome from "@lib/components/Welcome";
import { IconBooks, IconLibrary, IconMessage2 } from "@tabler/icons-react";

export type MessagesLibraryProps = {
    opened: boolean;
    onClose: () => void;
}

export default function MessagesLibrary({ opened, onClose }: MessagesLibraryProps) {
    const messagesState = useRealtimeMessages();

    const messages = messagesState?.values.messages;
    const isEmpty = messages?.length == 0;

    return (
        <Drawer
            onClose={onClose}
            opened={opened}
            title="Messages Library"
            subtitle="Messages are saved per request."
        >
            {/* <div className={messagesList}>
                <Input
                    placeholder="Search..."
                    radius="sm"
                />
                <SavedMessage
                    label="Test Message"
                    type="json"
                    data={`dfghgfhdfgghdf
hfg
hfg
sgdhghg
dfhs`}
                    args={[]}
                />
                <SavedMessage
                    label="Test Message 2"
                    type="json"
                    data={JSON.stringify({ niga: 'cock' })}
                    args={[]}
                    selected
                />
            </div> */}
            <Welcome
                size="sm"
                icon={IconMessage2}
                title="No Messages Saved"
                subtitle="When you save a message, it will appear here."
            />
        </Drawer>
    )
}