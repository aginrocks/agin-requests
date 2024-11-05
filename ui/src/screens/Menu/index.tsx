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
            <OptionsList>
                <Option label="HTTP Request" value="nigger" icon={IconHttpGet} />
                <Option label="SSE Request" value="nigger" icon={IconServer} />
                <Option label="WebSocket Connection" value="nigger" icon={IconPlugConnected} />
                <Option label="Socket.IO Connection" value="nigger" icon={IconBrandSocketIo} />
                <Divider withMargin />
                <Option label="Import from cURL" value="nigger" icon={IconTerminal} />
                <Option label="Import from Thunder Client" value="nigger" icon={IconBolt} />
            </OptionsList>
        </MenuContainer>
    )
}