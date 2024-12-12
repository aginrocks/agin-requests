import { methodBadge, request, requestTitle, requestTop } from "./styles"

export type RequestProps = {
    type: 'ws' | 'socketio' | 'http' | 'sse',
    url: string,
    method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'head' | 'options' | 'ws',
}

export default function Request({ type, url, method }: RequestProps) {
    return (
        <div className={request}>
            <div className={requestTop}>
                <div className={methodBadge({ method })}>
                    {method.toUpperCase()}
                </div>
                <div className={requestTitle}>{url}</div>
            </div>
        </div>
    )
}