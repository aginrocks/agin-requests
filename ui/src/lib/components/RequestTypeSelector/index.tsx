import { useEditMode, useRequest } from "@lib/hooks";
import { container, left, requestName, right, typeSelector } from "./styles";
import ActionIcon from "../ActionIcon";
import { IconFileText, IconHttpGet, IconPlayerPlay, IconPlugConnected } from "@tabler/icons-react";
import MenuTabs, { MenuTab } from "../MenuTabs";
import { useState } from "react";
import Tabs, { TabType } from "../Tabs";
import EnvSelector from "../EnvSelector";
import { EditMode } from "@lib/providers/EditModeProvider";

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

export default function RequestTypeSelector() {
    const request = useRequest();

    const [editMode, setEditMode] = useEditMode();

    return (
        <div className={container}>
            <div className={left}>
                <div className={typeSelector}>
                    <ActionIcon icon={IconPlugConnected} />
                </div>
                <div className={requestName}>New Request</div>
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