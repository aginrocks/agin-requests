import { Collection } from '@shared/types';
import TreeItem from '../TreeItem';
import { createContext } from 'react';
import { IconFolder } from '@tabler/icons-react';

export type CollectionsViewProps = {
    collections: Collection[];
    onCollectionClick?: (collection: Collection) => void;
    rightSection?: ({ item }: { item: Collection }) => React.ReactNode;
}

export const SelectedContext = createContext<string | undefined>(undefined);

export default function CollectionsView({ collections, onCollectionClick, rightSection: RightSection }: CollectionsViewProps) {
    return (
        <div>
            {collections.map(c => <TreeItem label={c.label} key={c.id} rightSection={RightSection ? <RightSection item={c} /> : undefined} icon={c.path === '' ? undefined : IconFolder}>
                {c.children.length > 0 && <CollectionsView collections={c.children} onCollectionClick={onCollectionClick} rightSection={RightSection} />}
            </TreeItem>)}
        </div>
    )
}