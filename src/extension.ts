// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const webview = vscode.commands.registerCommand('agin-requests.helloWorld', () => {

		const panel = vscode.window.createWebviewPanel("webview", "React", vscode.ViewColumn.One, {
			enableScripts: true
		})

		const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "ui", "dist", "index.js"))

		const cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "ui", "dist", "index.css"))

		panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="${cssSrc}" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `
	});

	context.subscriptions.push(webview);
}

// This method is called when your extension is deactivated
export function deactivate() { }
