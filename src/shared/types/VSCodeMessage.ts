import * as vscode from 'vscode';
import { RequestConfig } from './RequestConfig';
import { SocketIOMessage } from './SocketIOMessage';
import { Collection } from './Collection';

export type VSCodeMessage = {
    command: 'initial.get';
} | {
    command: 'initial';
    data: any;
} | {
    command: 'window.showInputBox';
    data: vscode.InputBoxOptions;
} | {
    command: 'window.showInputBox.value';
    data: string;
} | {
    command: 'window.showErrorMessage';
    data: string;
} | {
    command: 'window.showInformationMessage';
    data: string;
} | {
    command: 'window.confirm';
    data: [string, ...string[]];
    _id: string;
} | {
    command: 'window.confirm.value',
    data: string | undefined;
    _id: string;
} | {
    command: 'panel.setTitle',
    data: string;
} | {
    command: 'request.execute',
    config: RequestConfig;
} | {
    command: 'sse.connect',
    config: RequestConfig;
} | {
    command: 'sse.disconnect',
} | {
    command: 'ws.connect',
    config: RequestConfig;
} | {
    command: 'ws.disconnect',
} | {
    command: 'ws.send',
    data: {
        data: string;
    }
} | {
    command: 'io.connect',
    config: RequestConfig;
} | {
    command: 'io.disconnect',
} | {
    command: 'io.send',
    data: SocketIOMessage;
} | {
    command: 'folders.get',
} | {
    command: 'folders',
    data: vscode.WorkspaceFolder[];
} | {
    command: 'workspace.folder.get',
} | {
    command: 'workspace.folder',
    data: vscode.WorkspaceFolder;
} | {
    command: 'workspace.open',
    data: vscode.WorkspaceFolder;
} | {
    command: 'workspace.collections.get',
} | {
    command: 'workspace.collections',
    data: Collection[];
} | {
    command: 'requests.new',
    type: RequestConfig['type'];
} | {
    command: 'import.curl',
} | {
    command: 'workspace.collections.createEmpty',
    path: string;
}