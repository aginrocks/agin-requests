import { IconCloud, IconDevicesPc, IconFolder } from '@tabler/icons-react';
import CompactSelect from '../CompactSelect';
import { selectorContainer } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { OptionProps } from '../Menu/Option';
import { useVsCodeApi } from '@lib/hooks';
import { WorkspaceFolder } from 'vscode';
import { css } from '@styled-system/css';
import { VSCodeMessage } from '@shared/types';

export default function FolderSelector() {
    const [folders, setFolders] = useState<OptionProps[]>([]);
    const [folder, setFolder] = useState<string>('0');

    const vscode = useVsCodeApi();

    useEffect(() => {
        vscode.postMessage({ command: 'folders.get' });
        vscode.postMessage({ command: 'workspace.folder.get' });

        const onMessage = (event: MessageEvent) => {
            const message: VSCodeMessage = event.data;
            if (message.command === 'folders') {
                setFolders(message.data?.map((f: WorkspaceFolder, i) => ({ label: f.name, value: i.toString() })) ?? []);
            } else if (message.command === 'workspace.folder') {
                console.log('URI', message.data.uri);
                setFolder(message.data.toString());
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    const changeFolder = useCallback((index: string) => {
        console.log('CHANGE', index);
        vscode.postMessage({ command: 'workspace.open', data: parseInt(index) });
        setFolder(index);
    }, []);

    // If there are less than 2 folders, don't show the selector
    if (folders.length < 2) return <div className={css({ height: '5px' })}></div>;

    return (
        <div className={selectorContainer}>
            <CompactSelect size="sm" value={folder} icon={folder === '0' ? (folders[0].label === 'Remote' ? IconCloud : IconDevicesPc) : IconFolder} onChange={changeFolder} options={folders} />
        </div>
    )
}