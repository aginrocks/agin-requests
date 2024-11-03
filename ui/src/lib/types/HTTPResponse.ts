import { FormItem } from "./FormItem";
import { Header } from "./Header";
import { Param } from "./Param";

export type HTTPResponse<T = string | Object> = {
    data: T
    status: number,
    statusText?: string,
    headers: Object,
};