import { Collection } from '@shared/types';
import TreeItem from '../TreeItem';
import { createContext, useContext } from 'react';
import { IconFolder } from '@tabler/icons-react';
import Request from '../Request';

export type CollectionsViewProps = {
    collections: Collection[];
    onCollectionClick?: (collection: Collection, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    rightSection?: ({ item }: { item: Collection }) => React.ReactNode;
}

export const SelectedContext = createContext<string | undefined>(undefined);

export default function CollectionsView({ collections, onCollectionClick, rightSection: RightSection }: CollectionsViewProps) {
    const selectedId = useContext(SelectedContext);

    return (
        <div>
            {collections.map(c => <TreeItem onClick={(e) => onCollectionClick?.(c, e)} label={c.label} key={c.id} path={c.path} slug={c.slug} selected={selectedId === c.id} rightSection={RightSection ? <RightSection item={c} /> : undefined} icon={c.path === '' ? undefined : IconFolder}>
                {c.children.length > 0 && <CollectionsView collections={c.children} onCollectionClick={onCollectionClick} rightSection={RightSection} />}
                {c.requests.length > 0 && c.requests.map(r => <Request {...r} key={r.id} />)}
            </TreeItem>)}
        </div>
    )
}