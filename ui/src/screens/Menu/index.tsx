import MenuButton from "@lib/components/MenuButton";
import MenuContainer from "@lib/components/MenuContainer";
import { useVsCodeApi } from "@lib/hooks";
import History from "./History";
import MenuTabs, { MenuTab } from "@lib/components/MenuTabs";
import { useState } from "react";
import { IconBox, IconFolders, IconHistory } from "@tabler/icons-react";

const tabs: MenuTab[] = [
    {
        id: 'history',
        icon: IconHistory,
        label: 'History',
    },
    {
        id: 'collections',
        icon: IconFolders,
        label: 'Collections',
    },
    {
        id: 'environments',
        icon: IconBox,
        label: 'environment',
    },
];

export function Menu() {
    const vscode = useVsCodeApi();

    const [tab, setTab] = useState('history');

    return (
        <>
            <MenuContainer>
                <MenuButton onClick={() => vscode.postMessage({ command: 'requests.new', type: 'http' })}>
                    New Request
                </MenuButton>
            </MenuContainer>
            <MenuTabs
                tabs={tabs}
                active={tab}
                onChange={setTab}
            />
            {tab == 'history' && <History />}
        </>
    )
}