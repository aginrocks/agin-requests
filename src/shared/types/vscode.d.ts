import { VSCodeMessage } from "@shared/types";
// FIXME
declare global {
    namespace vscode {
        interface Webview {
            postMessage(message: VSCodeMessage): Thenable<boolean>;
        }
    }
}

export { };