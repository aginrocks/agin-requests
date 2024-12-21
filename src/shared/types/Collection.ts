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
}

export type CreateCollectionOptions = {
    label: string;
    type: 'collection' | 'folder';
    headers: Header[],
    authType: AuthType,
    auth?: AuthOptions,

    // Options to overwrite the default generation

    id?: string;
    slug?: string;
}