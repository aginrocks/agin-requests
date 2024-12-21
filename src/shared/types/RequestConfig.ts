import { FormItem } from "./FormItem";
import { Header } from "./Header";
import { Param } from "./Param";
import { RealtimeMessage } from "./RealtimeMessage";

export type RequestBodyType = 'none' | 'json' | 'xml' | 'text' | 'urlencoded' | 'formdata' | 'binary';

export type AuthType = 'none' | 'basic' | 'bearer' | 'oauth2';

export type AuthOptions = {
    basic?: {
        username: string,
        password: string,
    },
    bearer?: {
        token: string,
        prefix: 'Bearer' | string,
    },
    socketio?: string,
}

export type RequestConfig = {
    type: 'ws' | 'socketio' | 'http' | 'sse',
    url: string,
    method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'head' | 'options' | 'ws',
    headers: Header[],
    params: Param[],
    requestBodyType: RequestBodyType,
    requestBody?: FormItem[] | string,
    authType: AuthType,
    messages: RealtimeMessage[],
    auth: AuthOptions
};