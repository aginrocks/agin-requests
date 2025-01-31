import { AxiosRequestConfig } from "axios";
import { CheckableField, convertCheckableFields } from "../util";
import { Handler } from "./Handler";
import qs from "qs";
import axios from "axios";
import { VSCodeMessage } from "@shared/types";

export class HTTPHandler extends Handler {
    private controller = new AbortController();
    async onMessage(message: VSCodeMessage): Promise<void> {
        if (message.command == 'request.execute') {
            const request = message.config;

            if (request.type === 'http') {
                // Params are not handled here, because the UI should already include them in the request URL
                const headers = convertCheckableFields(request.headers, {
                    lowerCase: true,
                });

                const config: AxiosRequestConfig = {
                    validateStatus: () => true,
                    url: request.url,
                    method: request.method,
                    responseType: 'arraybuffer', // Get raw binary data as a buffer
                    signal: this.controller.signal,
                };

                if (request.authType === 'basic') {
                    config.auth = {
                        username: request.auth.basic?.username ?? '',
                        password: request.auth.basic?.password ?? '',
                    };
                } else if (request.authType === 'bearer') {
                    headers['authorization'] = `${request.auth.bearer?.prefix ?? ''} ${request.auth.bearer?.token ?? ''}`;
                }

                if (request.requestBodyType === 'json') {
                    headers['content-type'] = 'application/json';
                    config.data = request.requestBody;
                } else if (request.requestBodyType === 'urlencoded') {
                    headers['content-type'] = 'application/x-www-form-urlencoded';
                    config.data = qs.stringify(
                        convertCheckableFields(request.requestBody as CheckableField[], {
                            urlencodedMode: true,
                        })
                    );
                } else if (request.requestBodyType === 'xml') {
                    headers['content-type'] = 'application/xml';
                    config.data = request.requestBody;
                }

                config.headers = headers;
                console.log(config);

                try {
                    const startTime = performance.now();
                    const res = await axios.request(config);
                    const endTime = performance.now();

                    // Body size is the raw binary data length
                    const bodySize = res.data.byteLength;

                    // Convert response to JSON if necessary
                    let responseData: any;
                    const contentType = res.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {
                        responseData = JSON.parse(new TextDecoder().decode(res.data));
                    } else {
                        responseData = new TextDecoder().decode(res.data); // Fallback to string
                    }

                    // Calculate headers size
                    const headersSize = Object.entries(res.headers).reduce((total, [key, value]) => {
                        return total + Buffer.byteLength(`${key}: ${value}\r\n`);
                    }, 0) + 2; // Adding 2 for the final '\r\n' after headers

                    // Total size includes headers and body
                    const totalSize = headersSize + bodySize;

                    const resData = {
                        type: 'success',
                        data: responseData,
                        status: res.status,
                        statusText: res.statusText,
                        headers: res.headers,
                        metrics: {
                            bodySize,
                            headersSize,
                            totalSize,
                            time: endTime - startTime, // Time in milliseconds
                        },
                    };

                    this.webview.postMessage({ command: 'request.finished', data: resData });
                } catch (error) {
                    let message = 'Unknown Error';
                    if (error instanceof Error) message = error.message;
                    const resData = {
                        type: 'error',
                        data: message,
                        status: -1,
                        statusText: 'ERROR',
                        headers: {},
                        metrics: {
                            bodySize: 0,
                            headersSize: 0,
                            totalSize: 0,
                            time: 0,
                        },
                    };
                    this.webview.postMessage({ command: 'request.finished', data: resData, });
                }
            }
        } else if (message.command === 'request.cancel') {
            this.controller.abort();
            this.controller = new AbortController();
        }
    }
}