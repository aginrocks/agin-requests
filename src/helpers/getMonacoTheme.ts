import * as vscode from 'vscode';

export function getMonacoTheme(): any {
    // // Fetch the current color customizations for the VSCode theme
    // const colorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations') || {};

    // // Helper function to get a theme color, with a fallback value if the color is not defined
    // const getColor = (colorId: string, fallback: string) => {
    //     const colorValue = colorCustomizations[colorId] || new vscode.ThemeColor(colorId);
    //     return colorValue instanceof vscode.ThemeColor ? fallback : colorValue;
    // };

    // return {
    //     base: vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark ? 'vs-dark' : 'vs', // Set base to 'vs' for light themes and 'vs-dark' for dark themes
    //     inherit: true,
    //     rules: [
    //         { token: 'keyword', foreground: getColor('editorKeyword.foreground', '#569CD6') },
    //         { token: 'string', foreground: getColor('editorString.foreground', '#CE9178') },
    //         { token: 'comment', foreground: getColor('editorComment.foreground', '#6A9955') },
    //         { token: 'number', foreground: getColor('editorNumber.foreground', '#B5CEA8') },
    //         { token: 'regexp', foreground: getColor('editorRegexp.foreground', '#D16969') },
    //         { token: 'operator', foreground: getColor('editorOperator.foreground', '#D4D4D4') },
    //         { token: 'namespace', foreground: getColor('editorNamespace.foreground', '#4EC9B0') },
    //         { token: 'type', foreground: getColor('editorType.foreground', '#4EC9B0') },
    //         { token: 'class', foreground: getColor('editorClass.foreground', '#4EC9B0') },
    //         { token: 'function', foreground: getColor('editorFunction.foreground', '#DCDCAA') },
    //         { token: 'variable', foreground: getColor('editorVariable.foreground', '#9CDCFE') },
    //         { token: 'parameter', foreground: getColor('editorParameter.foreground', '#9CDCFE') },
    //         { token: 'property', foreground: getColor('editorProperty.foreground', '#DCDCAA') },
    //         { token: 'constant', foreground: getColor('editorConstant.foreground', '#4FC1FF') },
    //         { token: 'punctuation', foreground: getColor('editorPunctuation.foreground', '#D4D4D4') },
    //     ],
    //     colors: {
    //         'editor.background': getColor('editor.background', '#1E1E1E'),
    //         'editor.foreground': getColor('editor.foreground', '#D4D4D4'),
    //         'editor.selectionBackground': getColor('editor.selectionBackground', '#264F78'),
    //         'editor.lineHighlightBackground': getColor('editor.lineHighlightBackground', '#2B2B2B'),
    //         'editorCursor.foreground': getColor('editorCursor.foreground', '#AEAFAD'),
    //         'editorWhitespace.foreground': getColor('editorWhitespace.foreground', '#555555'),
    //         'editorIndentGuide.activeBackground': getColor('editorIndentGuide.activeBackground', '#404040'),
    //         'editorIndentGuide.background': getColor('editorIndentGuide.background', '#333333'),
    //         'editorLineNumber.foreground': getColor('editorLineNumber.foreground', '#858585'),
    //         'editorLineNumber.activeForeground': getColor('editorLineNumber.activeForeground', '#C6C6C6'),
    //         'editor.selectionHighlightBackground': getColor('editor.selectionHighlightBackground', '#ADD6FF26'),
    //         'editor.findMatchBackground': getColor('editor.findMatchBackground', '#515C6A'),
    //         'editor.findMatchHighlightBackground': getColor('editor.findMatchHighlightBackground', '#EA5C0055'),
    //         'editorBracketMatch.background': getColor('editorBracketMatch.background', '#515C6A'),
    //         'editorBracketMatch.border': getColor('editorBracketMatch.border', '#C678DD'),
    //     }
    // };
}
