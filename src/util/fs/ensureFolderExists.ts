import * as vscode from 'vscode';

export async function ensureFolderExists(folderUri: vscode.Uri): Promise<void> {
    try {
        const stats = await vscode.workspace.fs.stat(folderUri);
        if (stats.type !== vscode.FileType.Directory) {
            throw new Error(`A file exists at the location: ${folderUri.path}`);
        }
        // Folder already exists
    } catch (error) {
        if (error instanceof vscode.FileSystemError && error.code === 'FileNotFound') {
            // Folder does not exist, create it
            await vscode.workspace.fs.createDirectory(folderUri);
        } else {
            throw error; // Re-throw other errors
        }
    }
}
