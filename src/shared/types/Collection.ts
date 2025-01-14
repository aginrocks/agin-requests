import { Header } from "./Header";
import { AuthOptions, AuthType, RequestConfig } from "./RequestConfig";

export type CollectionManifest = {
    label: string;
    id: string;
    slug: string;
    type: 'collection' | 'folder';
    headers: Header[],
    authType: AuthType,
    auth?: AuthOptions,
    // TODO: Add variables
}

export type Collection = CollectionManifest & {
    children: Collection[];
    requests: RequestConfig[];
    path: string;
}

export type CreateCollectionOptions = {
    label: string;
    type: 'collection' | 'folder';
    headers: Header[],
    authType: AuthType,
    auth?: AuthOptions,

    children?: Collection[];
    requests?: RequestConfig[];

    // Options to overwrite the default generation

    id?: string;
    slug?: string;

    // Options to customize behavior

    /** If true, the IDs of children will be ignored and replaced with random UUIDs */
    ignoreIds?: boolean;
}