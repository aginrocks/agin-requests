import { IconBrandSocketIo, IconCopy, IconDots, IconPencil, IconPlugConnected, IconServer, IconTrash } from "@tabler/icons-react";
import { iconStyles, methodBadge, request, requestTitle, requestTop, requestTopLeft } from "./styles"
import Menu from "../Menu";
import ActionIcon from "../ActionIcon";
import { useDisclosure } from "@mantine/hooks";
import { Option } from "../Menu/Option";
import { useWorkspace } from "@lib/hooks";
import { useRef } from "react";

export type RequestProps = {
    type: 'ws' | 'socketio' | 'http' | 'sse';
    url: string;
    label: string;
    method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'head' | 'options' | 'ws' | 'socketio';
    path: string;
    slug?: string;
}

export default function Request({ type, url, method, label, path, slug }: RequestProps) {
    const methodLabel = (type === 'http' || type === 'sse') ? method.toUpperCase() : '';

    const [menuOpened, menu] = useDisclosure(false);

    const workspace = useWorkspace();

    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={request} ref={ref} onClick={async () => {
            if (!path || !slug) return;
            await workspace.openRequest(path, slug);
        }}>
            <div className={requestTop}>
                <div className={requestTopLeft}>
                    <div>
                        <div className={methodBadge({ method: (type === 'http' || type === 'sse') ? method : type })}>
                            {type === 'socketio' && <IconBrandSocketIo size={14} />}
                            {type === 'ws' && <IconPlugConnected size={14} />}
                            {type === 'sse' && <IconServer size={12} />}
                            {methodLabel}
                        </div>
                    </div>
                    <div className={requestTitle}>{label}</div>
                </div>
                <div className={iconStyles} data-more-actions>
                    <Menu
                        target={
                            <div>
                                <ActionIcon icon={IconDots} size={14} onClick={(e) => {
                                    e.stopPropagation();
                                    menu.open();
                                }} />
                            </div>
                        }
                        opened={menuOpened}
                        onClose={menu.close}
                        onOpen={menu.open}
                        position="bottomEnd"
                        contextMenuRef={ref}
                    >
                        <Option label="Rename" value="" icon={IconPencil} onClick={async () => {
                            menu.close();
                            if (!slug) return;
                            await workspace.renameRequestPrompt(path, slug);
                        }} />
                        <Option label="Duplicate" value="" icon={IconCopy} onClick={async () => {
                            menu.close();
                            if (!slug) return;
                            await workspace.duplicateRequest(path, slug);
                        }} />
                        <Option label="Delete" value="" icon={IconTrash} optionColor="danger.foreground" onClick={async () => {
                            menu.close();
                            if (!slug) return;
                            await workspace.deleteRequestConfirm(path, slug);
                        }} />
                    </Menu>
                </div>
            </div>
        </div>
    )
}