import * as vscode from "vscode";
import { convertCheckableFields, generateHtml } from "./util";
import path from "path";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { EventSource } from "eventsource";
import WebSocket from "ws";
import { HTTPHandler } from "./handlers/HTTPHandler";
import { Message } from "./handlers/Handler";
import { SSEHandler } from "./handlers/SSEHandler";
import { WSHandler } from "./handlers/WSHandler";

export type ServerEvent<T> = {
    type: 'incoming' | 'outgoing' | 'connected' | 'disconnected';
    receivedAt: Date;
    event?: string;
    data: T;
};

// TODO: Create a provider
export default function createRequestWebview(context: vscode.ExtensionContext, initialData?: any) {
    const panel = vscode.window.createWebviewPanel('webview', 'New Request', vscode.ViewColumn.One, {
        enableScripts: true
    });

    const iconPath = vscode.Uri.file(path.join(context.extensionPath, 'assets', 'tab.svg'));

    panel.iconPath = iconPath;

    const httpHandler = new HTTPHandler('request', panel);
    const sseHandler = new SSEHandler('sse', panel);
    const wsHandler = new WSHandler('ws', panel);

    panel.webview.onDidReceiveMessage(
        async (message: Message) => {
            console.log('got message', message);

            if (message.command == 'initial.get') {
                console.log('initial.get received', initialData);
                panel.webview.postMessage({ command: 'initial', data: initialData });

            } else if (message.command == 'window.showInputBox') {
                const input = await vscode.window.showInputBox(message.data);
                panel.webview.postMessage({ command: 'window.showInputBox.value', data: input });

            } else if (message.command == 'window.showErrorMessage') {
                vscode.window.showErrorMessage(message.data);

            } else if (message.command == 'window.showInformationMessage') {
                vscode.window.showInformationMessage(message.data);

            } else if (message.command == 'window.confirm') {
                if (message.data instanceof Array) {
                    const [msg, ...actions] = message.data;
                    if (typeof msg === 'string' && actions.every(action => typeof action === 'string')) {
                        const result = await vscode.window.showInformationMessage(msg, ...actions);
                        console.log({ result });

                        panel.webview.postMessage({ command: 'window.confirm.value', _id: message._id, data: result });
                    }

                } else if (message.command.startsWith('request.')) {
                    await httpHandler.onMessage(message);

                } else if (message.command.startsWith('sse.')) {
                    await sseHandler.onMessage(message);

                } else if (message.command.startsWith('ws.')) {
                    await wsHandler.onMessage(message);
                }
            }
        }
    );

    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('workbench.colorTheme')) {
            panel.webview.postMessage({ command: 'themeChanged' });
        }
    });

    panel.webview.html = generateHtml(context.extensionUri, panel.webview, 'request');
}