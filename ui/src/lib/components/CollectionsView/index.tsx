import { Collection } from '@shared/types';
import TreeItem from '../TreeItem';
import { createContext } from 'react';

export type CollectionsViewProps = {
    collections: Collection[];
    onCollectionClick?: (collection: Collection) => void;
    rightSection?: React.ReactNode;
}

export const SelectedContext = createContext<string | undefined>(undefined);

export default function CollectionsView({ collections, onCollectionClick, rightSection }: CollectionsViewProps) {
    return (
        <div>
            {collections.map(c => <TreeItem label={c.label} key={c.id} rightSection={rightSection}>
                {c.children.length > 0 && <CollectionsView collections={c.children} onCollectionClick={onCollectionClick} rightSection={rightSection} />}
            </TreeItem>)}
        </div>
    )
}