import { useForm } from '@mantine/form';
import ActionIcon from '../ActionIcon';
import Input from '../Input';
import { saveMenu } from './styles';
import { useRequest, useWorkspace } from '@lib/hooks';
import { useEffect } from 'react';
import TreeItem from '../TreeItem';
import { IconFolder } from '@tabler/icons-react';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

export type SaveMenuForm = {
    name: string;
    collection: string;
}

export type SaveMenuProps = {
    onClose: () => void;
}

export default function SaveMenu({ onClose }: SaveMenuProps) {
    const request = useRequest();
    const workspace = useWorkspace();
    const classes = saveMenu();

    const form = useForm<SaveMenuForm>({
        initialValues: {
            name: request?.values.label ?? 'New Request',
            collection: '',
        }
    });

    useEffect(() => {
        if (!request?.values.label) return;
        form.setFieldValue('name', request.values.label);
    }), [request?.values.label];

    return (
        <div className={classes.menu}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <div>
                        <div className={classes.title}>Save Request</div>
                        <div className={classes.subtitle}>Choose a name and a collection</div>
                    </div>
                    <ActionIcon icon="close" onClick={onClose} />
                </div>
                <Input placeholder="Request name" variant='compact' label="Request name" {...form.getInputProps('name')} />
                <div className={classes.searchBar}>
                    <Input placeholder="Search..." variant='compact' label="Select Collection" separate {...form.getInputProps('collection')} />
                </div>
            </div>
            <div className={classes.tree}>
                {/* FIXME */}
                {workspace.collections.map(c => <TreeItem label={c.label} key={c.id}>

                </TreeItem>)}
            </div>
            <div className={classes.actions}>
                <VSCodeButton className={classes.button}>
                    <div className={classes.buttonText}>Save</div>
                </VSCodeButton>
            </div>
        </div>
    )
}