import { HTTPHandler } from '@/handlers/HTTPHandler';
import { SocketIOHandler } from '@/handlers/SocketIOHandler';
import { SSEHandler } from '@/handlers/SSEHandler';
import { WorkspaceHandler } from '@/handlers/WorkspaceHandler';
import { WSHandler } from '@/handlers/WSHandler';
import { RequestConfig, VSCodeMessage } from '@/shared/types';
import { Tab } from '@/Tab';
import { generateHtml } from '@/util';
import { WorkspaceManager as manager } from '@/WorkspaceManager';
import path from 'path';
import * as vscode from 'vscode';

export class RequestTab extends Tab {
    declare data?: RequestConfig;
    private isInitial: boolean = true;

    constructor(context: any, initialData?: RequestConfig) {
        super(context);
        this.data = initialData;

        this.panel = vscode.window.createWebviewPanel('webview', this.getPanelTitle(initialData), vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: process.env.NODE_ENV !== 'development',
        });

        const iconPath = vscode.Uri.file(path.join(context.extensionPath, 'assets/tabs', 'default.svg'));

        this.panel.iconPath = iconPath;

        const httpHandler = new HTTPHandler('request', this.panel.webview);
        const sseHandler = new SSEHandler('sse', this.panel.webview);
        const wsHandler = new WSHandler('ws', this.panel.webview);
        const ioHandler = new SocketIOHandler('io', this.panel.webview);
        const workspaceHandler = new WorkspaceHandler('workspace', this.panel.webview);

        this.panel.webview.onDidReceiveMessage(
            async (message: VSCodeMessage) => {
                console.log('got message', message);
                if (!this.panel) return;

                if (message.command == 'initial.get') {
                    if (!this.isInitial || !this.data) return;
                    this.panel.webview.postMessage({ command: 'initial', data: this.data });
                    this.isInitial = false;

                } else if (message.command == 'window.showInputBox') {
                    const input = await vscode.window.showInputBox(message.data);
                    this.panel.webview.postMessage({ command: 'window.showInputBox.value', data: input });

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

                            this.panel?.webview.postMessage({ command: 'window.confirm.value', _id: message._id, data: result });
                        }

                    }

                } else if (message.command === 'panel.setIcon') {
                    console.log('setting icon', message.data);
                    this.panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'assets/tabs', `${message.data}.svg`));

                } else if (message.command == 'panel.setTitle') {
                    this.panel.title = message.data;

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
                this.panel?.webview.postMessage({ command: 'themeChanged' });
            }
        });

        // const manager = new WorkspaceManager();
        manager.on('collections-updated', (collections) => {
            console.log('collections-updated', collections);
        });

        this.panel.webview.html = generateHtml(context.extensionUri, this.panel.webview, 'request');
    }

    private getPanelTitle(initialData?: RequestConfig): string {
        return initialData ? `${initialData?.label}${initialData?.isDraft ? ' (Draft)' : ''}` : 'New Request (Draft)';
    }
}