import * as vscode from "vscode";
import { ServerEvent } from "../createRequestView";
import { VSCodeMessage } from "@shared/types";

export class Handler {
    panel: vscode.WebviewPanel;
    messages: ServerEvent<any>[] = [];
    prefix: string;

    constructor(prefix: string, panel: vscode.WebviewPanel) {
        this.prefix = prefix;
        this.panel = panel;
    }

    async onMessage(message: VSCodeMessage): Promise<void> {

    }

    addMessage<T>(message: ServerEvent<T>) {
        this.messages.push(message);
        console.log('sending');

        this.panel.webview.postMessage({ command: 'realtime.message', data: message });
    }
}