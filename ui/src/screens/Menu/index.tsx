import MenuButton from "@lib/components/MenuButton";
import MenuContainer from "@lib/components/MenuContainer";
import { useVsCodeApi } from "@lib/hooks";

export function Menu() {
    const vscode = useVsCodeApi();

    return (
        <MenuContainer>
            <MenuButton onClick={() => vscode.postMessage({ command: 'requests.new', type: 'http' })}>
                New Request
            </MenuButton>
        </MenuContainer>
    )
}