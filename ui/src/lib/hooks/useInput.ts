import { useCallback } from "react";
import { useVsCodeApi } from "./useVsCodeApi";
import { v4 } from 'uuid';

export type InputOptions = {
    prompt?: string;
    placeHolder?: string;
    ignoreFocusOut?: boolean;
    title?: string;
    value?: string;
    valueSelection?: [number, number];
}

export type ConfirmOptions = {
    message: string;
    options: string[];
}

export default function useInput() {
    const vscode = useVsCodeApi();

    const showInputBox = useCallback((options: InputOptions) => {
        return new Promise<string>((resolve, reject) => {
            if (!vscode) return resolve('');

            vscode.postMessage({ command: 'window.showInputBox', data: options });

            const onMessage = (event: MessageEvent) => {
                const message = event.data;
                if (message.command === 'window.showInputBox.value') {
                    window.removeEventListener('message', onMessage);
                    resolve(message.data);
                }
            };

            window.addEventListener('message', onMessage);
        });
    }, [vscode]);

    const confirm = useCallback((options: ConfirmOptions) => {
        return new Promise<string>((resolve, reject) => {
            if (!vscode) return resolve('');

            const id = v4();

            vscode.postMessage({ command: 'window.confirm', data: [options.message, ...options.options], _id: id });

            const onMessage = (event: MessageEvent) => {
                const message = event.data;
                if (message.command == 'window.confirm.value' && message._id == id) {
                    window.removeEventListener('message', onMessage);

                    resolve(message.data);
                }
            };

            window.addEventListener('message', onMessage);
        });
    }, [vscode]);

    return { showInputBox, confirm };
}