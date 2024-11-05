import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { ComponentProps } from "react";
import { buttonContainer, buttonDivider, icon, mainButton, optionsButton } from "./styles";
import Divider from "../Divider";

// TODO: Correct typing
export interface MenuButtonProps extends ComponentProps<typeof VSCodeButton> {
    // label: string,
    children: React.ReactNode,
    // rightMenuActions:
}

export default function MenuButton({ children, ...props }: MenuButtonProps) {
    return (
        <div className={buttonContainer}>
            <VSCodeButton className={mainButton} {...props} >
                {children}
            </VSCodeButton>
            <div className={buttonDivider}></div>
            <VSCodeButton className={optionsButton}>
                <i className={`codicon codicon-chevron-down ${icon}`} />
            </VSCodeButton>
        </div>
    )
}