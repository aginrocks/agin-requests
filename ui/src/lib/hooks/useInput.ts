import { useCallback } from "react";
import { useVsCodeApi } from "./useVsCodeApi";

export type InputOptions = {
    prompt?: string;
    placeHolder?: string;
    ignoreFocusOut?: boolean;
    title?: string;
    value?: string;
    valueSelection?: [number, number];
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

    return { showInputBox };
}