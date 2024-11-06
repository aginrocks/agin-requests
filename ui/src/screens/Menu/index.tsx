import Divider from "@lib/components/Divider";
import { Option } from "@lib/components/Menu/Option";
import { OptionsList } from "@lib/components/Menu/OptionsList";
import MenuButton from "@lib/components/MenuButton";
import MenuContainer from "@lib/components/MenuContainer";
import { useVsCodeApi } from "@lib/hooks";
import { IconBolt, IconBrandSocketIo, IconHttpGet, IconPlugConnected, IconServer, IconTerminal, IconX } from "@tabler/icons-react";

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