import { IconBrandSocketIo, IconPlugConnected, IconServer } from "@tabler/icons-react";
import { methodBadge, request, requestTitle, requestTop } from "./styles"

export type RequestProps = {
    type: 'ws' | 'socketio' | 'http' | 'sse';
    url: string;
    label: string;
    method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'head' | 'options' | 'ws' | 'socketio';
}

export default function Request({ type, url, method, label }: RequestProps) {
    const methodLabel = (type === 'http' || type === 'sse') ? method.toUpperCase() : '';

    return (
        <div className={request}>
            <div className={requestTop}>
                <div className={methodBadge({ method: (type === 'http' || type === 'sse') ? method : type })}>
                    {type === 'socketio' && <IconBrandSocketIo size={14} />}
                    {type === 'ws' && <IconPlugConnected size={14} />}
                    {type === 'sse' && <IconServer size={12} />}
                    {methodLabel}
                </div>
                <div className={requestTitle}>{label}</div>
            </div>
        </div>
    )
}