export type SocketIOArgumentType = 'string' | 'number' | 'boolean' | 'object';

export type SocketIOArgument = {
    // TODO: Add binary support
    type: SocketIOArgumentType;
    data: string;
    label?: string;
}

export type SocketIOMessage = {
    event?: string;
    args: SocketIOArgument[];
    label?: string;
}