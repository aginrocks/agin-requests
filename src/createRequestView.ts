import * as vscode from "vscode";
import { convertCheckableFields, generateHtml } from "./util";
import path from "path";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { EventSource } from "eventsource";

type ServerEvent<T> = {
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

    let es: EventSource | undefined;
    let esMessages: ServerEvent<any>[] = [];

    function addEventsMessage(message: ServerEvent<any>) {
        esMessages.push(message);
        console.log('sending');

        panel.webview.postMessage({ command: 'sse.message', data: message });
    }

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
                        responseType: 'arraybuffer', // Get raw binary data as a buffer
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
                        config.data = qs.stringify(
                            convertCheckableFields(request.requestBody, {
                                urlencodedMode: true,
                            })
                        );
                    } else if (request.requestBodyType === 'xml') {
                        headers['content-type'] = 'application/xml';
                        config.data = request.requestBody;
                    }

                    config.headers = headers;
                    console.log(config);

                    try {
                        const startTime = performance.now();
                        const res = await axios.request(config);
                        const endTime = performance.now();

                        // Body size is the raw binary data length
                        const bodySize = res.data.byteLength;

                        // Convert response to JSON if necessary
                        let responseData: any;
                        const contentType = res.headers['content-type'];
                        if (contentType && contentType.includes('application/json')) {
                            responseData = JSON.parse(new TextDecoder().decode(res.data));
                        } else {
                            responseData = new TextDecoder().decode(res.data); // Fallback to string
                        }

                        // Calculate headers size
                        const headersSize = Object.entries(res.headers).reduce((total, [key, value]) => {
                            return total + Buffer.byteLength(`${key}: ${value}\r\n`);
                        }, 0) + 2; // Adding 2 for the final '\r\n' after headers

                        // Total size includes headers and body
                        const totalSize = headersSize + bodySize;

                        const resData = {
                            type: 'success',
                            data: responseData,
                            status: res.status,
                            statusText: res.statusText,
                            headers: res.headers,
                            metrics: {
                                bodySize,
                                headersSize,
                                totalSize,
                                time: endTime - startTime, // Time in milliseconds
                            },
                        };

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
                            metrics: {
                                bodySize: 0,
                                headersSize: 0,
                                totalSize: 0,
                                time: 0,
                            },
                        };
                        panel.webview.postMessage({ command: 'request.finished', data: resData, });
                    }
                }
            } else if (message.command == 'initial.get') {
                console.log('initial.get received', initialData);

                panel.webview.postMessage({ command: 'initial', data: initialData });
            } else if (message.command == 'sse.connect') {
                // TODO: Support named events
                const request = message.config;
                console.log('sse', request);

                const headers = convertCheckableFields(request.headers, {
                    lowerCase: true,
                });

                if (request.authType === 'basic') {
                    headers['authorization'] = `Basic ${btoa(`${request.auth.basic.username}:${request.auth.basic.password}`)}`;
                } else if (request.authType === 'bearer') {
                    headers['authorization'] = `${request.auth.bearer.prefix} ${request.auth.bearer.token}`;
                }

                if (es) {
                    es.close();
                    panel.webview.postMessage({ command: 'sse.connected', data: false });
                }
                es = new EventSource(request.url), {
                    headers,
                };
                es.addEventListener('open', () => {
                    panel.webview.postMessage({ command: 'sse.connected', data: true });
                    addEventsMessage({
                        receivedAt: new Date(),
                        type: 'connected',
                        data: 'Connected',
                    });
                });
                es.addEventListener('message', (message) => {
                    const data = message.data;
                    console.log(data);

                    addEventsMessage({
                        receivedAt: new Date(),
                        type: 'incoming',
                        data: data,
                    });
                });
                es.addEventListener('error', (err) => {
                    console.log({ err });

                    panel.webview.postMessage({ command: 'sse.connected', data: false });

                    addEventsMessage({
                        receivedAt: new Date(),
                        type: 'disconnected',
                        data: err.message || 'Connection Error',
                    });
                });
            } else if (message.command == 'sse.disconnect') {
                if (es) {
                    es.close();
                    panel.webview.postMessage({ command: 'sse.connected', data: false });
                    addEventsMessage({
                        receivedAt: new Date(),
                        type: 'disconnected',
                        data: 'Disconnected',
                    });
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