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
            >
                <Option label="HTTP Request" value="" icon={IconHttpGet} onClick={() => {
                    vscode.postMessage({ command: 'requests.new', type: 'http' });
                    setOpened(false);
                }} />
                <Option label="SSE Request" value="" icon={IconServer} onClick={() => {
                    vscode.postMessage({ command: 'requests.new', type: 'sse' });
                    setOpened(false);
                }} />
                <Option label="WebSocket Connection" value="" icon={IconPlugConnected} onClick={() => {
                    vscode.postMessage({ command: 'requests.new', type: 'ws' });
                    setOpened(false);
                }} />
                <Option label="Socket.IO Connection" value="" icon={IconBrandSocketIo} onClick={() => {
                    vscode.postMessage({ command: 'requests.new', type: 'socketio' });
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