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
    command: 'window.confirm.value';
    data: string | undefined;
    _id: string;
} | {
    command: 'panel.setTitle';
    data: string;
} | {
    command: 'request.execute';
    config: RequestConfig;
} | {
    command: 'sse.connect';
    config: RequestConfig;
} | {
    command: 'sse.disconnect';
} | {
    command: 'ws.connect';
    config: RequestConfig;
} | {
    command: 'ws.disconnect';
} | {
    command: 'ws.send';
    data: {
        data: string;
    }
} | {
    command: 'io.connect';
    config: RequestConfig;
} | {
    command: 'io.disconnect';
} | {
    command: 'io.send';
    data: SocketIOMessage;
} | {
    command: 'folders.get';
} | {
    command: 'folders';
    data: vscode.WorkspaceFolder[];
} | {
    command: 'workspace.folder.get';
} | {
    command: 'workspace.folder';
    data: vscode.WorkspaceFolder;
} | {
    command: 'workspace.open';
    data: number;
} | {
    command: 'workspace.collections.get';
} | {
    command: 'workspace.collections';
    data: Collection[];
} | {
    command: 'requests.new';
    type: RequestConfig['type'];
} | {
    command: 'import.curl';
} | {
    command: 'workspace.collections.createEmpty';
    path: string;
} | {
    command: 'workspace.collections.delete' | 'workspace.collections.deleteConfirm';
    path: string;
} | {
    command: 'workspace.requests.create';
    data: RequestConfig;
    collectionPath: string;
} | {
    command: 'request.cancel'
} | {
    command: 'panel.setIcon';
    data: RequestConfig['method'] | 'folder' | 'socketio' | 'sse' | 'ws';
} | {
    command: 'workspace.requests.delete' | 'workspace.requests.deleteConfirm';
    path: string;
    slug: string;
} | {
    command: 'workspace.collections.duplicate';
    path: string;
} | {
    command: 'workspace.collections.rename';
    path: string;
    newName: string;
} | {
    command: 'workspace.collections.renamePrompt';
    path: string;
} | {
    command: 'workspace.requests.rename';
    path: string;
    slug: string;
    newName: string;
} | {
    command: 'workspace.requests.renamePrompt';
    path: string;
    slug: string;
} | {
    command: 'workspace.requests.duplicate';
    path: string;
    slug: string;
} | {
    command: 'workspace.requests.open',
    path: string;
    slug: string;
} | {
    command: 'initial',
    data: RequestConfig;
}