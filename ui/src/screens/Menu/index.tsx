import MenuButton from "@lib/components/MenuButton";
import MenuContainer from "@lib/components/MenuContainer";
import { useVsCodeApi } from "@lib/hooks";
import History from "./History";
import MenuTabs, { MenuTab } from "@lib/components/MenuTabs";
import { useState } from "react";
import { IconBox, IconDeviceFloppy, IconFolder, IconFolders, IconHistory } from "@tabler/icons-react";
import Collections from "./Collections";
import FolderSelector from "@lib/components/FolderSelector";
import Welcome from "@lib/components/Welcome";

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
            {/* <div style={{ marginTop: '20px' }}>
                <Welcome
                    icon={IconDeviceFloppy}
                    title="Saving will be avaliable soon!"
                    subtitle="I'm working on it, stay tuned!"
                    size="sm"
                />
            </div> */}
        </>
    )
}