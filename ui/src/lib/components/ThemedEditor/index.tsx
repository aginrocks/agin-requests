import { useVsCodeApi } from "@lib/hooks/useVsCodeApi";
import { getCSSVariable } from "@lib/util";
import { Editor, EditorProps, useMonaco } from "@monaco-editor/react";
import { css } from "@styled-system/css";
import { useCallback, useEffect, useState } from "react";

interface ThemedEditorProps extends EditorProps { }

export default function ThemedEditor({ options, ...props }: ThemedEditorProps) {
    const monaco = useMonaco();
    const vscode = useVsCodeApi();

    const [gotTheme, setGotTheme] = useState<boolean>(false);

    const refreshTheme = useCallback(() => {
        if (!monaco) return;

        monaco.editor.defineTheme("userTheme", {
            base: "vs-dark",
            inherit: true,
            rules: [
                // Define any additional token colors as needed
            ],
            colors: {
                "editor.background": getCSSVariable("--vscode-editor-background"),
                "editor.lineHighlightBackground": getCSSVariable("--vscode-editorWidget-background"),
            },
        });

        monaco.editor.setTheme("userTheme");
        setGotTheme(true);
    }, [monaco]);

    useEffect(() => {
        if (!monaco) return;
        refreshTheme();
    }, [monaco, refreshTheme]);

    useEffect(() => {
        if (!vscode) return;

        const onMessage = (event: MessageEvent) => {
            const message = event.data;
            if (message.command === "themeChanged") {
                setGotTheme(false); // Reset theme to ensure reapplication
                refreshTheme();
            }
        };

        window.addEventListener("message", onMessage);
        return () => {
            window.removeEventListener("message", onMessage);
        };
    }, [vscode, refreshTheme]);

    useEffect(() => {
        if (monaco && !gotTheme) {
            refreshTheme();
        }
    }, [monaco, gotTheme, refreshTheme]);

    return (
        <Editor
            className={css({ flex: 1 })}
            {...props}
            options={{
                theme: "userTheme",
                ...options,
            }}
        />
    );
}
