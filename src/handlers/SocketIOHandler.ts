import * as vscode from "vscode";
import { io, Socket } from "socket.io-client";
import { Handler } from "./Handler";
import { convertCheckableFields } from "../util";
import { SocketIOArgument, SocketIOArgumentType, SocketIOMessage, VSCodeMessage } from "@shared/types";
import { ServerEvent } from "createRequestView";

export class SocketIOHandler extends Handler {
    socket: Socket | undefined;

    async onMessage(message: VSCodeMessage): Promise<void> {
        if (message.command == 'io.connect') {
            const request = message.config;

            const headers = convertCheckableFields(request.headers, {
                lowerCase: true,
            });

            let authObject: Object | undefined;

            if (request.authType === 'basic') {
                headers['authorization'] = `Basic ${btoa(`${request.auth.basic?.username}:${request.auth.basic?.password}`)}`;
            } else if (request.authType === 'bearer') {
                headers['authorization'] = `${request.auth.bearer?.prefix ?? ''} ${request.auth.bearer?.token ?? ''}`;
            } else if (request.authType === 'socketio') {
                try {
                    authObject = JSON.parse(request.auth.socketio ?? '{}');
                } catch (error) {
                    vscode.window.showWarningMessage('Skipping Socket.IO auth: The provided JSON object is invalid.');
                }
            }

            this.socket = io(request.url, {
                extraHeaders: headers,
                auth: authObject,
            });

            this.socket.on('connect', () => {
                this.webview.postMessage({ command: 'realtime.connected', data: true });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'connected',
                    data: 'Connected',
                });
            });

            this.socket.on('disconnect', (reason) => {
                this.webview.postMessage({ command: 'realtime.connected', data: false });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: `Disconnected: ${reason}`,
                });
            });

            this.socket.on('connect_error', (error) => {
                console.log(error);

                this.webview.postMessage({ command: 'realtime.connected', data: false });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: `Connection error: ${error}`,
                });
            });

            this.socket.onAny((event, ...args) => {
                const parsedArgs: SocketIOArgument[] = args.map((arg, i) => ({
                    data: typeof arg === 'boolean' ? arg ? 'true' : 'false' : typeof arg === 'object' ? JSON.stringify(arg) : typeof arg === 'number' ? arg.toString() : arg,
                    type: typeof arg as SocketIOArgumentType,
                    id: 'not_needed',
                }));
                this.addMessage<SocketIOMessage>({
                    receivedAt: new Date(),
                    type: 'incoming',
                    event,
                    data: {
                        event,
                        args: parsedArgs,
                    },
                });
            });
        } else if (message.command == 'io.disconnect') {
            this.socket?.disconnect();
        } else if (message.command == 'io.send') {
            console.log('send', message);

            if (!message.data?.event) return;
            const argsList = message.data?.args.map(arg => {
                if (arg.type === 'boolean') return arg.data === 'true';
                else if (arg.type === 'number') return parseFloat(arg.data);
                else if (arg.type === 'object') return JSON.parse(arg.data);
                else if (arg.type === 'string') return arg.data;
            });
            this.socket?.emit(message.data?.event, ...argsList);
            this.addMessage<SocketIOMessage>({
                data: message.data,
                receivedAt: new Date(),
                type: 'outgoing',
                event: message.data?.event,
            });
        }
    }
}