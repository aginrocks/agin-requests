import * as vscode from "vscode";
import { ServerEvent } from "../createRequestView";
import { VSCodeMessage } from "@shared/types";

export class Handler {
    webview: vscode.Webview;
    messages: ServerEvent<any>[] = [];
    prefix: string;

    constructor(prefix: string, panel: vscode.Webview) {
        this.prefix = prefix;
        this.webview = panel;
    }

    async onMessage(message: VSCodeMessage): Promise<void> {

    }

    addMessage<T>(message: ServerEvent<T>) {
        this.messages.push(message);
        console.log('sending');

        this.webview.postMessage({ command: 'realtime.message', data: message });
    }
}