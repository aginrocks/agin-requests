import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { ComponentProps, useState } from "react";
import { buttonContainer, buttonDivider, icon, mainButton, optionsButton, optionsTarget } from "./styles";
import Divider from "../Divider";
import Menu from "../Menu";
import { IconBolt, IconBrandSocketIo, IconHttpGet, IconPlugConnected, IconServer, IconTerminal } from "@tabler/icons-react";
import { Option } from "../Menu/Option";

// TODO: Correct typing
export interface MenuButtonProps extends ComponentProps<typeof VSCodeButton> {
    // label: string,
    children: React.ReactNode,
    // rightMenuActions:
}

export default function MenuButton({ children, ...props }: MenuButtonProps) {
    const [opened, setOpened] = useState(false);

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
                <Option label="HTTP Request" value="nigger" icon={IconHttpGet} />
                <Option label="SSE Request" value="nigger" icon={IconServer} />
                <Option label="WebSocket Connection" value="nigger" icon={IconPlugConnected} />
                <Option label="Socket.IO Connection" value="nigger" icon={IconBrandSocketIo} />
                <Divider withMargin />
                <Option label="Import from cURL" value="nigger" icon={IconTerminal} />
                <Option label="Import from Thunder Client" value="nigger" icon={IconBolt} />
            </Menu>
        </div >
    )
}