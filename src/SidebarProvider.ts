import * as vscode from "vscode";
import { generateHtml } from "./util";
import createRequestWebview from "./createRequestView";
import parseCurl from "@proxymanllc/better-curl-to-json";
import { importCurl } from "./util/importCurl";


export type FormItem = {
    name: string,
    value: string,
    file?: string,
    enabled: boolean,
};

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
                } else if (data.type == 'sse') {
                    createRequestWebview(this.context, {
                        type: 'sse',
                    });
                } else if (data.type == 'ws') {
                    createRequestWebview(this.context, {
                        type: 'ws',
                    });
                }
            } else if (data.command == 'import.curl') {
                await importCurl(this.context);
            }
        });

    }

    public revive(panel: vscode.WebviewView) {
        this._view = panel;
    }
}