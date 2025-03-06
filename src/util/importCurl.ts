import * as vscode from "vscode";
import parseCurl from "@proxymanllc/better-curl-to-json";
import { FormItem } from "../SidebarProvider";
import qs from "qs";
import createRequestWebview from "../createRequestView";
import arg from "arg";
import { AuthOptions, AuthType, Header, RequestBodyType, RequestConfig, RequestMethod } from "@shared/types";
import { randomUUID } from "crypto";

function getRequestBodyType(contentType: string) {
    // TODO: Add binary
    if (contentType == 'application/json') return 'json';
    if (contentType == 'application/xml') return 'xml';
    if (contentType == 'application/x-www-form-urlencoded') return 'urlencoded';
    if (contentType == 'multipart/form-data') return 'formdata';
    return 'text';
}

export function parseCurlToRequestConfig(curl: string): RequestConfig {
    const urlMatch = curl.match(/curl ['"]?(.*?)['"]?(?:\s|$)/);
    const methodMatch = curl.match(/-X (\w+)/);
    const headerMatches = [...curl.matchAll(/-H ['"]?(.*?):\s(.*?)['"]?(?:\s|$)/g)];
    const dataMatch = curl.match(/--data-raw ['"]?(.*?)['"]?(?:\s|$)/);
    const authMatch = curl.match(/-u ['"]?(.*?):(.*?)['"]?(?:\s|$)/);

    const url = urlMatch ? urlMatch[1] : "";
    const method = (methodMatch ? methodMatch[1].toLowerCase() : "get") as RequestMethod;
    const headers: Header[] = headerMatches.map((h, i) => ({
        id: randomUUID(),
        name: h[1],
        value: h[2],
        enabled: true,
    }));
    headers.push({
        id: randomUUID(),
        name: '',
        value: '',
        enabled: false,
    });

    const bodyType = getRequestBodyType(headers?.find(h => h.name.toLowerCase() === 'content-type')?.value ?? '');

    let parsedData: string | FormItem[] = '';
    if (['formdata', 'urlencoded'].includes(bodyType)) {
        const parsed = qs.parse(dataMatch ? dataMatch[1] : '');
        parsedData = Object.keys(parsed).map((key) => ({ id: randomUUID(), name: key ?? '', value: parsed[key] as string ?? '', enabled: true }));
    } else {
        parsedData = dataMatch ? dataMatch[1] : '';
    }

    const authType: AuthType = authMatch ? "basic" : "none";
    const auth: AuthOptions = authMatch ? {
        basic: {
            username: authMatch[1],
            password: authMatch[2],
        },
    } : {};

    return {
        id: crypto.randomUUID(),
        label: "Parsed cURL Request",
        isDraft: false,
        type: "http",
        url,
        method,
        headers,
        params: [],
        requestBodyType: bodyType,
        requestBody: parsedData,
        authType,
        messages: [],
        auth,
    };
}


export async function importCurl(context: vscode.ExtensionContext) {
    const userInput = await vscode.window.showInputBox({
        prompt: 'Paste cURL command',
        placeHolder: 'curl https://example.com',
        validateInput: (value) => {
            if (!value || value.trim() === '') {
                return 'Command cannot be empty';
            }
            return null;
        },
    });

    if (!userInput) return;

    const requestConfig = parseCurlToRequestConfig(userInput ?? '');
    console.log('CURL', requestConfig);

    // const bodyType = getRequestBodyType(requestConfig.headers?.find(h => h.name.toLowerCase() === 'content-type')?.value ?? '');

    // let parsedData: string | FormItem[] = '';
    // if (['formdata', 'urlencoded'].includes(bodyType)) {
    //     const parsed = qs.parse(request.requestBody ?? '');
    //     parsedData = Object.keys(parsed).map((key) => ({ name: key ?? '', value: parsed[key] as string ?? '', enabled: true }));
    //     // TODO: Complete
    // } else {
    //     parsedData = request.data;
    // }

    // const requestConfig: RequestConfig = {
    //     type: 'http',
    //     url: request.url,
    //     method: request.method,
    //     headers: request.header ? Object.keys(request.header).map((key) => ({ name: key, value: request.header?.[key], enabled: true })) : [],
    //     requestBodyType: bodyType,
    //     requestBody: parsedData,
    // }
    // console.log(requestConfig);

    createRequestWebview(context, requestConfig);
}