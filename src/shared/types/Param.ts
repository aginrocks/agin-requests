export type Param = {
    id?: string,
    type?: 'query' | 'path',
    name: string,
    value: string,
    enabled: boolean,
};