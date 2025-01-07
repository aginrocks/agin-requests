import { EventSource } from "eventsource";
import { Handler, Message } from "./Handler";
import { convertCheckableFields } from "../util";

export class SSEHandler extends Handler {
    es: EventSource | undefined;

    async onMessage(message: Message<string>): Promise<void> {
        if (message.command == 'sse.connect') {
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

            if (this.es) {
                this.es.close();
                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });
            }
            this.es = new EventSource(request.url, {
                // TODO: Add headers
                // headers,
            });
            this.es.addEventListener('open', () => {
                this.panel.webview.postMessage({ command: 'realtime.connected', data: true });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'connected',
                    data: 'Connected',
                });
            });
            this.es.addEventListener('message', (message) => {
                const data = message.data;
                console.log(data);

                this.addMessage({
                    receivedAt: new Date(),
                    type: 'incoming',
                    data: data,
                });
            });
            this.es.addEventListener('error', (err) => {
                console.log({ err });

                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });

                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: err.message || 'Connection Error',
                });
            });
        } else if (message.command == 'sse.disconnect') {
            if (this.es) {
                this.es.close();
                this.panel.webview.postMessage({ command: 'realtime.connected', data: false });
                this.addMessage({
                    receivedAt: new Date(),
                    type: 'disconnected',
                    data: 'Disconnected',
                });
            }
        }
    }
}