import * as vscode from "vscode";
import { io, Socket } from "socket.io-client";
import { Handler, Message } from "./Handler";
import { convertCheckableFields } from "../util";

export class SocketIOHandler extends Handler {
    socket: Socket | undefined;

    async onMessage(message: Message): Promise<void> {
        if (message.command == 'io.connect') {
            const request = message.config;

            const headers = convertCheckableFields(request.headers, {
                lowerCase: true,
            });

            let authObject: Object | undefined;

            if (request.authType === 'basic') {
                headers['authorization'] = `Basic ${btoa(`${request.auth.basic.username}:${request.auth.basic.password}`)}`;
            } else if (request.authType === 'bearer') {
                headers['authorization'] = `${request.auth.bearer.prefix} ${request.auth.bearer.token}`;
            } else if (request.authType === 'socketio') {
                try {
                    authObject = JSON.parse(request.auth.socketio);
                } catch (error) {
                    vscode.window.showWarningMessage('Skipping Socket.IO auth: The provided JSON object is invalid.');
                }
            }

            this.socket = io(request.url, {
                extraHeaders: headers,
                auth: authObject,
            });

            this.socket.on('connect', () => {
                this.panel.webview.postMessage({ command: 'realtime.connected', data: true });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'connected',
                    data: 'Connected',
                });
            });

            this.socket.on('disconnect', (reason) => {
                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: `Disconnected: ${reason}`,
                });
            });

            this.socket.on('connect_error', (error) => {
                console.log(error);

                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: `Connection error: ${error}`,
                });
            });

            this.socket.onAny((event, ...args) => {
                // TODO: Add receiving events
            });
        } else if (message.command == 'io.disconnect') {
            this.socket?.disconnect();
        }
        // TODO: Add sending events
    }
}