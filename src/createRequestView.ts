import * as vscode from "vscode";
import { TabsManager as tabs } from "./TabsManager";
import { RequestTab } from "./tabs";

export type ServerEvent<T> = {
    type: 'incoming' | 'outgoing' | 'connected' | 'disconnected';
    receivedAt: Date;
    event?: string;
    data: T;
};

// TODO: Create a provider
export default function createRequestWebview(context: vscode.ExtensionContext, initialData?: any) {
    tabs.addTab(new RequestTab(context, initialData));
}