import { FormItem } from "./FormItem";
import { Header } from "./Header";
import { Param } from "./Param";

export type RequestConfig = {
    type: 'ws' | 'socketio' | 'http',
    url: string,
    method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'head' | 'options',
    headers: Header[],
    params: Param[],
    requestBodyType: 'none' | 'json' | 'xml' | 'text' | 'urlencoded' | 'formdata' | 'binary',
    requestBody?: FormItem[] | string,
};