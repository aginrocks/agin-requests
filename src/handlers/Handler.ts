import * as vscode from "vscode";
import { ServerEvent } from "../createRequestView";

export type Message = {
    command: string;
    config?: any;
    data?: any;
    _id?: string;
}

export class Handler {
    panel: vscode.WebviewPanel;
    messages: ServerEvent<any>[] = [];
    prefix: string;

    constructor(prefix: string, panel: vscode.WebviewPanel) {
        this.prefix = prefix;
        this.panel = panel;
    }

    async onMessage(message: Message): Promise<void> {

    }

    addMessage<T>(message: ServerEvent<T>) {
        this.messages.push(message);
        console.log('sending');

        this.panel.webview.postMessage({ command: 'realtime.message', data: message });
    }
}