import { useVscode } from "@lib/hooks";
import { getCSSVariable } from "@lib/util";
import { Editor, useMonaco } from "@monaco-editor/react";
import { css } from "@styled-system/css";
import { useCallback, useEffect, useState } from "react";

export default function Response() {
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
        <div>
            <Editor className={css({ flex: 1 })} height="100vh" defaultLanguage="json" defaultValue={`{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@mantine/form": "^7.13.4",
    "@monaco-editor/react": "^4.6.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.118",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vscode/webview-ui-toolkit": "^1.4.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "source": "src/index.tsx",
  "scripts": {
    "prepare": "panda codegen",
    "start": "parcel",
    "build": "parcel build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@pandacss/dev": "^0.47.0",
    "concurrently": "^9.0.1",
    "parcel": "^2.12.0",
    "postcss": "^8.4.47",
    "postcss-cli": "^11.0.0",
    "postcss-import": "^16.1.0",
    "process": "^0.11.10"
  }
}
`} options={{
                    theme: 'userTheme',
                }} />
        </div>
    )
}