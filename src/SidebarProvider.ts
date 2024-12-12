import * as vscode from "vscode";
import { generateHtml } from "./util";
import createRequestWebview from "./createRequestView";
import parseCurl from "@proxymanllc/better-curl-to-json";
import qs from "qs";

function getRequestBodyType(contentType: string) {
    // TODO: Add binary
    if (contentType == 'application/json') return 'json';
    if (contentType == 'application/xml') return 'xml';
    if (contentType == 'application/x-www-form-urlencoded') return 'urlencoded';
    if (contentType == 'multipart/form-data') return 'formdata';
    return 'text';
}

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
                }
            } else if (data.command == 'import.curl') {
                const userInput = await vscode.window.showInputBox({
                    prompt: 'Paste cURL command',
                    placeHolder: 'curl https://example.com',
                    validateInput: (value) => {
                        if (!value || value.trim() === '') {
                            return 'Command cannot be empty';
                        }
                        return null;
                    },
                });

                const request = parseCurl(userInput ?? '');

                const bodyType = getRequestBodyType(request.header?.['content-type'] ?? request.header?.['Content-Type'] ?? '');

                let parsedData: string | FormItem[] = '';
                if (['formdata', 'urlencoded'].includes(bodyType)) {
                    const parsed = qs.parse(request.data);
                    parsedData = Object.keys(parsed).map((key) => ({ name: key ?? '', value: parsed[key] as string ?? '', enabled: true }));
                    // TODO: Complete
                } else {
                    parsedData = request.data;
                }

                const requestConfig = {
                    type: 'http',
                    url: request.url,
                    method: request.method,
                    headers: request.header ? Object.keys(request.header).map((key) => ({ name: key, value: request.header?.[key], enabled: true })) : [],
                    requestBodyType: bodyType,
                    requestBody: parsedData,
                }
                console.log(requestConfig);

                createRequestWebview(this.context, requestConfig);

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