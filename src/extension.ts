// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import createRequestWebview from './createRequestView';
import { importCurl } from './util/importCurl';
import { WorkspaceManager as workspace } from './WorkspaceManager';
import { API, GitExtension } from '@shared/types/git';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "agin-requests-sidebar",
            sidebarProvider,
            {
                webviewOptions: {
                    retainContextWhenHidden: process.env.NODE_ENV === 'development' ? false : true,
                }
            }
        )
    );

    const webview = vscode.commands.registerCommand('agin-requests.new', () => {
        createRequestWebview(context);
    });
    context.subscriptions.push(webview);

    const sse = vscode.commands.registerCommand('agin-requests.newSSE', () => {
        createRequestWebview(context, {
            type: 'sse',
        });
    });
    context.subscriptions.push(sse);

    const websocket = vscode.commands.registerCommand('agin-requests.newWebSocket', () => {
        createRequestWebview(context, {
            type: 'ws',
        });
    });
    context.subscriptions.push(websocket);

    const socketio = vscode.commands.registerCommand('agin-requests.newSocketIO', () => {
        createRequestWebview(context, {
            type: 'socketio',
        });
    });
    context.subscriptions.push(socketio);

    const importCurlCmd = vscode.commands.registerCommand('agin-requests.importCurl', async () => {
        await importCurl(context);
    });
    context.subscriptions.push(importCurlCmd);

    const reloadDb = vscode.commands.registerCommand('agin-requests.reloadDatabase', async () => {
        await workspace.loadManifest();
        await workspace.loadCollections();
    });
    context.subscriptions.push(reloadDb);

    // (async () => {
    //     const gitExt = vscode.extensions.getExtension<GitExtension>('vscode.git');
    //     const git = await gitExt?.exports.getAPI(1);
    //     git?.repositories[0].state.workingTreeChanges[0].status
    // })();
}

// This method is called when your extension is deactivated
export function deactivate() { }