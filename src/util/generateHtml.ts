import * as vscode from 'vscode';
export function generateHtml(extensionUri: vscode.Uri, webview: vscode.Webview, screen: 'menu' | 'request'): string {
  const scriptSrc = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'ui', 'dist', 'index.js'));

  const cssSrc = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'ui', 'dist', 'index.css'));

  const codiconsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));

  const html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="${cssSrc}" />
            <link href="${codiconsUri}" rel="stylesheet" />
          </head>
          <body>
            <div id="_aginscreen" data-screen="${screen}"></div>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `;

  return html;
}