export type SocketIOArgumentType = 'string' | 'number' | 'boolean' | 'object';

export type SocketIOArgument = {
    // TODO: Add binary support
    type: SocketIOArgumentType;
    data: string;
    label?: string;
    /** The ID is not sent, it's only used for arguments reordering */
    id: string;
}

export type SocketIOMessage = {
    event?: string;
    args: SocketIOArgument[];
    label?: string;
}