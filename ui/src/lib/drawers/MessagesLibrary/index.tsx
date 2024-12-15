import Drawer from "@lib/components/Drawer";
import { messagesList, messagesListInner } from "./styles";
import SavedMessage from "@lib/components/SavedMessage";
import Input from "@lib/components/Input";
import Welcome from "@lib/components/Welcome";
import { IconMessage2, IconSearch, IconX } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { useRequest } from "@lib/hooks";
import { useRealtimeMessages } from "@lib/hooks/useRealtimeMessages";
import { RealtimeMessage } from "@lib/providers/RealtimeMessagesProvider";
import useInput from "@lib/hooks/useInput";

export type MessagesLibraryProps = {
    opened: boolean;
    onClose: () => void;
}

export default function MessagesLibrary({ opened, onClose }: MessagesLibraryProps) {
    const request = useRequest();
    const [filter, setFilter] = useState('');

    const msg = useRealtimeMessages();
    const activeMessage = msg?.values?.activeMessage;

    const messages = request?.values.messages;
    const isEmpty = messages?.length == 0;

    const filteredMessages = useMemo(() => messages?.filter(m => filter == '' ? true : m.label?.includes(filter) || m.data.includes(filter)), [messages, filter]);

    const input = useInput();

    const setMessage = useCallback((m: RealtimeMessage) => {
        msg?.setFieldValue('activeMessage', m);
    }, [msg]);

    const deleteConfirm = useCallback(async (i: number) => {
        const selectedOption = await input.confirm({
            message: 'Are you sure you want to delete this message?',
            options: ['Delete', 'Cancel'],
        });

        if (selectedOption != 'Delete') return;
        request?.removeListItem('messages', i);
    }, [input, request]);

    return (
        <Drawer
            onClose={onClose}
            opened={opened}
            title="Messages Library"
            subtitle="Messages are saved per request."
        >
            {isEmpty ? <Welcome
                size="sm"
                icon={IconMessage2}
                title="No Messages Saved"
                subtitle="When you save a message, it will appear here."
            /> : <div className={messagesList}>
                <Input
                    placeholder="Search..."
                    radius="sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                {filteredMessages?.length == 0 && <Welcome
                    size="sm"
                    icon={IconSearch}
                    title={`No Results for "${filter}"`}
                    subtitle="Check the spelling or try a new search."
                />}
                <div className={messagesListInner}>
                    {filteredMessages?.map((m, i) => <SavedMessage {...m} selected={activeMessage?.label == m.label} onClick={() => setMessage(m)} onDelete={() => deleteConfirm(i)} />)}
                </div>
            </div>}
        </Drawer>
    )
}