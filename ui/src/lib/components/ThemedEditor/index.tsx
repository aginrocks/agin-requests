import { useVscode } from "@lib/hooks";
import { getCSSVariable } from "@lib/util";
import { Editor, EditorProps, useMonaco } from "@monaco-editor/react";
import { css } from "@styled-system/css";
import { useCallback, useEffect, useState } from "react";

interface ThemedEditorProps extends EditorProps {

}

export default function ThemedEditor({ options, ...props }: EditorProps) {
    const monaco = useMonaco();
    const vscode = useVscode();

    const [gotTheme, setGotTheme] = useState<boolean>(true);

    const refreshTheme = useCallback(() => {
        if (!monaco) return;
        monaco.editor.defineTheme('userTheme', {
            base: 'vs-dark', // Base theme, can be 'vs-dark' or 'hc-black'
            inherit: true, // Inherit from base theme
            rules: [
                // Token colors
                // { token: 'comment', foreground: getCSSVariable('--vscode-commentForeground') },
                // { token: 'keyword', foreground: getCSSVariable('--vscode-keywordForeground') },
                // { token: 'variable', foreground: getCSSVariable('--vscode-variableForeground') },
                // { token: 'variable.parameter', foreground: getCSSVariable('--vscode-variableParameterForeground') },
                // { token: 'function', foreground: getCSSVariable('--vscode-functionForeground') },
                // { token: 'function.call', foreground: getCSSVariable('--vscode-functionCallForeground') },
                // { token: 'string', foreground: getCSSVariable('--vscode-stringForeground') },
                // { token: 'string.escape', foreground: getCSSVariable('--vscode-stringEscapeForeground') },
                // { token: 'number', foreground: getCSSVariable('--vscode-numberForeground') },
                // { token: 'type', foreground: getCSSVariable('--vscode-typeForeground') },
                // { token: 'type.identifier', foreground: getCSSVariable('--vscode-typeIdentifierForeground') },
                // { token: 'class', foreground: getCSSVariable('--vscode-classForeground') },
                // { token: 'interface', foreground: getCSSVariable('--vscode-interfaceForeground') },
                // { token: 'enum', foreground: getCSSVariable('--vscode-enumForeground') },
                // { token: 'enum.member', foreground: getCSSVariable('--vscode-enumMemberForeground') },
                // { token: 'method', foreground: getCSSVariable('--vscode-methodForeground') },
                // { token: 'property', foreground: getCSSVariable('--vscode-propertyForeground') },
                // { token: 'namespace', foreground: getCSSVariable('--vscode-namespaceForeground') },
                // { token: 'macro', foreground: getCSSVariable('--vscode-macroForeground') },
                // { token: 'attribute', foreground: getCSSVariable('--vscode-attributeForeground') },
                // { token: 'operator', foreground: getCSSVariable('--vscode-operatorForeground') },
                // { token: 'function.parameter', foreground: getCSSVariable('--vscode-functionParameterForeground') },
                // { token: 'type.parameter', foreground: getCSSVariable('--vscode-typeParameterForeground') },
                // Add more tokens as needed
            ],
            colors: {
                'editor.background': getCSSVariable('--vscode-editor-background'),
                'editor.lineHighlightBackground': getCSSVariable('--vscode-editorWidget-background'),
                // 'editor.foreground': getCSSVariable('--vscode-editorForeground'),
                // 'editorCursor.foreground': getCSSVariable('--vscode-editorCursorForeground'),
                // 'editor.selectionBackground': getCSSVariable('--vscode-editorSelectionBackground'),
                // 'editor.selectionForeground': getCSSVariable('--vscode-editorSelectionForeground'),
                // 'editor.inactiveSelectionBackground': getCSSVariable('--vscode-inactiveSelectionBackground'),
                // 'editor.wordHighlightBackground': getCSSVariable('--vscode-editorWordHighlightBackground'),
                // 'editor.wordHighlightStrongBackground': getCSSVariable('--vscode-editorWordHighlightStrongBackground'),
                // 'editor.findMatchBackground': getCSSVariable('--vscode-findMatchBackground'),
                // 'editor.findMatchHighlightBackground': getCSSVariable('--vscode-findMatchHighlightBackground'),
                // 'editor.hoverHighlightBackground': getCSSVariable('--vscode-hoverHighlightBackground'),
                // 'editor.lineHighlightBorder': getCSSVariable('--vscode-editorLineHighlightBorder'),
                // 'editor.rangeHighlightBackground': getCSSVariable('--vscode-rangeHighlightBackground'),
                // 'editorWhitespace.foreground': getCSSVariable('--vscode-editorWhitespaceForeground'),
                // 'editorIndentGuide.activeBackground': getCSSVariable('--vscode-editorIndentGuideActiveBackground'),
                // 'editorIndentGuide.background': getCSSVariable('--vscode-editorIndentGuideBackground'),
                // 'editor.selectionHighlightBackground': getCSSVariable('--vscode-editorSelectionHighlightBackground'),
                // 'editorError.foreground': getCSSVariable('--vscode-editorErrorForeground'),
                // 'editorWarning.foreground': getCSSVariable('--vscode-editorWarningForeground'),
                // 'editorInfo.foreground': getCSSVariable('--vscode-editorInfoForeground'),
                // 'editorHint.foreground': getCSSVariable('--vscode-editorHintForeground'),
                // Add more color rules as needed
            }
        });

        monaco.editor.setTheme('userTheme');
    }, [monaco]);

    useEffect(() => {
        if (!vscode) return;

        const onMessage = (event: MessageEvent) => {
            const message = event.data;
            if (message.command === 'themeChanged') {
                // FIXME: Color theme switching
                refreshTheme();
            }
            // if (message.command === 'theme') {
            //     console.log('GOT THEME', message.theme);

            //     if (monaco) {
            //         // Define the received theme
            //         console.log('got theme', message.theme);
            //         // setGotTheme(true);
            //         monaco.editor.defineTheme('userTheme', message.theme);
            //         monaco.editor.setTheme('userTheme'); // Set the new theme
            //     }
            // }
        }
        // Set up a message listener to receive the theme
        window.addEventListener('message', onMessage);

        // Clean up the listener on unmount
        return () => {
            window.removeEventListener('message', onMessage);
            console.log('cleanup');

        };
    }, [vscode, monaco]);

    useEffect(() => {
        if (!monaco) return;

        refreshTheme();
    }, [monaco]);

    return (
        <Editor className={css({ flex: 1 })} {...props} options={{
            theme: 'userTheme',
            ...options,
        }} />
    )
}