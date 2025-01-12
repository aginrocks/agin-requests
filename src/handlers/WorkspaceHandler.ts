import { WorkspaceManager as workspace } from '../WorkspaceManager';
import { Handler } from './Handler';
import { VSCodeMessage } from '@shared/types';

export class WorkspaceHandler extends Handler {
    async onMessage(message: VSCodeMessage): Promise<void> {
        if (message.command === 'workspace.folder.get') {
            const folder = workspace.folder;
            this.panel.webview.postMessage({ command: 'workspace.folder', data: folder });

        } else if (message.command === 'workspace.open') {
            await workspace.setFolder(message.data);

        }
    }
}