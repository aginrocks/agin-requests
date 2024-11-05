import * as vscode from "vscode";
import { generateHtml } from "./util";
import createRequestWebview from "./createRequestView";

export class SidebarProvider implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;
    _doc?: vscode.TextDocument;

    private _extensionUri: vscode.Uri;
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this._extensionUri = context.extensionUri;
    }

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = generateHtml(this._extensionUri, webviewView.webview, 'menu');

        // Listen for messages from the Sidebar component and execute action
        webviewView.webview.onDidReceiveMessage(async (data) => {
            if (data.command == 'requests.new') {
                if (data.type == 'http') {
                    createRequestWebview(this.context);
                }
            }
        });

    }

    public revive(panel: vscode.WebviewView) {
        this._view = panel;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}