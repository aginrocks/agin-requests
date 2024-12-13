export type WSType = 'text' | 'json';
export type WSMessage = {
    type: WSType;
    data: string;
    label?: string;
}