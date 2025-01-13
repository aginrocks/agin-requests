import { WorkspaceManager as workspace } from '../WorkspaceManager';
import { Handler } from './Handler';
import { Collection, VSCodeMessage } from '@shared/types';
import * as vscode from 'vscode';

export class WorkspaceHandler extends Handler {
    constructor(prefix: string, panel: vscode.WebviewPanel) {
        super(prefix, panel);
        workspace.on('collections-updated', (collections) => {
            this.onCollectionsChanged(collections);
        });

        // TODO: Move it to a folder selector logic
        (async () => {
            if (workspace.isAvaliable() && vscode.workspace.workspaceFolders) {
                await workspace.setFolder(vscode.workspace.workspaceFolders[0]);
            }
        })();
    }

    private onCollectionsChanged(collections: Collection[]) {
        this.panel.webview.postMessage({ command: 'workspace.collections', data: collections });
    }

    async onMessage(message: VSCodeMessage): Promise<void> {
        if (message.command === 'workspace.folder.get') {
            const folder = workspace.folder;
            this.panel.webview.postMessage({ command: 'workspace.folder', data: folder });

        } else if (message.command === 'workspace.open') {
            await workspace.setFolder(message.data);

        } else if (message.command === 'workspace.collections.get') {
            console.log('GET COLLECTIONS', workspace.collections);

            if (!workspace.collections) return;
            this.onCollectionsChanged(workspace.collections);

        }
    }
}