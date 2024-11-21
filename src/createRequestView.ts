import * as vscode from "vscode";
import { convertCheckableFields, generateHtml } from "./util";
import path from "path";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";

// TODO: Create a provider
export default function createRequestWebview(context: vscode.ExtensionContext) {
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

                if (request.type === 'http') {
                    // Params are not handled here, because the UI should already include them in the request URL
                    const headers = convertCheckableFields(request.headers, {
                        lowerCase: true,
                    });
                    const config: AxiosRequestConfig = {
                        validateStatus: () => true,
                        url: request.url,
                        method: request.method,
                    };

                    if (request.authType === 'basic') {
                        config.auth = {
                            username: request.auth.basic.username,
                            password: request.auth.basic.password,
                        };
                    } else if (request.authType === 'bearer') {
                        headers['authorization'] = `${request.auth.bearer.prefix} ${request.auth.bearer.token}`;
                    }

                    if (request.requestBodyType === 'json') {
                        headers['content-type'] = 'application/json';
                        config.data = request.requestBody;
                    } else if (request.requestBodyType === 'urlencoded') {
                        headers['content-type'] = 'application/x-www-form-urlencoded';
                        config.data = qs.stringify(convertCheckableFields(request.requestBody, {
                            urlencodedMode: true,
                        }));
                    } else if (request.requestBodyType === 'xml') {
                        headers['content-type'] = 'application/xml';
                        config.data = request.requestBody;
                    }

                    config.headers = headers;
                    console.log(config);

                    try {
                        const res = await axios.request(config);

                        console.log(res.data);

                        const resData = {
                            type: 'success',
                            data: res.data,
                            status: res.status,
                            statusText: res.statusText,
                            headers: res.headers,
                        };

                        // TODO: Include response and timing
                        panel.webview.postMessage({ command: 'request.finished', data: resData });
                    } catch (error) {
                        let message = 'Unknown Error';
                        if (error instanceof Error) message = error.message;
                        const resData = {
                            type: 'error',
                            data: message,
                            status: -1,
                            statusText: 'ERROR',
                            headers: {},
                        };
                        panel.webview.postMessage({ command: 'request.finished', data: resData, });
                    }
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

    panel.webview.html = generateHtml(context.extensionUri, panel.webview, 'request');
}