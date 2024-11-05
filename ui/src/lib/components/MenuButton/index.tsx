import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { ComponentProps } from "react";
import { menuButton } from "./styles";

// TODO: Correct typing
export interface MenuButtonProps extends ComponentProps<typeof VSCodeButton> {
    // label: string,
    children: React.ReactNode,
    // rightMenuActions:
}

export default function MenuButton({ children, ...props }: MenuButtonProps) {
    return (
        <VSCodeButton className={menuButton} {...props}>
            {children}
        </VSCodeButton>
    )
}