import { FormItem } from "./FormItem";
import { Header } from "./Header";
import { Param } from "./Param";

export type RequestBodyType = 'none' | 'json' | 'xml' | 'text' | 'urlencoded' | 'formdata' | 'binary';

export type RequestConfig = {
    type: 'ws' | 'socketio' | 'http',
    url: string,
    method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'head' | 'options',
    headers: Header[],
    params: Param[],
    requestBodyType: RequestBodyType,
    requestBody?: FormItem[] | string,
};