import * as vscode from "vscode";
import parseCurl from "@proxymanllc/better-curl-to-json";
import { FormItem } from "../SidebarProvider";
import qs from "qs";
import createRequestWebview from "../createRequestView";
import arg from "arg";
import {
  AuthOptions,
  AuthType,
  Header,
  RequestBodyType,
  RequestConfig,
  RequestMethod,
} from "@shared/types";
import { randomUUID } from "crypto";

function getRequestBodyType(contentType: string) {
  // TODO: Add binary
  if (contentType == "application/json") return "json";
  if (contentType == "application/xml") return "xml";
  if (contentType == "application/x-www-form-urlencoded") return "urlencoded";
  if (contentType == "multipart/form-data") return "formdata";
  return "text";
}

export function parseCurlToRequestConfig(curl: string): RequestConfig {
  // Remove line breaks and normalize whitespace
  const normalizedCurl = curl
    .replace(/\\\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Extract all URLs from the command (both with --url flag and standalone)
  const urlMatches = [
    ...normalizedCurl.matchAll(/--url\s+['"]([^'"]+)['"]/g),
    ...normalizedCurl.matchAll(/--url\s+([^\s]+)/g),
    ...normalizedCurl.matchAll(/https?:\/\/[^\s'"]+/g),
  ];

  // Get the last URL found (most likely to be the target URL)
  let url = "";
  if (urlMatches.length > 0) {
    const lastMatch = urlMatches[urlMatches.length - 1];
    url = lastMatch[1] || lastMatch[0];
  } else {
    // Fallback: try to find URL after curl command, excluding options
    const curlMatch = normalizedCurl.match(
      /curl\s+(?:(?:-\w+(?:\s+[^\s]+)?)\s+)*([^\s-][^\s]*)/
    );
    if (curlMatch) {
      url = curlMatch[1];
    }
  }

  // Match method - handle both -X and --request
  const methodMatch = normalizedCurl.match(/(?:-X|--request)\s+(\w+)/i);

  // Match headers - handle both -H and --header
  const headerMatches = [
    ...normalizedCurl.matchAll(
      /(?:-H|--header)\s+['"]([^'"]+)['"]|(?:-H|--header)\s+([^\s]+)/g
    ),
  ];

  // Match data - handle various data options including --data-urlencode
  const dataMatch =
    normalizedCurl.match(
      /(?:--data-raw|--data-urlencode|--data|-d)\s+['"]([^'"]+)['"]/
    ) ||
    normalizedCurl.match(
      /(?:--data-raw|--data-urlencode|--data|-d)\s+([^\s]+)/
    );

  // Match auth
  const authMatch = normalizedCurl.match(/-u\s+['"]?([^:'"]+):([^'"]+)['"]?/);

  // Determine method: if data is present or method is explicitly set, otherwise GET
  let method: RequestMethod = "get";
  if (methodMatch) {
    method = methodMatch[1].toLowerCase() as RequestMethod;
  } else if (dataMatch) {
    method = "post";
  }
  const headers: Header[] = headerMatches
    .map((match, i) => {
      const headerString = match[1] || match[2];
      if (!headerString) return null;

      const colonIndex = headerString.indexOf(":");
      if (colonIndex === -1) return null;

      const name = headerString.substring(0, colonIndex).trim();
      const value = headerString.substring(colonIndex + 1).trim();

      return {
        id: randomUUID(),
        name,
        value,
        enabled: true,
      };
    })
    .filter(Boolean) as Header[];

  // Add default Content-Type for form data if not present and data exists
  const hasContentType = headers.some(
    (h) => h.name.toLowerCase() === "content-type"
  );
  if (dataMatch && !hasContentType) {
    // Check if it's URL-encoded data
    const isUrlEncoded =
      normalizedCurl.includes("--data-urlencode") ||
      (dataMatch[1] &&
        dataMatch[1].includes("=") &&
        !dataMatch[1].startsWith("{"));
    if (isUrlEncoded) {
      headers.unshift({
        id: randomUUID(),
        name: "Content-Type",
        value: "application/x-www-form-urlencoded",
        enabled: true,
      });
    }
  }

  headers.push({
    id: randomUUID(),
    name: "",
    value: "",
    enabled: false,
  });

  const bodyType = getRequestBodyType(
    headers?.find((h) => h.name.toLowerCase() === "content-type")?.value ?? ""
  );

  let parsedData: string | FormItem[] = "";
  if (dataMatch) {
    if (["formdata", "urlencoded"].includes(bodyType)) {
      const parsed = qs.parse(dataMatch[1] || "");
      parsedData = Object.keys(parsed).map((key) => ({
        id: randomUUID(),
        name: key ?? "",
        value: (parsed[key] as string) ?? "",
        enabled: true,
      }));
    } else {
      parsedData = dataMatch[1] || "";
    }
  }

  const authType: AuthType = authMatch ? "basic" : "none";
  const auth: AuthOptions = authMatch
    ? {
        basic: {
          username: authMatch[1],
          password: authMatch[2],
        },
      }
    : {};

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
    prompt: "Paste cURL command",
    placeHolder: "curl https://example.com",
    validateInput: (value) => {
      if (!value || value.trim() === "") {
        return "Command cannot be empty";
      }
      return null;
    },
  });

  if (!userInput) return;

  const requestConfig = parseCurlToRequestConfig(userInput ?? "");
  console.log("CURL Input:", userInput);
  console.log("CURL Parsed:", requestConfig);

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
