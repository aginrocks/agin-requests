import React from "react";
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

export function Request() {
    return (
        <div>
            <VSCodeButton>
                Send
            </VSCodeButton>
        </div>
    )
}