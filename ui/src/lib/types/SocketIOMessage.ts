export type SocketIOArgument = {
    // TODO: Add binary support
    type: 'string' | 'number' | 'boolean' | 'object';
    data: string;
    label?: string;
}

export type SocketIOMessage = {
    event?: string;
    args: SocketIOArgument[];
    label?: string;
}