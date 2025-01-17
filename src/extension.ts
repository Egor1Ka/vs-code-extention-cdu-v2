import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let webview = vscode.commands.registerCommand(
    "react-ext.namasteworld",
    () => {
      let panel = vscode.window.createWebviewPanel(
        "webview",
        "React",
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
        }
      );

      vscode.workspace.onDidSaveTextDocument((document) => {
        if (vscode.window.activeTextEditor?.document === document) {
          panel.webview.postMessage({
            command: "updateActiveFile",
            activeFile: document.getText(),
          });
        }
      });

      let scriptSrc = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(
          context.extensionUri,
          "web",
          "build",
          "static",
          "js",
          "main.f0b8b318.js"
        )
      );

      let cssSrc = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(
          context.extensionUri,
          "web",
          "build",
          "static",
          "css",
          "main.f855e6bc.css"
        )
      );

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
        `;

      panel.webview.postMessage({
        command: "updateActiveFile",
        activeFile: vscode.window.activeTextEditor?.document.getText(),
      });
    }
  );

  context.subscriptions.push(webview);
}

export function deactivate() {}
