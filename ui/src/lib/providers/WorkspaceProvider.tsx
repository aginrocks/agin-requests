import { useVsCodeApi } from '@lib/hooks';
import { Collection, RequestConfig, VSCodeMessage } from '@shared/types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { WorkspaceFolder } from 'vscode';

export type Workspace = {
    folders: WorkspaceFolder[] | undefined;
    openedFolder: WorkspaceFolder | undefined;
    collections: Collection[];
    createEmptyCollection: (path: string) => Promise<void>;
    deleteCollection: (path: string) => Promise<void>;
    deleteCollectionConfirm: (path: string) => Promise<void>;
    createRequest: (collectionPath: string, requestOptions: RequestConfig) => Promise<void>;
    deleteRequest: (path: string, slug: string) => Promise<void>;
    deleteRequestConfirm: (path: string, slug: string) => Promise<void>;
    duplicateCollection: (path: string) => Promise<void>;
    renameCollection: (path: string, newName: string) => Promise<void>;
    renameCollectionPrompt: (path: string) => Promise<void>;
    renameRequest: (path: string, slug: string, newName: string) => Promise<void>;
    renameRequestPrompt: (path: string, slug: string) => Promise<void>;
    duplicateRequest: (path: string, slug: string) => Promise<void>;
    openRequest: (path: string, slug: string) => Promise<void>;
}

const initialWorkspace: Workspace = {
    folders: undefined,
    openedFolder: undefined,
    collections: [],
    createEmptyCollection: async () => { },
    deleteCollection: async () => { },
    deleteCollectionConfirm: async () => { },
    createRequest: async () => { },
    deleteRequest: async () => { },
    deleteRequestConfirm: async () => { },
    duplicateCollection: async () => { },
    renameCollection: async () => { },
    renameCollectionPrompt: async () => { },
    renameRequest: async () => { },
    renameRequestPrompt: async () => { },
    duplicateRequest: async () => { },
    openRequest: async () => { },
}

export const WorkspaceContext = createContext<Workspace>(initialWorkspace);

export default function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [folders, setFolders] = useState<WorkspaceFolder[] | undefined>(undefined);
    const [openedFolder, setOpenedFolder] = useState<WorkspaceFolder | undefined>(undefined);
    const [collections, setCollections] = useState<Collection[]>([]);

    const vscode = useVsCodeApi();

    useEffect(() => {
        vscode.postMessage({ command: 'folders.get' });
        vscode.postMessage({ command: 'workspace.folder.get' });
        vscode.postMessage({ command: 'workspace.collections.get' });

        const onMessage = (event: MessageEvent<VSCodeMessage>) => {
            const message = event.data;
            console.log('_msg', { message });
            if (message.command === 'folders') {
                setFolders(message.data);

            } else if (message.command === 'workspace.folder') {
                setOpenedFolder(message.data);

            } else if (message.command === 'workspace.collections') {
                setCollections(message.data);
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    const createEmptyCollection = useCallback(async (path: string) => {
        vscode.postMessage({ command: 'workspace.collections.createEmpty', path });
    }, [vscode.postMessage]);

    const deleteCollection = useCallback(async (path: string) => {
        vscode.postMessage({ command: 'workspace.collections.delete', path });
    }, [vscode.postMessage]);

    const deleteCollectionConfirm = useCallback(async (path: string) => {
        vscode.postMessage({ command: 'workspace.collections.deleteConfirm', path });
    }, [vscode.postMessage]);

    const deleteRequest = useCallback(async (path: string, slug: string) => {
        vscode.postMessage({ command: 'workspace.requests.delete', path, slug });
    }, [vscode.postMessage]);

    const deleteRequestConfirm = useCallback(async (path: string, slug: string) => {
        vscode.postMessage({ command: 'workspace.requests.deleteConfirm', path, slug });
    }, [vscode.postMessage]);

    const createRequest = useCallback(async (collectionPath: string, requestOptions: RequestConfig) => {
        vscode.postMessage({ command: 'workspace.requests.create', collectionPath, data: requestOptions });
    }, [vscode.postMessage]);

    const duplicateCollection = useCallback(async (path: string) => {
        vscode.postMessage({ command: 'workspace.collections.duplicate', path });
    }, [vscode.postMessage]);

    const renameCollection = useCallback(async (path: string, newName: string) => {
        vscode.postMessage({ command: 'workspace.collections.rename', path, newName });
    }, [vscode.postMessage]);

    const renameCollectionPrompt = useCallback(async (path: string) => {
        vscode.postMessage({ command: 'workspace.collections.renamePrompt', path });
    }, [vscode.postMessage]);

    const renameRequest = useCallback(async (path: string, slug: string, newName: string) => {
        vscode.postMessage({ command: 'workspace.requests.rename', path, slug, newName });
    }, [vscode.postMessage]);

    const renameRequestPrompt = useCallback(async (path: string, slug: string) => {
        vscode.postMessage({ command: 'workspace.requests.renamePrompt', path, slug });
    }, [vscode.postMessage]);

    const duplicateRequest = useCallback(async (path: string, slug: string) => {
        vscode.postMessage({ command: 'workspace.requests.duplicate', path, slug });
    }, [vscode.postMessage]);

    const openRequest = useCallback(async (path: string, slug: string) => {
        vscode.postMessage({ command: 'workspace.requests.open', path, slug });
    }, [vscode.postMessage]);

    return (
        <WorkspaceContext.Provider value={{
            folders,
            openedFolder,
            collections,
            createEmptyCollection,
            deleteCollection,
            deleteCollectionConfirm,
            createRequest,
            deleteRequest,
            deleteRequestConfirm,
            duplicateCollection,
            renameCollection,
            renameCollectionPrompt,
            renameRequest,
            renameRequestPrompt,
            duplicateRequest,
            openRequest,
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}