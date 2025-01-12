import { WebSocket } from "ws";
import { convertCheckableFields } from "../util";
import { Handler } from "./Handler";
import { VSCodeMessage, WSMessage } from "@shared/types";

export class WSHandler extends Handler {
    ws: WebSocket | undefined;

    async onMessage(message: VSCodeMessage): Promise<void> {
        if (message.command == 'ws.connect') {
            const request = message.config;
            console.log('ws', request);

            const headers = convertCheckableFields(request.headers, {
                lowerCase: true,
            });

            if (request.authType === 'basic') {
                headers['authorization'] = `Basic ${btoa(`${request.auth.basic?.username ?? ''}:${request.auth.basic?.password ?? ''}`)}`;
            } else if (request.authType === 'bearer') {
                headers['authorization'] = `${request.auth.bearer?.prefix ?? ''} ${request.auth.bearer?.token ?? ''}`;
            }

            if (this.ws) {
                this.ws.close();
                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });
            }
            this.ws = new WebSocket(request.url, {
                headers,
            });
            this.ws.addEventListener('open', () => {
                console.log('OPENED');

                this.panel.webview.postMessage({ command: 'realtime.connected', data: true });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'connected',
                    data: 'Connected',
                });
            });
            this.ws.addEventListener('message', (message) => {
                const data = message.data;
                console.log(data);

                this.addMessage({
                    receivedAt: new Date(),
                    type: 'incoming',
                    data: data,
                });
            });
            this.ws.addEventListener('error', (err) => {
                console.log({ err });

                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });

                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: err.message || 'Connection Error',
                });
            });
            this.ws.addEventListener('close', () => {
                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });

                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: 'Disconnected',
                });
            });
        } else if (message.command == 'ws.disconnect') {
            this.ws?.close();
        } else if (message.command == 'ws.send') {
            this.ws?.send(message.data?.data ?? '');
            this.addMessage({
                data: message.data,
                receivedAt: new Date(),
                type: 'outgoing',
            });
        }
    }
}