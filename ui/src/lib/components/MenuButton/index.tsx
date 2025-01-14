import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { ComponentProps, useState } from "react";
import { buttonContainer, buttonDivider, icon, mainButton, optionsButton, optionsTarget } from "./styles";
import Divider from "../Divider";
import Menu from "../Menu";
import { IconBolt, IconBrandSocketIo, IconFileText, IconHttpGet, IconPlugConnected, IconServer, IconTerminal } from "@tabler/icons-react";
import { Option } from "../Menu/Option";
import { useVsCodeApi } from "@lib/hooks";

// TODO: Correct typing
export interface MenuButtonProps extends ComponentProps<typeof VSCodeButton> {
    // label: string,
    children: React.ReactNode,
    // rightMenuActions:
}

export type RequestOptionsProps = {
    onRequestClick: (request: string) => void;
}

export function RequestOptions({ onRequestClick }: RequestOptionsProps) {
    return (
        <>
            <Option label="HTTP Request" value="http" icon={IconHttpGet} onClick={() => onRequestClick('http')} />
            <Option label="SSE Request" value="sse" icon={IconServer} onClick={() => onRequestClick('sse')} />
            <Option label="WebSocket Connection" value="ws" icon={IconPlugConnected} onClick={() => onRequestClick('ws')} />
            <Option label="Socket.IO Connection" value="socketio" icon={IconBrandSocketIo} onClick={() => onRequestClick('socketio')} />
        </>
    )
}

export default function MenuButton({ children, ...props }: MenuButtonProps) {
    const [opened, setOpened] = useState(false);

    const vscode = useVsCodeApi();

    return (
        <div className={buttonContainer}>
            <VSCodeButton className={mainButton} {...props} >
                {children}
            </VSCodeButton>
            <div className={buttonDivider}></div>
            <Menu
                opened={opened}
                target={<VSCodeButton className={optionsButton} onClick={() => setOpened(o => !o)}>
                    <i className={`codicon codicon-chevron-down ${icon}`} />
                </VSCodeButton>}
                onClose={() => setOpened(false)}
                targetClass={optionsTarget}
                position="bottomEnd"
            >
                <RequestOptions onRequestClick={(request) => {
                    vscode.postMessage({ command: 'requests.new', type: request as any });
                    setOpened(false);
                }} />
                <Divider withMargin />
                <Option label="Import from cURL" value="" icon={IconTerminal} onClick={() => {
                    vscode.postMessage({ command: 'import.curl' });
                    setOpened(false);
                }} />
                {/* <Option label="Import from Thunder Client" value="" icon={IconBolt} /> */}
                {/* <Option label="Import OpenAPI Document" value="" icon={IconFileText} /> */}
            </Menu>
        </div >
    )
}