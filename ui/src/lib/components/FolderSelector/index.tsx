import { IconFolder } from '@tabler/icons-react';
import CompactSelect from '../CompactSelect';
import { selectorContainer } from './styles';
import { useEffect, useState } from 'react';
import { OptionProps } from '../Menu/Option';
import { useVsCodeApi } from '@lib/hooks';
import { WorkspaceFolder } from 'vscode';
import { css } from '@styled-system/css';

export default function FolderSelector() {
    const [folders, setFolders] = useState<OptionProps[]>([]);

    const vscode = useVsCodeApi();

    useEffect(() => {
        vscode.postMessage({ command: 'folders.get' });

        const onMessage = (event: MessageEvent) => {
            const message = event.data;
            if (message.command === 'folders') {
                setFolders(message.data?.map((f: WorkspaceFolder) => ({ label: f.name, value: f.uri })) ?? []);
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    // If there are less than 2 folders, don't show the selector
    if (folders.length < 2) return <div className={css({ height: '5px' })}></div>;

    return (
        <div className={selectorContainer}>
            <CompactSelect size="sm" value="folder1" icon={IconFolder} onChange={() => { }} options={folders} />
        </div>
    )
}