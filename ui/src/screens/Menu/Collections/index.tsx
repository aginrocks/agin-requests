import { collections } from './styles';
import { IconPlus } from '@tabler/icons-react';
import SidebarSearch from '@lib/components/SidebarSearch';
import ActionIcon from '@lib/components/ActionIcon';
import { useWorkspace } from '@lib/hooks';
import CollectionsView from '@lib/components/CollectionsView';

export default function Collections() {
    const workspace = useWorkspace();

    return (
        <div className={collections}>
            <SidebarSearch rightSection={<ActionIcon icon={IconPlus} onClick={() => {
                workspace.createEmptyCollection('');
                console.log('clicked', workspace);
            }} />} paddingRight="sm" />
            <CollectionsView collections={workspace.collections} />
        </div>
    )
}