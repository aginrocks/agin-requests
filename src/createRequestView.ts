import * as vscode from "vscode";
import { generateHtml } from "./util";
import path from "path";
import { HTTPHandler } from "./handlers/HTTPHandler";
import { SSEHandler } from "./handlers/SSEHandler";
import { WSHandler } from "./handlers/WSHandler";
import { SocketIOHandler } from "./handlers/SocketIOHandler";
import { WorkspaceManager as manager } from "./WorkspaceManager";
import { randomUUID } from "crypto";
import { VSCodeMessage } from "@shared/types";
import { WorkspaceHandler } from "./handlers/WorkspaceHandler";

export type ServerEvent<T> = {
    type: 'incoming' | 'outgoing' | 'connected' | 'disconnected';
    receivedAt: Date;
    event?: string;
    data: T;
};

// TODO: Create a provider
export default function createRequestWebview(context: vscode.ExtensionContext, initialData?: any) {
    console.log('createRequestWebview', process.env.NODE_ENV);
    const panel = vscode.window.createWebviewPanel('webview', 'New Request (Draft)', vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: process.env.NODE_ENV === 'development' ? false : true,
    });

    const iconPath = vscode.Uri.file(path.join(context.extensionPath, 'assets/tabs', 'ws1.svg'));

    panel.iconPath = iconPath;

    let initial = { ...initialData };

    const httpHandler = new HTTPHandler('request', panel.webview);
    const sseHandler = new SSEHandler('sse', panel.webview);
    const wsHandler = new WSHandler('ws', panel.webview);
    const ioHandler = new SocketIOHandler('io', panel.webview);
    const workspaceHandler = new WorkspaceHandler('workspace', panel.webview);

    panel.webview.onDidReceiveMessage(
        async (message: VSCodeMessage) => {
            console.log('got message', message);

            if (message.command == 'initial.get') {
                if (!initial) return;
                console.log('initial.get received', initial);
                panel.webview.postMessage({ command: 'initial', data: initial });
                initial = null;

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

                }

            } else if (message.command == 'panel.setTitle') {
                panel.title = message.data;

            } else if (message.command.startsWith('request.')) {
                await httpHandler.onMessage(message);

            } else if (message.command.startsWith('sse.')) {
                await sseHandler.onMessage(message);

            } else if (message.command.startsWith('ws.')) {
                await wsHandler.onMessage(message);

            } else if (message.command.startsWith('io.')) {
                await ioHandler.onMessage(message);

            } else if (message.command.startsWith('workspace.')) {
                await workspaceHandler.onMessage(message);
            }
        }
    );

    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('workbench.colorTheme')) {
            panel.webview.postMessage({ command: 'themeChanged' });
        }
    });

    // const manager = new WorkspaceManager();
    manager.on('collections-updated', (collections) => {
        console.log('collections-updated', collections);
    });
    // (async () => {
    //     if (vscode.workspace.workspaceFolders) {
    //         await manager.setFolder(vscode.workspace.workspaceFolders[0]);

    //         const col = await manager.createCollection('', {
    //             authType: 'none',
    //             headers: [],
    //             label: 'Test',
    //             type: 'collection',
    //         });

    //         await manager.createRequest(col?.slug ?? '', {
    //             authType: 'none',
    //             headers: [],
    //             label: 'Test Request',
    //             method: 'get',
    //             url: 'https://jsonplaceholder.typicode.com/todos/1',
    //             auth: {

    //             },
    //             isDraft: false,
    //             params: [],
    //             messages: [],
    //             requestBodyType: 'none',
    //             type: 'http',
    //             id: randomUUID(),
    //         });
    //     }
    // })();

    panel.webview.html = generateHtml(context.extensionUri, panel.webview, 'request');
}