import { FormItem } from "./FormItem";
import { Header } from "./Header";
import { Param } from "./Param";

export type HTTPResponse<T = string | Object> = {
    type?: 'success' | 'error',
    data: T
    status: number,
    statusText?: string,
    headers: Record<string, string>,
    metrics: {
        bodySize: number,
        headersSize: number,
        totalSize: number,
        time: number,
    }
};