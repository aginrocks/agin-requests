// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import path from 'path';
import { getMonacoTheme } from './helpers';
import axios from 'axios';
import { convertCheckableFields, generateHtml } from './util';
import { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import createRequestWebview from './createRequestView';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "agin-requests-sidebar",
            sidebarProvider
        )
    );

    const webview = vscode.commands.registerCommand('agin-requests.new', () => {
        createRequestWebview(context);
    });

    context.subscriptions.push(webview);
}

// This method is called when your extension is deactivated
export function deactivate() { }