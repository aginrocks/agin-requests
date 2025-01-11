import MenuButton from "@lib/components/MenuButton";
import MenuContainer from "@lib/components/MenuContainer";
import { useVsCodeApi } from "@lib/hooks";
import History from "./History";
import MenuTabs, { MenuTab } from "@lib/components/MenuTabs";
import { useState } from "react";
import { IconBox, IconFolder, IconFolders, IconHistory } from "@tabler/icons-react";
import Collections from "./Collections";
import FolderSelector from "@lib/components/FolderSelector";

const tabs: MenuTab[] = [
    {
        id: 'collections',
        icon: IconFolders,
        label: 'Collections',
    },
    {
        id: 'environments',
        icon: IconBox,
        label: 'Environments',
    },
    {
        id: 'history',
        icon: IconHistory,
        label: 'History',
    },
];

export function Menu() {
    const vscode = useVsCodeApi();

    const [tab, setTab] = useState('collections');

    return (
        <>
            <MenuContainer>
                <FolderSelector />
                <MenuButton onClick={() => vscode.postMessage({ command: 'requests.new', type: 'http' })}>
                    New Request
                </MenuButton>
            </MenuContainer>
            <MenuTabs
                tabs={tabs}
                active={tab}
                onChange={setTab}
            />
            {tab == 'collections' && <Collections />}
            {tab == 'history' && <History />}
        </>
    )
}