import { useRequest } from "@lib/hooks";
import { container, left, requestName, right, typeSelector } from "./styles";
import ActionIcon from "../ActionIcon";
import { IconFileText, IconHttpGet, IconPlayerPlay, IconPlugConnected } from "@tabler/icons-react";
import MenuTabs, { MenuTab } from "../MenuTabs";
import { useState } from "react";
import Tabs, { TabType } from "../Tabs";

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

    const [tab, setTab] = useState('test');

    return (
        <div className={container}>
            <div className={left}>
                <div className={typeSelector}>
                    <ActionIcon icon={IconPlugConnected} />
                </div>
                <div className={requestName}>New Request</div>
            </div>
            <div className={right}>
                <MenuTabs
                    tabs={tabs}
                    active={tab}
                    onChange={setTab}
                    variant="compact"
                    show="label"
                // withAnimation={false}
                />
            </div>
        </div>
    )
}