import { useEditMode, useRequest, useRequestSaver } from "@lib/hooks";
import { container, left, requestName, requestNameContainer, right, typeSelector } from "./styles";
import ActionIcon from "../ActionIcon";
import { Icon, IconBrandSocketIo, IconFileText, IconHttpGet, IconPlayerPlay, IconPlugConnected, IconServer } from "@tabler/icons-react";
import MenuTabs, { MenuTab } from "../MenuTabs";
import EnvSelector from "../EnvSelector";
import { EditMode } from "@lib/providers/EditModeProvider";
import { RequestType } from "@shared/types";
import MessageName from "../MessageName";
import Tooltip from "../Tooltip";

const tabs: MenuTab[] = [
    {
        id: 'design',
        icon: IconFileText,
        label: 'Design'
    },
    {
        id: 'test',
        icon: IconPlayerPlay,
        label: 'Test',
    },
];

const typesToIcons: Record<RequestType, Icon> = {
    ws: IconPlugConnected,
    http: IconHttpGet,
    socketio: IconBrandSocketIo,
    sse: IconServer,
}

export default function RequestTypeSelector() {
    const request = useRequest();
    const saver = useRequestSaver();

    const [editMode, setEditMode] = useEditMode();

    return (
        <div className={container}>
            <div className={left}>
                <div className={typeSelector}>
                    <ActionIcon icon={typesToIcons[request?.values.type ?? 'http']} />
                </div>
                <Tooltip label="Click to Rename">
                    <div className={requestNameContainer} onClick={async () => await saver.renameRequest()}>
                        <div className={requestName({ isDraft: request?.values.isDraft })}>{request?.values.label || 'New Request'}</div>
                        <MessageName label="Draft" withMargin={false} size="xs" clickable={false} />
                    </div>
                </Tooltip>
            </div>
            <div className={right}>
                <EnvSelector />
                <MenuTabs
                    tabs={tabs}
                    active={editMode}
                    onChange={(id) => setEditMode(id as EditMode)}
                    variant="compact"
                    show="label"
                // withAnimation={false}
                />
            </div>
        </div>
    )
}