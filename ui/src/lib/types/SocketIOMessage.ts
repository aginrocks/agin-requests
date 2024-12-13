export type SocketIOArgument = {
    // TODO: Add binary support
    type: 'string' | 'number' | 'boolean' | 'object';
    data: string;
    label?: string;
}

export type SocketIOMessage = {
    arguments: SocketIOArgument[];
    label?: string;
}