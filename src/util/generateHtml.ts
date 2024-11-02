import * as vscode from 'vscode';
export function generateHtml(extensionUri: vscode.Uri, panel: vscode.WebviewView): string {
  const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'ui', 'dist', 'index.js'))

  const cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'ui', 'dist', 'index.css'))

  const html = `<!DOCTYPE html>
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
        `;

  return html;
}