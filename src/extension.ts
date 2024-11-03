// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import path from 'path';
import { getMonacoTheme } from './helpers';
import axios from 'axios';
import { convertCheckableFields } from './util';
import { AxiosRequestConfig } from 'axios';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "agin-requests-sidebar",
            sidebarProvider
        )
    );

    const webview = vscode.commands.registerCommand('agin-requests.new', () => {
        const panel = vscode.window.createWebviewPanel('webview', 'New Request', vscode.ViewColumn.One, {
            enableScripts: true
        });

        const iconPath = vscode.Uri.file(path.join(context.extensionPath, 'assets', 'tab.svg'));

        panel.iconPath = iconPath;

        const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'ui', 'dist', 'index.js'));

        const cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'ui', 'dist', 'index.css'));

        const codiconsUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));

        panel.webview.onDidReceiveMessage(
            async message => {
                console.log('got message', message);

                if (message.command === 'request.execute') {
                    const request = message.config;
                    // TODO: Making request

                    if (request.type == 'http') {
                        // Params are not handled here, because the UI should already include them in the request URL
                        const headers = convertCheckableFields(request.headers, true);
                        const config: AxiosRequestConfig = {
                            validateStatus: () => true,
                            url: request.url,
                            method: request.method,
                        }

                        if (request.authType == 'basic') {
                            config.auth = {
                                username: request.auth.basic.username,
                                password: request.auth.basic.password,
                            }
                        } else if (request.authType == 'bearer') {
                            headers['authorization'] = `${request.auth.bearer.prefix} ${request.auth.bearer.token}`
                        }

                        config.headers = headers;

                        const res = await axios.request(config);

                        console.log(res.data);


                        // TODO: Include response and timing
                        panel.webview.postMessage({ command: 'request.finished', });
                    }
                }

                // if (message.command === 'theme.get') {
                //   console.log('getting theme');

                //   const themeSettings = vscode.workspace.getConfiguration('workbench.colorCustomizations');
                //   // console.log({ themeSettings: themeSettings.inspect('') });

                //   const monacoTheme = getMonacoTheme();
                //   console.log({ command: 'theme', theme: monacoTheme });

                //   panel.webview.postMessage({ command: 'theme', theme: monacoTheme });
                // }
            }
        );

        const themeChangeListener = vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('workbench.colorTheme')) {
                panel.webview.postMessage({ command: 'themeChanged' });
            }
        });

        panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="${cssSrc}" />
            <link href="${codiconsUri}" rel="stylesheet" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `;
    });

    context.subscriptions.push(webview);
}

// This method is called when your extension is deactivated
export function deactivate() { }