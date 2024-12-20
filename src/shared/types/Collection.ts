import { Header } from "./Header";
import { AuthOptions, AuthType, RequestConfig } from "./RequestConfig";

export type CollectionManifest = {
    label: string;
    id: string;
    headers: Header[],
    authType: AuthType,
    auth: AuthOptions,
    // TODO: Add variables
}

export type Collection = CollectionManifest & {
    items: Collection[] | RequestConfig[];
};