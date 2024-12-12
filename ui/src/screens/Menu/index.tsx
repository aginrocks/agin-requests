import MenuButton from "@lib/components/MenuButton";
import MenuContainer from "@lib/components/MenuContainer";
import { useVsCodeApi } from "@lib/hooks";
import History from "./History";
import MenuTabs, { MenuTab } from "@lib/components/MenuTabs";

const tabs: MenuTab[] = [
    // TODO
];

export function Menu() {
    const vscode = useVsCodeApi();

    // TODO

    return (
        <>
            <MenuContainer>
                <MenuButton onClick={() => vscode.postMessage({ command: 'requests.new', type: 'http' })}>
                    New Request
                </MenuButton>
            </MenuContainer>
            <MenuTabs

            />
            <History />
        </>
    )
}