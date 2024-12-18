import * as vscode from "vscode";
import parseCurl from "@proxymanllc/better-curl-to-json";
import { FormItem } from "../SidebarProvider";
import qs from "qs";
import createRequestWebview from "../createRequestView";

function getRequestBodyType(contentType: string) {
    // TODO: Add binary
    if (contentType == 'application/json') return 'json';
    if (contentType == 'application/xml') return 'xml';
    if (contentType == 'application/x-www-form-urlencoded') return 'urlencoded';
    if (contentType == 'multipart/form-data') return 'formdata';
    return 'text';
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

    const request = parseCurl(userInput ?? '');

    const bodyType = getRequestBodyType(request.header?.['content-type'] ?? request.header?.['Content-Type'] ?? '');

    let parsedData: string | FormItem[] = '';
    if (['formdata', 'urlencoded'].includes(bodyType)) {
        const parsed = qs.parse(request.data);
        parsedData = Object.keys(parsed).map((key) => ({ name: key ?? '', value: parsed[key] as string ?? '', enabled: true }));
        // TODO: Complete
    } else {
        parsedData = request.data;
    }

    const requestConfig = {
        type: 'http',
        url: request.url,
        method: request.method,
        headers: request.header ? Object.keys(request.header).map((key) => ({ name: key, value: request.header?.[key], enabled: true })) : [],
        requestBodyType: bodyType,
        requestBody: parsedData,
    }
    console.log(requestConfig);

    createRequestWebview(context, requestConfig);
}