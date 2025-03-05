import { WorkspaceManager as workspace } from '../WorkspaceManager';
import { Handler } from './Handler';
import { Collection, VSCodeMessage } from '@shared/types';
import * as vscode from 'vscode';

export class WorkspaceHandler extends Handler {
    constructor(prefix: string, webview: vscode.Webview) {
        super(prefix, webview);
        workspace.on('collections-updated', (collections) => {
            this.onCollectionsChanged(collections);
        });

        // TODO: Move it to a folder selector logic
        (async () => {
            // if (workspace.isAvaliable()) {
            if (!workspace.folderIndex) {
                const configOption = vscode.workspace.getConfiguration('agin-requests').get('defaultContext') as 'device' | 'workspace';
                if (configOption === 'workspace' && workspace.getFolders().length > 1) await workspace.setFolderIndex(1);
                else await workspace.setFolderIndex(0);
            }
            // }
        })();
    }

    private onCollectionsChanged(collections: Collection[]) {
        this.webview.postMessage({ command: 'workspace.collections', data: collections });
    }

    async onMessage(message: VSCodeMessage): Promise<void> {
        if (message.command === 'workspace.folder.get') {
            const folder = workspace.folderIndex;
            this.webview.postMessage({ command: 'workspace.folder', data: folder });

        } else if (message.command === 'workspace.open') {
            await workspace.setFolderIndex(message.data);

        } else if (message.command === 'workspace.collections.get') {
            console.log('GET COLLECTIONS', workspace.collections);

            if (!workspace.collections) return;
            this.onCollectionsChanged(workspace.collections);

        } else if (message.command === 'workspace.collections.createEmpty') {
            await workspace.createEmptyCollection(message.path);

        } else if (message.command === 'workspace.collections.delete') {
            await workspace.deleteCollection(message.path);

        } else if (message.command === 'workspace.collections.deleteConfirm') {
            await workspace.deleteCollectionConfirm(message.path);

        } else if (message.command === 'workspace.requests.create') {
            await workspace.createRequest(message.collectionPath, message.data);

        } else if (message.command === 'workspace.requests.delete') {
            await workspace.deleteRequest(message.path, message.slug);

        } else if (message.command === 'workspace.requests.deleteConfirm') {
            await workspace.deleteRequestConfirm(message.path, message.slug);

        } else if (message.command === 'workspace.collections.duplicate') {
            await workspace.duplicateCollection(message.path);

        } else if (message.command === 'workspace.collections.rename') {
            await workspace.renameCollection(message.path, message.newName);

        } else if (message.command === 'workspace.collections.renamePrompt') {
            await workspace.renameCollectionPrompt(message.path);

        } else if (message.command === 'workspace.requests.rename') {
            await workspace.renameRequest(message.path, message.slug, message.newName);

        } else if (message.command === 'workspace.requests.renamePrompt') {
            await workspace.renameRequestPrompt(message.path, message.slug);

        } else if (message.command === 'workspace.requests.duplicate') {
            await workspace.duplicateRequest(message.path, message.slug);

        } else if (message.command === 'workspace.requests.open') {
            await workspace.openRequest(message.path, message.slug);

        }
    }
}