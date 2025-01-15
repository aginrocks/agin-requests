import * as vscode from 'vscode';

export class Tab {
    public panel?: vscode.WebviewPanel;
    private context: vscode.ExtensionContext;
    public data?: any;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }
}